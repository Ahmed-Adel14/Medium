import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BsBookmarks, BsBarChart } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { PiArticleLight } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import RightSideBar from "../components/RightSideBar";

export default function Layout() {
    const links = [
        { to: "/Home", label: "Home", icon: <IoMdHome />, end: true },
        { to: "/Library", label: "Library", icon: <BsBookmarks /> },
        { to: "/Profile", label: "Profile", icon: <RxPerson /> },
        { to: "/Stories", label: "Stories", icon: <PiArticleLight /> },
        { to: "/Stats", label: "Stats", icon: <BsBarChart /> },
    ];

    const [isOpen, setIsOpen] = useState(true);
    const isHome = useLocation().pathname === "/Home";
    const isProfile = useLocation().pathname === "/Profile";
    const isStories = useLocation().pathname === "/Stories";
    const isStats = useLocation().pathname === "/Stats";
    const isMore = useLocation().pathname === "/More";
    const isExploreTopic = useLocation().pathname === "/ExploreTopic";
    const isAuthorPage = useLocation().pathname === "/author/:id";

    return (
        <>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="pt-[8vh] w-full border-b border-gray-100"></div>

            <div className="w-full min-h-[92vh] grid grid-cols-12">
                {/* العمود الشمال */}
                {isOpen && (
                    <div className="col-span-2 p-4 border-r border-gray-100 sticky top-[8vh] h-[calc(100vh-8vh)] overflow-auto ">
                        <div className="flex flex-col gap-5 mt-7">
                            {links.map((link, i) => (
                                <NavLink
                                    key={i}
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) => `flex items-center cursor-pointer gap-3 ${isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>
                                    <p className="text-[23px]">{link.icon}</p>
                                    <span className="text-[18px]">{link.label}</span>
                                </NavLink>
                            ))}
                            <div className="mt-[40px] border-b border-gray-100"></div>
                            <div className="mt-[20px]">
                                <Link to="/Following" className="flex gap-2.5 items-center cursor-pointer group">
                                    <p className="text-black font-semibold">Following</p>
                                    <span className="text-[22px] group-hover:text-black">
                                        <RiArrowRightSLine />
                                    </span>
                                </Link>
                                <div className="flex gap-2.5 w-full mt-[40px]">
                                    <span>
                                        <GoPerson />
                                    </span>
                                    <div className="flex flex-col gap-1.5 max-w-[180px]">
                                        <p>Discover more writers and publications to follow.</p>
                                        <span className="underline hover:text-black cursor-pointer">See suggestions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* العمود الأوسط */}
                <div
                    className={
                        isStories || isStats || isAuthorPage
                            ? "col-span-10 p-4 mr-10"
                            : isMore || isExploreTopic
                            ? "col-span-10 p-4" // هنا خلي النص ياخد كل المساحة
                            : isHome
                            ? isOpen
                                ? "col-span-7 p-4"
                                : "col-span-9 p-4"
                            : isOpen
                            ? "col-span-7 p-4"
                            : "col-span-10 p-4"
                    }>
                    <Outlet />
                </div>

                {/* العمود اليمين يظهر بس في الهوم */}
                {(isHome || isProfile) && !isMore && !isExploreTopic && (
                    <div className={isOpen ? "col-span-3 p-4" : "col-span-3 p-4"}>
                        <div className="sticky top-[8vh] h-[calc(100vh-8vh)] overflow-auto">
                            <RightSideBar />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
