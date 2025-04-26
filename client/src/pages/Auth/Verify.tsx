//Core
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

//Libs
import { verifyOTP } from "@/lib/api"

//Components
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const Verify = () => {
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        const savedEmail = localStorage.getItem("verifyEmail")
        if (savedEmail) {
            setEmail(savedEmail)
        } else {
            alert("No email found. Please register again.")
            // Optionally redirect back to register
        }
    }, [])

    const handleVerify = async (code?: string) => {
        try {
            const res = await verifyOTP({
                email,
                otp: code || otp,
            });
            alert(res.message);
            localStorage.removeItem("verifyEmail");
            navigate("/auth/login");
        } catch (err: any) {
            alert(err.response?.data?.message || "Verification failed.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-10 mt-10">
            <p className="flex font-bold">Onboardly</p>
            <div className="flex flex-col justify-center items-center space-y-4 shadow p-4 px-6 border border-gray-300 rounded-xl w-96">
                <div className="flex flex-col space-y-1 w-full">
                    <p className="font-medium text-xl">Please check your email</p>
                    <p className="text-gray-600 text-sm">Your registration has been successful. We have sent you an email with a verification link.</p>
                </div>
                <p className="text-gray-600 text-sm">Alternatively you can use the one-time password in the email for verification</p>
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => setOtp(val)}
                    onComplete={(value) => {
                        setOtp(value);
                        handleVerify(value);
                    }}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-10 h-10" />
                        <InputOTPSlot index={1} className="w-10 h-10" />
                        <InputOTPSlot index={2} className="w-10 h-10" />
                        <InputOTPSlot index={3} className="w-10 h-10" />
                        <InputOTPSlot index={4} className="w-10 h-10" />
                        <InputOTPSlot index={5} className="w-10 h-10" />
                    </InputOTPGroup>
                </InputOTP>
                <p className="flex text-gray-600">Didn't receive an email?
                    <Link to="/auth/register" className="ml-2 font-semibold text-black underline">Resend</Link>
                </p>
            </div>
        </div>
    )
}

export default Verify