import { Router } from "express"
import {
    signup,
    signin,
    updateProfile,
    getUserInfo,
    addProfileImage,
    removeProfileImage,
    logout
} from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";


const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles/" })

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post('/update-profile', verifyToken, updateProfile);
authRoutes.post('/update-image',
    verifyToken,
    upload.single("profile-image"),
    addProfileImage);
authRoutes.delete("/remove-profile", verifyToken, removeProfileImage)
authRoutes.post('/logout', logout);
export default authRoutes;
