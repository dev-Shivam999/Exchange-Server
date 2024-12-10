import express from 'express';
import { Db } from './db/db';
import cookieParser from 'cookie-parser';
import { UserRouter } from './Routers/User';
import cors from 'cors'
import { SelRoute } from './Routers/Sel';
import { config } from 'dotenv';
config()

const app = express();
app.use(cors({
    credentials:true,
    origin:`${process.env.Url}`
}))
console.log(process.env.Url);


Db()
app.use(express.json())
app.use(cookieParser())
app.use('/user', UserRouter)
app.use('/Sel', SelRoute)


const Port = process.env.PORT||3000


app.listen(Port,()=>{
    console.log(`app listening on ${Port}`);
    
})