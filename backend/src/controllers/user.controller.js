import { asyncHandler } from "../utils/asynchandler.js";


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "User registration endpoint is not implemented yet."
    });
});

export { registerUser, };