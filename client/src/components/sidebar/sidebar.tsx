//Core
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//Components
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import UserButton from "./userbutton/userbutton";

//Icons
import { ChevronRight, Home, MessageCircle, Plus, Settings, User2 } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { LuStarOff } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoLogoOctocat } from "react-icons/io";

//Mocks
import { FavoriteContact } from "@/mocks/mock";

const Sidebar = () => {
    const [expand, setExpand] = useState(true);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <aside className={`${expand ? 'max-lg:hidden lg:w-16 xl:w-60' : 'w-16'} transition-all ease-in-out duration-300 flex justify-between flex-col px-2 py-4 border-gray-300 border-r-[0.5px] h-full`}>
            <div className="flex flex-col">
                <div className="flex items-center px-3 w-full">
                    {/* Logo text */}
                    <div className={`flex items-center overflow-hidden transition-all duration-300 h-10 ${expand ? 'w-auto opacity-100 ml-0.5' : 'w-0 opacity-0'}`}>
                        <IoLogoOctocat className="xl:mr-2 size-5 shrink-0" />
                        <p className={`font-semibold whitespace-nowrap max-xl:hidden`}>Onboardly</p>
                    </div>
                    {/* Spacer */}
                    <div className="flex-grow" />
                    {/* Toggle button */}
                    <div
                        onClick={() => setExpand(!expand)}
                        className={`max-xl:hidden flex justify-center items-center hover:bg-gray-100 rounded-full w-6 h-6 hover:cursor-pointer max-xl:pointer-events-none`}>
                        {expand ? (
                            <IoIosArrowBack className="size-4 text-gray-600" />
                        ) : (
                            <IoReorderThreeOutline className="size-6 text-gray-600" />
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center space-y-1 my-4 w-full">
                    {[
                        { icon: Home, label: 'Home', href: '/dashboard/home' },
                        { icon: User2, label: 'Contacts', href: '#' },
                        { icon: Settings, label: 'Settings', href: '#' },
                    ].map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                to={item.href}
                                key={item.label}
                                className={`${isActive ? 'bg-gray-100 text-black' : 'hover:bg-gray-100 bg-white text-gray-500'} group flex items-center  px-4 rounded-md w-full h-10 hover:text-black hover:cursor-pointer`}
                            >
                                <TooltipProvider>
                                    <Tooltip disableHoverableContent={expand}>
                                        <TooltipTrigger asChild>
                                            <item.icon className="flex-shrink-0 size-4" />
                                        </TooltipTrigger>
                                        {!expand && (
                                            <TooltipContent side="right">
                                                <p>{item.label}</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                                <div
                                    className={`overflow-hidden transition-all duration-300 origin-left ${expand ? 'ml-2 w-auto' : 'w-0'}`}
                                >
                                    <p
                                        className={`text-nowrap transition-opacity duration-300 ${expand ? 'opacity-100' : 'opacity-0'} font-medium text-sm`}
                                    >
                                        {item.label}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <Collapsible className="flex flex-col space-y-2 my-4 w-full" defaultOpen>
                    <CollapsibleTrigger asChild>
                        <button className={`${expand ? 'invisible xl:visible' : 'invisible'} group flex justify-between items-center  hover:bg-gray-100 px-3 py-2 rounded-md w-full transition`}>
                            <span className="font-medium">Favorites</span>
                            <ChevronRight
                                className="size-4 group-data-[state=open]:rotate-90 transition-transform duration-300"
                            />
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        {FavoriteContact.map((item) => (
                            <div
                                key={item.name}
                                className={`group ${expand && 'justify-between'} flex  items-center hover:bg-gray-100 pr-2 rounded-md w-full h-10 hover:cursor-pointer`}
                            >
                                <div className="flex justify-center items-center">
                                    <MdDragIndicator className="invisible group-hover:visible size-4 text-gray-400" />
                                    <div className={`flex w-4 h-4 ${expand && 'mr-2'}`}>
                                        <TooltipProvider>
                                            <Tooltip disableHoverableContent={expand}>
                                                <TooltipTrigger asChild>
                                                    <img src={item.icon} alt={item.name} className="rounded-sm object-cover" />
                                                </TooltipTrigger>
                                                {!expand && (
                                                    <TooltipContent side="right">
                                                        <p>{item.name}</p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={`${expand ? 'hidden xl:flex' : 'hidden'} text-sm`}>{item.name}</p>
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
                        <div key={item.label} className={`flex items-center hover:bg-gray-100 px-4 rounded-md w-full h-10 text-gray-500 hover:text-black hover:cursor-pointer group`}>
                            <TooltipProvider>
                                <Tooltip disableHoverableContent={expand}>
                                    <TooltipTrigger asChild>
                                        <item.icon className="flex-shrink-0 size-4" />
                                    </TooltipTrigger>
                                    {!expand && (
                                        <TooltipContent side="right">
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                            <div className={`overflow-hidden transition-all duration-300 origin-left ${expand ? 'ml-2 w-auto' : 'w-0'}`}>
                                <p className={`text-nowrap transition-opacity duration-300 ${expand ? 'opacity-100' : 'opacity-0'} font-medium text-sm`}>
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <UserButton sidebarExpand={expand} />
            </div>
        </aside>
    )
}

export default Sidebar;