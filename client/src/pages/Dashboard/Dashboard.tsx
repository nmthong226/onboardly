//Icons
import { LuInfo } from "react-icons/lu";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center p-5 border-gray-300 border-b-[0.5px] w-full">
        <div className="flex items-center space-x-2">
          <p className="font-semibold text-[16px]">Overview</p>
          <LuInfo className="size-3 text-gray-600"/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard