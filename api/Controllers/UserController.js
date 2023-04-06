import Users from "../Schema/UserSchema.js";
import DBC from "../DBControl/DBC.js";
import bcrypt from 'bcrypt'
import { createError } from "../Helpers/Error.js";
import path from "path";
import crypto from 'crypto'

const User_Controller = {
    signup: async (req, res, next) => {


        const input = req.body
        console.log(req.body)
        //checking if there is any existing user using the same email address 
        const checkEmail = await Users.findOne({ Email: input.Email })
        if (checkEmail) {
            console.log("existing", existing ? existing : checkEmail)
            res.status(400).json({ message: 'user already exists'})
        } else {
            try {
                //hasing password using bcrypt
                const apikey = crypto.randomBytes(6).toString('hex')
                const saltRounds = 10;
                let hashed = await bcrypt.hash(input.Password, saltRounds);
                console.log('first', hashed)

                const data = {
                    Name: input.Name,
                    Email: input.Email, 
                    Lastname:input.LastName,
                    Password: hashed,
                    
                    
 
                } 
                const result = await DBC.saveUser(data);
                
                if (result) {
                    const apikey = crypto.randomBytes(6).toString("base64url")
                    const apiUpdate = await Users.findOneAndUpdate({ _id: result._id }, { apikey: apikey}, { new: true })
                    console.log(apiUpdate)
                    res.status(200).json(apiUpdate)
                };
            } catch (error) {
                res.status(500).json(error)
            }
        }



    },
    login: async (req, res, next) => {
        console.log("in",req.body)
       try {
        const user = await DBC.findByEmail(req.body.email);
        console.log("user",user)
        const input = req.body.password;
        
        if(user) {
            const passwordFromDB = user.Password; // Replace with the actual hashed password from your database
            console.log("compare",user)
            bcrypt.compare(input, passwordFromDB, function (err, result) {
                if (err) {
                    console.error(err);
                } else if (result) {

                    console.log('Password is correct!');
                    res.status(200).json(user)

                } else {

                    console.log('Password is incorrect!');
                    res.status(400).json('incorrect password')

                }
            })
        }else{
            console.log('error')
            
        }
       } catch (error) {
        console.log(error)
       } 
    },
    get_user: async (req, res, next) => {
        console.log(req.params.id)
        const user = await Users.findOne({ _id: req.params.id })
        console.log(user) 
        res.status(200).json(user)
    },
    ImageUpload:async(req,res)=>{
        console.log("..",req.file)
      if(req.file){
        console.log(req.file.path)
        console.log(req.params.id)
        const save = await DBC.saveImage(req.params.id,req.file.path)
        console.log(save)
        if(save) res.status(200).json("Image Uploaded") 
      }else{
        res.status(404).json('file not found')
      } 
    },
    getImages:async(req,res)=>{
       try{
        const images = await DBC.findAllImages()
        if(images) res.status(200).json(images)
       }catch(err){
        console.log(err)
        res.status(500).json(err)
       }
    }

} 


export default User_Controller;  