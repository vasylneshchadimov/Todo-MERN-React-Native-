import { Request } from "express";
import UserService from "../services/user.servise";

export class UserController {
    constructor(private userService: UserService) {}
    async signUp(req: Request) {
        return await this.userService.signUp(req.body);
    }
    async signIn(req: Request) {
        return await this.userService.signIn(req.body);
    }
}
const userController = new UserController(new UserService());
export default userController;
