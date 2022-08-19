import axios from "axios";
import { IUser } from "../type/userTypes";
import HttpService from "./http";

class UserService extends HttpService {
    constructor(
        baseUrl: string,
        fetchingService: typeof axios = axios,
        apiVersion: string
    ) {
        super(baseUrl, fetchingService, apiVersion);
    }
    async register(data: IUser) {
        return await this.post<IUser>(data, "signup");
    }
    async login(user: IUser) {
        return await this.post<IUser>(user, "signin");
    }
}
export default UserService;
