import mongoose from "mongoose";


export const  Db=async()=>{
    try {
        await mongoose.connect(`${process.env.Db}`)
        console.log("db connection established");
        
    } catch (error) {
        console.log("db error: " + error);
        
    }

}