import express from 'express'
import User_Controller from '../Controllers/UserController.js'
const router = express.Router()
import multer from 'multer'
import path from 'path';
import Users from '../Schema/UserSchema.js'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});
const upload = multer({ storage })

 
const verifyKey = async(req, res, next) => {

    const apiKey = req.headers.authorization.split(" "); 
    console.log(apiKey[1],req.params.id)
    
    const user = await Users.findOne({_id:req.params.id})
    if(user){

        user.apikey === apiKey[1] ? next() : res.status(401).json('invalid api key')
       
    } 

}

 
//signup
router.post('/signup', User_Controller.signup)
//login
router.post('/login', User_Controller.login)
//user
router.get('/findUser/:id', User_Controller.get_user)
//images
router.post('/upload/:id',verifyKey,upload.single('image'), User_Controller.ImageUpload)
router.get('/images/get_all',User_Controller.getImages)





export default router;

