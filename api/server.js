import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
const app = express()
import userRoute from './Routes/UserRouter.js'
import adminController from './Routes/AdminRouter.js'
import { DB_URL, PORT } from './Config.js';

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()


const server = app.listen(PORT, () => {
    console.log(`server started `)
    try {
        mongoose.connect(`mongodb+srv://munna:701223mongo@cluster0.5r0vsmz.mongodb.net/?retryWrites=true&w=majority`).then(() => {
            console.log("DataBase connection successfull")
        }).catch((err) => {
            console.log(err,'Connection Error - - -')
        })
    } catch (error) {
        console.log(error,"error")
    } 

})

app.use('/admin', adminController) 
app.use('/', userRoute)
app.use('/Uploads', express.static('Uploads')); 
 