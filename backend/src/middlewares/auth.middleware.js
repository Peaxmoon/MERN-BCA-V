import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        // Middleware to verify JWT access token
    
        if (!token) {
            throw new ApiError(401, "Unauthorized: Access token is missing or invalid");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid access token: User not found");
        }
    
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Forbidden: Invalid access token");
        // if (error instanceof jwt.JsonWebTokenError) {
        //     return next(new ApiError(403, "Forbidden: Invalid access token"));
        // } else if (error instanceof jwt.TokenExpiredError) {
        //     return next(new ApiError(401, "Unauthorized: Access token has expired"));
        // } else {
        //     return next(new ApiError(500, "Internal Server Error: Unable to verify access token"));
        // }
    }
   // Uncomment the following lines if you want to use the jwt.verify method directly
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    //     if (err) {
    //         return next(new ApiError(403, "Forbidden: Invalid access token"));
    //     }

    //     try {
    //         // Fetch user from database using the decoded user ID
    //         const user = await User.findById(decoded.id).select("-password -refreshToken");
    //         if (!user) {
    //             return next(new ApiError(404, "User not found"));
    //         }

    //         req.user = user; // Attach user info to request object
    //         next(); // Proceed to the next middleware or route handler
    //     } catch (error) {
    //         return next(new ApiError(500, "Internal Server Error: Unable to fetch user"));
    //     }
    // });


    // const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    // if (!token) {
    //     return res.status(401).json({ message: "Access token is missing or invalid" });
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded; // Attach user info to request object
    //     next(); // Proceed to the next middleware or route handler
    // } catch (error) {
    //     return res.status(403).json({ message: "Invalid access token" });
    // }
});