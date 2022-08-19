import mongoose, { Document, Schema } from "mongoose";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
});

export default mongoose.model<IUser>("User", userSchema);
