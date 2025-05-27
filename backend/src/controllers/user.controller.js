import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    
    const { fullname, email, username, password } = req.body ;
    console.log("Registering user with email: ", email);

    // if(fullname=="" || email=="" || username=="" || password=="") {
    //     throw new ApiError("All fields are required", 400);
    // }

    if(
        [fullname, email, username, password].some((field) =>
        field?.trim() ==="")
    ){
        throw new ApiError(400, "All fields are required");
    }
    
    const existentUser = User.findOne({ 
        $or: [{ username }, { email }]
     }).then((existingUser) => {
        if (existingUser) {
            throw new ApiError(409, "User with this email or username already exists");
        }
    });

    const avatarLocalPath = req.files?.avatar?.[0].path;
    const coverImageLocalPath = req.files?.cover?.[0].path;

    if(!avatarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Avatar and cover image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
        // isVerified: false,
    })
    
    const createdUser = await User.findById(user._id).select("-password -refrseshToken");

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );



    // return res.status(201).json({
    //     success: true,
    //     message: "User registered successfully",
    //     user: {
    //         _id: createdUser._id,
    //         fullname: createdUser.fullname,
    //         email: createdUser.email,
    //         username: createdUser.username,
    //         avatar: createdUser.avatar,
    //         coverImage: createdUser.coverImage,
    //     },
    // });

    // .then((newUser) => {
    //     if (!newUser) {
    //         throw new ApiError(404, "User not found after registration");
    //     }
    //     res.status(201).json({
    //         success: true,
    //         message: "User registered successfully",
    //         user: {
    //             _id: newUser._id,
    //             fullname: newUser.fullname,
    //             email: newUser.email,
    //             username: newUser.username,
    //             avatar: newUser.avatar,
    //             coverImage: newUser.coverImage,
    //         },
    //     });
    // })
    // .catch(
    

});

export { registerUser, };