import "dotenv/config";

export interface AppConfig {
    SERVER_URL: string;
    URL_TODO_API: string;
    URL_USER_API: string;
}

export default {
    name: "CoolApp",
    version: "1.0.0",
    extra: {
        SERVER_URL: process.env.SERVER_URL,
        URL_TODO_API: process.env.URL_TODO_API,
        URL_USER_API: process.env.URL_USER_API,
    },
};
