import User from "../models/User";
import { IUser } from "../types/user.types";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../middlewares/keys";

export default class UserService {
    async signUp(newUser: IUser) {
        const { email, password } = newUser;

        const candidate = await User.findOne({ email: email });

        if (candidate) {
            throw new Error();
        }
        const user = await User.create({
            email,
            password,
        });
        const { id } = user;

        const tok = jwt.sign({ id }, jwtSecret, { expiresIn: "12h" });
        const token = `Bearer ${tok}`;

        return token;
    }
    async signIn(candUser: IUser) {
        const { email, password } = candUser;
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error();
        }

        if (password !== user.password) {
            throw new Error();
        }
        const { id } = user;
        const tok = jwt.sign({ id }, jwtSecret, { expiresIn: "12h" });
        const token = `Bearer ${tok}`;

        return token;
    }
}
