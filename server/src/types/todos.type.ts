import joi from "joi";

export interface ITodo {
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
    userId?: string;
}

export const todoSchema = joi.object({
    title: joi.string().min(5).max(30).trim(true).required(),
    description: joi.string().min(5).max(100).trim(true).required(),
    year: joi.number().integer().min(2022).max(2070).required(),
    isPublic: joi.boolean(),
    isCompleted: joi.boolean(),
});
