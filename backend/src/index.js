// require('dotenv').config()
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";


dotenv.config({
    path: "./env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Listening on PORT: ${process.env.PORT || 8000}`);
    })
    console.log("MONGODB db connection successful !!!");
})
.catch((error) => {
    console.log("MONGODB db connection failed !!!", error);
    console.error("ERROR: ", error)
    throw error
})


















/*
 Just for demo purpose

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("DB Connected");

        app.on("error", (err) => {
            console.error("ERROR: ", error)
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`Listening on PORT: ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

*/