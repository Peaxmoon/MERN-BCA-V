import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
    }
};

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;
    console.log("Registering user with email: ", email);

    // if(fullName=="" || email=="" || username=="" || password=="") {
    //     throw new ApiError("All fields are required", 400);
    // }

    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Fix: Await the user existence check and throw error synchronously
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0].path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // Only upload coverImage if provided
    let coverImage = null;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
        // isVerified: false,
    })

    const createdUser = await User.findById(user._id).select("-password -refrseshToken");

    if (!createdUser) {
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
    //         fullName: createdUser.fullName,
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
    //             fullName: newUser.fullName,
    //             email: newUser.email,
    //             username: newUser.username,
    //             avatar: newUser.avatar,
    //             coverImage: newUser.coverImage,
    //         },
    //     });
    // })
    // .catch(
});

const loginUser = asyncHandler(async (req, res) => {
    // take input from form
    //req body -> data
    // username or email search
    // find the user
    // access and refresh Token send to the user
    // send cookie or acknowledgement if password wrong

    const { email, username, password } = req.body;

    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required")
    }
    // if (!username && !email) {//if both is required
    //     throw new ApiError(400, "Username or email is required")
    // }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    }).select("+password +refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);


    const loggedInUser = await User.findById(user._id);
    select("-password", -refreshToken)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiError(
                200, {
                user: loggedInUser, accessToken, refreshToken
            },
                "User Logged in succesfully!!!"
            )
        )


    // const accessToken = user.generateAccessToken();
    // const refreshToken = user.generateRefreshToken();

    // res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    // });

    // return res.status(200).json(
    //     new ApiResponse(200, { accessToken }, "User logged in successfully")
    // );
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
// const logoutUser = asyncHandler(async(req, res) => {
//     User.findByIdAndUpdate(req.user._id, { refreshToken: null });
//     res.clearCookie("accessToken");
//     res.clearCookie("refreshToken");
//     return res.status(200).json(new ApiResponse(200, null, "User logged out successfully"));
// });


export {
    registerUser,
    loginUser,
    logoutUser
};