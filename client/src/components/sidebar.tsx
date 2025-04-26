//Core
import { useState } from "react";

//Components
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//Icons
import { ChevronRight, Home, MessageCircle, Plus, Settings, User2 } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { LuStarOff } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";

const Sidebar = () => {
    const [expand, setExpand] = useState(true);
    return (
        <aside className={`${expand ? 'w-60' : 'w-14'} transition-all ease-in-out duration-300 flex justify-between flex-col px-2 py-4 border-gray-300 border-r-[0.5px] h-full`}>
            <div className="flex flex-col">
                <div className="flex items-center px-2 w-full">
                    {/* Logo text */}
                    <div
                        className={`flex items-center overflow-hidden transition-all duration-300 ${expand ? 'w-auto opacity-100 ml-1' : 'w-0 opacity-0'}`}
                    >
                        <p className="font-semibold whitespace-nowrap">Onboardly</p>
                    </div>
                    {/* Spacer */}
                    <div className="flex-grow" />
                    {/* Toggle button */}
                    <div
                        onClick={() => setExpand(!expand)}
                        className="flex justify-center items-center hover:bg-gray-100 rounded-full w-6 h-6 hover:cursor-pointer"
                    >
                        {expand ? (
                            <IoIosArrowBack className="size-4 text-gray-600" />
                        ) : (
                            <IoReorderThreeOutline className="size-5 text-gray-600" />
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center space-y-1 my-4 w-full">
                    {[
                        { icon: Home, label: 'Home' },
                        { icon: User2, label: 'Contacts' },
                        { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="group flex items-center hover:bg-gray-100 px-3 rounded-md w-full h-10 text-gray-500 hover:text-black hover:cursor-pointer"
                        >
                            <item.icon className="flex-shrink-0 size-4" />
                            <div
                                className={`overflow-hidden transition-all duration-300 origin-left ${expand ? 'ml-2 w-auto' : 'w-0'}`}
                            >
                                <p
                                    className={`text-nowrap transition-opacity duration-300 ${expand ? 'opacity-100' : 'opacity-0'} font-medium text-sm`}
                                >
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <Collapsible className="flex flex-col space-y-2 my-4 w-full">
                    <CollapsibleTrigger asChild>
                        <button className={`${expand ? 'visible' : 'invisible'} group flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded-md w-full transition`}>
                            <span className="font-medium">Favorites</span>
                            <ChevronRight
                                className="size-4 group-data-[state=open]:rotate-90 transition-transform duration-300"
                            />
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        {[
                            { name: 'Google', icon: 'https://www.vectorlogo.zone/logos/google/google-icon.svg' },
                            { name: 'Microsoft', icon: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg' },
                            { name: 'Airbnb', icon: 'https://www.vectorlogo.zone/logos/airbnb/airbnb-tile.svg' },
                        ].map((item) => (
                            <div
                                key={item.name}
                                className={`group ${expand && 'justify-between'} flex  items-center hover:bg-gray-100 pr-2 rounded-md w-full h-10 hover:cursor-pointer`}
                            >
                                <div className="flex justify-center items-center">
                                    <MdDragIndicator className="invisible group-hover:visible size-3 text-gray-400" />
                                    <div className={`flex w-4 h-4 ${expand && 'mr-2'}`}>
                                        <img src={item.icon} alt={item.name} className="rounded-sm object-cover" />
                                    </div>
                                    <p className={`${expand ? 'flex' : 'hidden'}`}>{item.name}</p>
                                </div>
                                {expand &&
                                    <div className="hidden group-hover:flex w-[14px] h-[14px] text-gray-400 hover:cursor-pointer">
                                        <LuStarOff />
                                    </div>
                                }
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-between items-center space-y-1 my-4 w-full">
                    {[
                        { icon: Plus, label: 'Invite member' },
                        { icon: MessageCircle, label: 'Feedback' },
                    ].map((item) => (
                        <div key={item.label} className={`flex items-center hover:bg-gray-100 px-3 rounded-md w-full h-10 text-gray-500 hover:text-black hover:cursor-pointer group`}>
                            <item.icon className="flex-shrink-0 size-4" />
                            <div className={`overflow-hidden transition-all duration-300 origin-left ${expand ? 'ml-2 w-auto' : 'w-0'}`}>
                                <p className={`text-nowrap transition-opacity duration-300 ${expand ? 'opacity-100' : 'opacity-0'} font-medium text-sm`}>
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`flex items-center ${expand && 'space-x-2'}  hover:bg-gray-100 px-1 rounded-lg w-full h-10`}>
                    <Avatar className="size-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className={`transition-all duration-300 origin-left ${expand ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'} line-clamp-1 font-semibold text-sm`}>
                        Thông Nguyễn Minh
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;