import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleated: boolean;
    userId: string;
}
const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    isPublic: {
        type: Boolean,
    },
    isCompleted: {
        type: Boolean,
    },
    userId: {
        type: String,
        required: true,
    },
});

export default mongoose.model<ITodo>("Todo", todoSchema);
