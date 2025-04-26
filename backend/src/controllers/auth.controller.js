import { loginUser, registerUser, verifyUserOTP } from "../services/auth.service.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
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