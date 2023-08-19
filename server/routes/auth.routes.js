import { Router } from "express";
import authController from "../controllers/auth.controllers.js"

const router = Router()

router.get("/", authController.home);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/login", authController.checkLogin);

router.post("/logout", authController.logout);

router.post("/upload-profile-image", authController.uploadProfileImage);

export default router;