import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI: string = config.get("mongoURI");
        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
        await connect(mongoURI, options);

        console.log("MongoDB Connected...");
    } catch (err: any) {
        console.error(err.message);

        process.exit(1);
    }
};

export default connectDB;
