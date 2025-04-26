import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    // Token method (e.g., JWT hash or UUID link)
    verificationToken: String,
    // OTP method
    otp: String,
    otpExpiresAt: Date,
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Optional: auto delete unverified users after 1h
});

export const User = mongoose.model("User", userSchema);
