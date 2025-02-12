import { model, models, Schema } from "mongoose";

const LoginDetailSchema= new Schema({
    username: {type:String,required:true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    token:{type:String,required:true},
    inTime:{type: Date, default: Date.now},
    outTime:{type: Date, default: Date.now},
});

export const LoginDetail= models.LoginDetail||model("LoginDetail",LoginDetailSchema)