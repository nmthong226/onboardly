//Core
import { useLocation, Link } from "react-router-dom";

// Icons
import { LuInfo, LuStarOff } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoLogoOctocat } from "react-icons/io";
import { Home, MessageCircle, Plus, Settings, User2 } from "lucide-react";

// Components
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

//Mocks
import { FavoriteContact } from "@/mocks/mock";
import { MdDragIndicator } from "react-icons/md";
import UserButton from "./sidebar/userbutton/userbutton";

const Header = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // Mapping from path to page title
    const pageTitles: { [key: string]: string } = {
        "/dashboard/home": "Overview",
        "/dashboard/contacts": "Contacts",
        "/dashboard/settings": "Settings",
    };

    // Get the title based on current pathname
    const pageTitle = pageTitles[pathname] || "Page";

    return (
        <div className="flex justify-between items-center px-6 border-gray-300 border-b-[0.5px] w-full h-16">
            <div className="flex items-center space-x-2">
                <Sheet>
                    <SheetTrigger>
                        <IoReorderThreeOutline className="lg:hidden size-6 text-gray-600" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <SheetHeader>
                            <SheetTitle>
                                <div className={`flex items-center overflow-hidden transition-all duration-300 h-10 w-auto opacity-100 ml-0.5`}>
                                    <IoLogoOctocat className="mr-2 size-5 shrink-0" />
                                    <p className={`font-semibold whitespace-nowrap`}>Onboardly</p>
                                </div>
                            </SheetTitle>
                            <SheetDescription hidden/>
                        </SheetHeader>
                        <span className="flex flex-col justify-between px-4 h-full">
                            <span>
                                <span className="flex flex-col justify-between items-center space-y-1 my-4 w-full">
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
                                                className={`${isActive ? 'bg-gray-100 text-black' : 'hover:bg-gray-100 bg-white text-gray-500'} group flex items-center  px-4 rounded-md w-full h-10 hover:text-black hover:cursor-pointer`}>
                                                <item.icon className="flex-shrink-0 size-4" />
                                                <span className={`overflow-hidden transition-all duration-300 origin-left ml-2 w-auto`}>
                                                    <span className={`text-nowrap transition-opacity duration-300 opacity-100' font-medium text-sm`}>
                                                        {item.label}
                                                    </span>
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </span>
                                <span className={`visible group flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded-md w-full transition`}>
                                    <span className="font-medium">Favorites</span>
                                </span>
                                <span className="space-y-1 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                    {FavoriteContact.map((item) => (
                                        <span
                                            key={item.name}
                                            className={`group justify-between flex  items-center hover:bg-gray-100 pr-2 rounded-md w-full h-10 hover:cursor-pointer`}
                                        >
                                            <span className="flex justify-center items-center">
                                                <MdDragIndicator className="invisible group-hover:visible size-4 text-gray-400" />
                                                <span className={`flex w-4 h-4 mr-2`}>
                                                    <img src={item.icon} alt={item.name} className="rounded-sm object-cover" />
                                                </span>
                                                <span className={`flex text-sm`}>{item.name}</span>
                                            </span>
                                            <span className="hidden group-hover:flex w-[14px] h-[14px] text-gray-400 hover:cursor-pointer">
                                                <LuStarOff />
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <span>
                                <div className="flex flex-col">
                                    <div className="flex flex-col justify-between items-center space-y-1 my-4 w-full">
                                        {[
                                            { icon: Plus, label: 'Invite member' },
                                            { icon: MessageCircle, label: 'Feedback' },
                                        ].map((item) => (
                                            <div key={item.label} className={`flex items-center hover:bg-gray-100 px-4 rounded-md w-full h-10 text-gray-500 hover:text-black hover:cursor-pointer group`}>
                                                <item.icon className="flex-shrink-0 size-4" />
                                                <div className={`overflow-hidden transition-all duration-300 origin-left ml-2 w-auto`}>
                                                    <p className={`text-nowrap transition-opacity duration-300 opacity-100 font-medium text-sm`}>
                                                        {item.label}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <UserButton sidebarExpand />
                            </span>
                        </span>
                    </SheetContent>
                </Sheet>
                <p className="font-semibold text-lg">{pageTitle}</p>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <LuInfo className="size-3 text-gray-600" />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>Lead and contact engagement metrics</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex space-x-8">
                <a href="https://github.com/nmthong226" target="_blank">
                    <FaGithub className="size-4" />
                </a>
                <a href="https://x.com" target="_blank">
                    <FaXTwitter className="size-4" />
                </a>
            </div>
        </div>
    )
}

export default Header