import express from "express";
import { register, checkOTP, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify-otp", checkOTP );

export default router;