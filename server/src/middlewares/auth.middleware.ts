import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { jwtSecret } from "./keys";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";
import passport from "passport";

export const jwtStrategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
    },
    async (payload, done) => {
        try {
            const userId = await User.findById(payload.id).select("id");
            if (userId) {
                done(null, userId);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }
);

export const ValidToken =
    () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ error: "token  not  found" });
            }
            const data = jwt.verify(token, jwtSecret);

            req.user = data;
            return next();
        } catch (e: any) {
            return res.status(500).json({ e: "token not  found " });
        }
    };
