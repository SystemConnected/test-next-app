import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    username: { type: String, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: false },
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
