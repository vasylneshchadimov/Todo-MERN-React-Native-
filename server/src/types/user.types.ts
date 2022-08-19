import joi from "joi";
import { Request } from "express";
interface RequestParams {
    id: string;
}

interface ResponseBody {}

interface RequestBody {
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
    userId: string;
}

interface RequestQuery {
    search: string;
    compleated: string;
    privated: string;
    skip: string;
    limit: string;
}
export interface IRequest
    extends Request<RequestParams, ResponseBody, RequestBody, RequestQuery> {
    user: IUserAndId;
}
export interface IUser {
    email: string;
    password: string;
}

interface IUserAndId extends IUser {
    id: string;
}

export const userSchema = joi.object({
    email: joi.string().min(5).max(30).trim(true).required(),
    password: joi.string().min(3).max(20).trim(true).required(),
});
