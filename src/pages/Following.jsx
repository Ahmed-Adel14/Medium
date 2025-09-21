import { useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import ArticlePage from "../components/ArticlePage";
import { IoCheckmark } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
export default function Following() {
    const [activeTab, setActiveTab] = useState("Writers and Publications");
      const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Javascript");
      const [selected, setSelected] = useState("Latest");
    
    return (
        <div className="mt-16 ml-50">
            <h1 className=" text-[40px] font-medium text-black">Following</h1>
            <div className="flex gap-4 items-center">
                <span
                    onClick={() => setActiveTab("Writers and Publications")}
                    className={`mt-4 border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer ${activeTab === "Writers and Publications" ? " border-black" : "border-gray-200"} `}>
                    Writers and Publications
                </span>
                <span
                    onClick={() => setActiveTab("Topics")}
                    className={`mt-4 border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer ${activeTab === "Topics" ? " border-black" : "border-gray-200"} `}>
                    Topics
                </span>
            </div>
            {activeTab === "Topics" && (
                <div className="flex items-center gap-2.5 mt-5 ">
                    <div onClick={() => setOpen(!open)} className="relative border border-solid border-gray-200 text-black rounded-full px-[15px] py-1 flex gap-2 items-center cursor-pointer">
                        <p>{selected}</p>
                        <span>{open ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
                        {open && (
                            <div className="absolute w-fit h-[100px] bg-white shadow-lg z-10 left-0 transform translate-y-[80px] flex flex-col gap-2.5 p-4">
                                <span
                                    onClick={() => setSelected("Latest")}
                                    className={`flex items-center gap-2.5 cursor-pointer ${selected === "Latest" ? "text-black" : "text-gray-400  hover:text-black"}`}>
                                    Latest {selected === "Latest" && <IoCheckmark />}
                                </span>
                                <span
                                    className={`flex items-center gap-2.5  cursor-pointer ${selected === "Recommended" ? "text-black" : "text-gray-400 hover:text-black"}`}
                                    onClick={() => setSelected("Recommended")}>
                                    Recommended {selected === "Recommended" && <IoCheckmark />}
                                </span>
                            </div>
                        )}
                    </div>
                    <Link to="/Suggestions" className="h-[2.5rem] w-[2.5rem] rounded-[50%] bg-gray-200 cursor-pointer flex items-center justify-center text-[20px]">
                        <LuPlus />
                    </Link>
                    <span
                        onClick={() => setActive("Javascript")}
                        className={` border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer bg-gray-100 ${active === "Javascript" ? " border-black" : "border-gray-200"} `}>
                        Javascript
                    </span>
                    <span
                        onClick={() => setActive("Money")}
                        className={` border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer bg-gray-100 ${active === "Money" ? " border-black" : "border-gray-200"} `}>
                        Money
                    </span>
                    <span
                        onClick={() => setActive("Health")}
                        className={` border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer bg-gray-100 ${active === "Health" ? " border-black" : "border-gray-200"} `}>
                        Health
                    </span>
                </div>
            )}
            <div className="border border-gray-100 mt-3.5"></div>
            <div className="">
                <ArticlePage />
            </div>
            {activeTab === "Writers and Publications" && <ArticlePage />}
        </div>
    );
}
