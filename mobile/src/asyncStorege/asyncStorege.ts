import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserAndId } from "../type/userTypes";

class AsyncStoregeService {
    async setToken(token: string) {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            console.log(error);
        }
    }
    async getToken() {
        try {
            const value = await AsyncStorage.getItem("token");
            if (value !== null) {
                return value;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}
export const asyncStoregeService = new AsyncStoregeService();
