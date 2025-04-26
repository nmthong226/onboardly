import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send email with OTP + link
export const sendVerificationEmail = async (to, token, otp) => {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        to,
        subject: 'Verify your email',
        html: `
      <h2>Email Verification</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <h3 style="color:#4CAF50;">${otp}</h3>
      <p>This code will expire in 10 minutes.</p>
      <p>Alternatively, click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
    });
};
