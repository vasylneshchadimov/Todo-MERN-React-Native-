import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todo";

export const validationForBody: any =
    (shema: any) => async (req: Request, res: Response, next: NextFunction) => {
        const { error } = shema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details);
        } else {
            next();
        }
    };
export const isExistId =
    () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findId = await Todo.findById({ _id: req.params.id });
            if (findId === null) throw Error("error id");
            return next();
        } catch (e: any) {
            e.message = "Error id";
            return res.status(500).json({ e: e.message });
        }
    };
export const tryCatchMiddleware: any =
    (func: Function) => async (req: Request, res: Response) => {
        try {
            const data = await func(req, res);

            return res.json(data);
        } catch (e: any) {
            e.message = "Error";
            return res.status(500).json({ e: e.message });
        }
    };
