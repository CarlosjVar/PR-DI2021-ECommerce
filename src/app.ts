import express, { Application } from 'express';
import cors from 'cors';
import {PORT} from './config/constants'
import router from './routes/router'
import dotenv from 'dotenv';    
dotenv.config({path:'../.env'})

const app:Application = express();
//Body parser
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use('/api',router)

app.listen(PORT, () => {
    console.log("Server running in port ", PORT);
    
})
console.log("Server running");
