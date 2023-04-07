import Users from "../Schema/UserSchema.js";
import DBC from "../DBControl/DBC.js";
import bcrypt from 'bcrypt'
import { createError } from "../Helpers/Error.js";
import path from "path";
import crypto from 'crypto'
import sharp from "sharp";
import { v4 } from 'uuid';


const User_Controller = {
    signup: async (req, res, next) => {



        if (!req.body.Email || !req.body.Name || !req.body.Password) {
            return res.status(400).json('Enter All Details')
        }
        else if (req.body.Password.length < 6) {
            return res.status(400).json("Password must have minimum 6 characters")

        }
        else if (req.body.Password != req.body.Repassword) {
            return res.status(400).json("Password Doesn't match")

        }


        const input = req.body
        //checking if there is any existing user using the same email address  
        const checkEmail = await Users.findOne({ Email: input.Email })
        if (checkEmail) {
            //"existing", existing ? existing : checkEmail) 
            res.status(400).json('user already exists')
        } else {
            try {
                //hasing password using bcrypt
                const apikey = crypto.randomBytes(6).toString('hex')
                const saltRounds = 10;
                let hashed = await bcrypt.hash(input.Password, saltRounds);
                //'first', hashed)

                const data = {
                    Name: input.Name,
                    Email: input.Email,
                    Lastname: input.LastName,
                    Password: hashed,



                }
                const result = await DBC.saveUser(data);

                if (result) {
                    const apikey = crypto.randomBytes(6).toString("base64url")
                    const apiUpdate = await Users.findOneAndUpdate({ _id: result._id }, { apikey: apikey }, { new: true })
                    //apiUpdate)
                    res.status(200).json(apiUpdate)
                };
            } catch (error) {
                res.status(500).json("Enter Details")
            }
        }



    },
    login: async (req, res, next) => {
        //"in", req.body)

        if (!req.body.email || !req.body.password) res.status(400).json('Invalid Details')
        try {
            const user = await DBC.findByEmail(req.body.email);
            //"user", user)
            const input = req.body.password;

            if (user) {
                const passwordFromDB = user.Password; // Replace with the actual hashed password from your database
                //"compare", user)
                bcrypt.compare(input, passwordFromDB, function (err, result) {
                    if (err) {
                        console.error(err);
                    } else if (result) {

                        //'Password is correct!');
                        res.status(200).json(user)

                    } else {

                        //'Password is incorrect!');
                        res.status(400).json('Incorrect password')

                    }
                })
            } else {
                //'error')

            }
        } catch (error) {
            //error)
        }
    },
    get_user: async (req, res, next) => {
        if (req.params.id) {
            try {
                const user = await Users.findOne({ _id: req.params.id })
                res.status(200).json(user)
            } catch (error) {
                res.status(400).json(error)
            }
        }else{
            res.status(400).json('invalid userid')
        }
    },

    ImageUpload: async (req, res) => {

        if (req.file) {

            const save = await DBC.saveImage(req.params.id, req.file.path)
            const allImages = await DBC.findImagesByUser(req.params.id)

            const image = sharp(req.file.path);
            const unique = v4();

            // Generate thumbnail images of different sizes
            const thumbnailPromises = [
                { size: 200, prefix: 'small' },
                { size: 800, prefix: 'medium' },
                { size: 1200, prefix: 'large' }
            ].map(({ size, prefix }) => {
                return image.clone().resize({ width: size }).toFile(`Uploads/${unique}${prefix}.jpg`);
            });

            // Wait for all thumbnail images to be generated
            Promise.all(thumbnailPromises)
                .then(async () => {
                    // Send response with URL of original image and all thumbnail images

                    const thumbnails = {

                        thumbnails: {
                            Small: `/Uploads/${unique}small.jpg`,
                            Medium: `/Uploads/${unique}medium.jpg`,
                            Large: `/Uploads/${unique}large.jpg`
                        }
                    }

                    return thumbnails

                }).then(async (res) => {
                    console.log('thumbs ', res)
                    const result = await DBC.findAndUpdateWithThumb(save._id, res)
                    console.log("res", result)


                }).catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Error generating thumbnails' });
                });
            // console.log("thumbs updated",thumbs)
            res.status(200).json(allImages)

        } else {

            res.status(404).json('file not found')

        }
    },
    getImages: async (req, res) => {
        //'received')
        try {
            const images = await DBC.findAllImages()
            if (images) res.status(200).json(images)
        } catch (err) {
            //err)
            res.status(500).json(err)
        }
    },
    getImagesByUser: async (req, res) => {
        const images = await DBC.findImagesByUser(req.params.id)
        if (images) res.status(200).json(images)
    },
    getImagesByImageId: async (req, res) => {
        const image = await DBC.findByImageId(req.params.imageId)
        if (image) res.status(200).json(image)
    }


}


export default User_Controller;  