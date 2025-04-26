// lib/api.ts
import api from "./axios";

export const registerUser = async (data: { name: string; email: string; password: string }) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const verifyOTP = async (data: { email: string; otp: string }) => {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};