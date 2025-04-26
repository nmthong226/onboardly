import { User } from "../models/user.model.js";
import { sendVerificationEmail } from '../utils/email.js';
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function registerUser({ name, email, password }) {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Generate token and otp
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 3. Save user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        otp,
        otpExpiresAt,
    });

    await user.save();

    // 4. Send verification email
    await sendVerificationEmail(email, verificationToken, otp);

    return user;
}


export async function verifyUserOTP(email, otp) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (user.isVerified) throw new Error("User already verified");

    if (user.otp !== otp) throw new Error("Invalid OTP");

    if (user.otpExpiresAt < new Date()) throw new Error("OTP expired");

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();
    return "OTP verified successfully";
}

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isVerified) {
        throw new Error("Email not verified");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Optionally return token or user data
    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};