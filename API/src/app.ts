import express, { Application } from 'express';
import {PORT} from './config/constants'
import router from './routes/router'
const app:Application = express();
//Body parser
app.use(express.json())

app.use('/api',router)
app.listen(PORT, () => {
    console.log("Server running in port ", PORT);
    
})
console.log("Server running");

