//Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//Icons
import { GoSun } from "react-icons/go";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex justify-center w-full min-h-screen">
    {children}
    <div className="right-3 bottom-3 absolute flex justify-between items-center space-x-2 bg-gray-50 shadow-md px-1 rounded-3xl w-fit h-12">
      <a href="https://github.com/nmthong226" target="_blank" className="flex items-center space-x-2 bg-white hover:bg-gray-50 shadow px-6 rounded-3xl w-fit h-10 hover:cursor-pointer">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/nmthong226.png" />
          <AvatarFallback>MT</AvatarFallback>
        </Avatar>
        <p className="text-sm">nmthong226</p>
      </a>
      <div className="flex justify-center items-center bg-white hover:bg-gray-50 shadow border rounded-full w-10 h-10">
        <GoSun />
      </div>
    </div>
  </div>
);
export default AuthLayout;