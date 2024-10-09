import { Router } from "express"
import { signup, signin, updateProfile, getUserInfo } from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();
authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/user-info', verifyToken, getUserInfo);
authRoutes.post('/update-profile', verifyToken, updateProfile);


export default authRoutes;