import { Document, model, models, Schema } from "mongoose";

export interface ILoginDetails extends Document{
    username:string;
    email:string;
    token:string;
}

const LoginDetailSchema= new Schema({
    username: {type:String,required:true},
    email: {type: String, required: true},
    token:{type:String,required:true},
},{timestamps:true});

 const LoginDetail= models.LoginDetail||model<ILoginDetails>("LoginDetail",LoginDetailSchema)
 export default LoginDetail;