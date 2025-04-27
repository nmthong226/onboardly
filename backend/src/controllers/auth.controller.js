import { findUserByEmail, loginUser, registerUser, verifyUserOTP } from "../services/auth.service.js";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // 2. Create new user
        const newUser = await registerUser({ name, email, password });

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

export async function checkOTP(req, res) {
    try {
        const { email, otp } = req.body;
        const message = await verifyUserOTP(email, otp);
        res.json({ message });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function login(req, res) {
    try {
        const user = await loginUser(req.body);
        res.json({ message: "Login successful", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}