
import mongoose from "mongoose";

const MONGODB_URI:string = process.env.MONGODB_URI || "";

if(!MONGODB_URI){
    throw new Error("Please define MONGODB_URI in environment variables.")
}

export const connectDB =async()=>{
    if(mongoose.connection.readyState>=1){
        return;
    }
    await mongoose.connect(MONGODB_URI,{
        dbName:"siplDB"
    }).then(()=>
        console.log("MongoDB Connected")
    ).catch((error)=>{
        console.log("Error connecting to MongoDB",error)
    })
}
