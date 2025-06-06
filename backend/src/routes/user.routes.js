import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    registerUser
);

router.route('/login').post(loginUser);
// router.route("/login").post(
//     upload.none(),
//     async (req, res) => {
//         res.status(501).json({ message: "Login functionality not implemented yet" });
//     }
// );

// secured routes
router.route('/logout').post(verifyJWT, logoutUser);



export default router;