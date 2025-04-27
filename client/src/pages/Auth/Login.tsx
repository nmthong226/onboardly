//Libs
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

//Icons
import { IoLogoOctocat, IoMailOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "@/lib/api"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at abc@xyz form.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 6 char.",
  }),
})

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send login request to the backend API
      const res = await loginUser(values);
      console.log("✅ Login successful:", res.user);

      // Handle successful login (e.g., store user data or token)
      localStorage.setItem("user", JSON.stringify(res.user)); // Save user data in localStorage (optional)

      // Navigate to the dashboard or home page
      navigate("/dashboard/home"); // Redirect to dashboard or wherever you want
    } catch (error: any) {
      console.error("❌ Login failed:", error?.response?.data?.message || error.message);
      // alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10 mt-10">
      <div className="flex items-center space-x-2">
        <IoLogoOctocat className="xl:mr-2 size-5 shrink-0" />
        <p className="flex font-bold">Onboardly</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 shadow p-4 px-6 border border-gray-300 rounded-xl w-96">
        <div className="flex flex-col space-y-1 w-full">
          <p className="font-medium text-xl">Log in</p>
          <p className="text-gray-600 text-sm">Enter your details below to sign into your account.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <IoMailOutline className="top-1/2 left-3 absolute size-4 text-gray-600 -translate-y-1/2" />
                      <Input {...field} className="pl-8" />
                    </div>
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
                    <p className="font-normal underline">Forgot your password?</p>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <GoLock className="top-1/2 left-3 absolute size-4 text-gray-600 -translate-y-1/2" />
                      <Input {...field} type="password" className="pr-10 pl-8" />
                      <Button type="button" variant={"outline"} className="top-1/2 right-3 absolute flex-none border-none h-9 size-4 text-gray-600 -translate-y-1/2 hover:cursor-pointer">
                        <AiOutlineEye className="size-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex w-full">Log in</Button>
          </form>
        </Form>
        <div className="flex justify-between items-center space-x-2 w-full">
          <hr className="flex border-gray-300 border-t-1 w-1/4" />
          <span className="flex text-gray-600 text-sm">Or continue with</span>
          <hr className="flex border-gray-300 border-t-1 w-1/4" />
        </div>
        <div className="flex space-x-2 w-full">
          <Button variant={"outline"} className="w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53"></path><path fill="none" d="M1 1h22v22H1z"></path></svg>
            <p>Google</p>
          </Button>
          <Button variant={"outline"} className="w-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path></svg>
            <p>Microsoft</p>
          </Button>
        </div>
        <p className="flex text-gray-600">Don't have an account?
          <Link to="/auth/register" className="ml-2 text-black underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login