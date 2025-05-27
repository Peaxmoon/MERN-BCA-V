import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

// import { DB_NAME} from "../constants.js";

// const DB_NAME = "mernlearn"; // Ensure this matches your actual database name

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            throw err;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
        console.log(`\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error: ", error);
        process.exit(1)
    }
}

export default connectDB