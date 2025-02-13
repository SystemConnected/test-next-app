import { Document, model, models, Schema } from "mongoose";
export interface IUser extends Document{
    name:string;
    email:string;
    username:string;
    password:string;
    phone?:string;
    role:"user"|"admin";
    menuPermissions:string[];
}

const UserSchema = new Schema<IUser>({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    username: { type: String, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: false },
    role:{type:String,enum:['user','admin'],require:true,default:'user'},
    menuPermissions:[{type:Schema.Types.ObjectId,ref:"SideMenu"}]
}, { timestamps: true });

export const User = models.User || model<IUser>("User", UserSchema);
