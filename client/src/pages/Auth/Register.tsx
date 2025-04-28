//Core
import { useState } from "react"

//Libs
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//Hooks/Api
import { registerUser } from "@/lib/api"

//Components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

//Icons
import { LuEye, LuEyeOff, LuInfo } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom"
import { IoLogoOctocat } from "react-icons/io5"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email format (e.g. abc@xyz.com)." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  }).regex(/\d/, {
    message: "Password must contain at least one number.",
  }),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });

  const password = form.watch("password");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await registerUser(values);
      localStorage.setItem("verifyEmail", response?.user?.email);
      navigate('/auth/verify-email');
    } catch (error: any) {
      console.error("❌ Registration failed:", error?.response?.data);
      setError(error?.response?.data?.error || "Registration Failed");
    }
  };

  // Password validation conditions
  const haslowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;

  return (
    <div className="flex flex-col items-center space-y-10 mt-10">
      <div className="flex items-center space-x-2">
        <IoLogoOctocat className="xl:mr-2 size-5 shrink-0" />
        <p className="flex font-bold">Onboardly</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 shadow p-4 px-6 border border-gray-300 rounded-xl w-108">
        <div className="flex flex-col space-y-1 w-full">
          <p className="font-medium text-xl">Sign up</p>
          <p className="flex text-[15px] text-gray-600">Already have an account?
            <Link to="/auth/login" className="ml-2 text-black underline">Log in</Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between w-full font-medium text-[15px]">
                    <p>Password</p>
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex flex-col">
                      <Input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                        className="pr-10"
                      />
                      <div
                        className="top-1/2 right-1 z-50 absolute flex flex-none justify-center items-center hover:bg-gray-100 border-none rounded-lg w-8 h-8 size-4 text-gray-600 -translate-y-1/2 hover:cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <LuEyeOff className="size-4" /> : <LuEye className="size-4" />}
                      </div>
                    </div>
                  </FormControl>
                  <ul className="text-gray-600 text-sm list-disc list-inside">
                    <li className={hasUpperCase && haslowerCase ? "text-green-500" : ""}>
                      Mix of uppercase & lowercase letters
                    </li>
                    <li className={isLongEnough ? "text-green-500" : ""}>
                      Minimum 8 characters long
                    </li>
                    <li className={hasNumber ? "text-green-500" : ""}>
                      Contain at least 1 number
                    </li>
                  </ul>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error &&
              <>
                <div className="flex items-center space-x-2 bg-red-100 px-4 rounded-md w-full h-12 text-sm">
                  <LuInfo className="size-4" />
                  <p>{error}.</p>
                </div>
              </>
            }
            <Button type="submit" className="flex w-full">Create account</Button>
          </form>
        </Form>
        <div className="flex justify-between items-center space-x-2 w-full">
          <hr className="flex border-gray-300 border-t-1 w-1/4" />
          <span className="flex text-gray-600 text-sm">Or continue with</span>
          <hr className="flex border-gray-300 border-t-1 w-1/4" />
        </div>
        <div className="flex space-x-2 w-full">
          <Button variant={"outline"} className="w-1/2"
            onClick={() =>
              toast(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <p className="w-full text-center">Try later</p>
                </div>,
                {
                  style: { width: "85px" }
                }
              )
            }>
            < svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53"></path><path fill="none" d="M1 1h22v22H1z"></path></svg>
            <p>Google</p>
          </Button>
          <Button variant={"outline"} className="w-1/2" onClick={() =>
            toast(
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p className="w-full text-center">Try later</p>
              </div>,
              {
                style: { width: "85px" }
              }
            )
          }>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path></svg>
            <p>Microsoft</p>
          </Button>
        </div>
      </div>
    </div >
  )
}

export default Register