import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '50kb' }));   
app.use(express.urlencoded({ extended: true }, { limit: '50kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Add a root route for GET /
app.get("/", (req, res) => {
    res.send("API is running");
});

//routes import
import userRouter from './routes/user.routes.js';

//Routes Decleration
app.use("/api/v1/users", userRouter);


export default app;