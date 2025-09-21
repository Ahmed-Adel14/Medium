import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import Chart from "../components/Chart";
export default function Stats() {
  const [activeTab, setActiveTab] = useState("Stories");
  const[active,setActive]=useState("Month")
    return (
        <div className="mt-10 ml-[70px]">
            <h1 className="text-[42px] font-semibold text-black">Stats</h1>
            <div className="flex gap-8 mt-7 text-[16px]">
                <span onClick={() => setActiveTab("Stories")} className={`cursor-pointer pb-2 ${activeTab === "Stories" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}}`}>
                    Stories
                </span>
                <span onClick={() => setActiveTab("Audience")} className={`cursor-pointer pb-2 ${activeTab === "Audience" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}}`}>
                    Audience
                </span>
            </div>
            <div className="border-b border-gray-100 mt-0.4"></div>
            {activeTab === "Stories" && (
                <>
                    <div className="flex items-center justify-between mt-10 mr-8">
                        <h2 className="text-[26px] text-black font-semibold">Monthly</h2>
                        <p className="flex justify-between items-center gap-7 px-[20px] py-[8px] rounded-full text-[15px] text-black border border-solid border-gray-300">
                            September2025
                            <span>
                                <MdOutlineKeyboardArrowDown />
                            </span>
                        </p>
                    </div>
                    <p className="text-[13px]">September 15, 2025 – Today (UTC) · Updated hourly</p>
                    <div className="flex items-center gap-9 mt-6">
                        <div className="flex flex-col gap-1  text-black">
                            <h1 className="text-[45px] font-medium ml-2 ">0</h1>
                            <span className="text-[18px] font-medium">Views</span>
                        </div>
                        <div className="flex flex-col gap-1  text-black">
                            <h1 className="text-[45px] font-medium ml-2 ">0</h1>
                            <span className="text-[18px] font-medium">Read</span>
                        </div>
                    </div>
                    <span>
                        <Chart />
                    </span>
                    <div className="mt-14 border border-gray-100"></div>
                    <div className="flex items-center justify-between mt-6">
                        <h1 className="text-black text-[25px] font-medium">Lifetime</h1>
                        <p className="flex justify-between items-center gap-15 px-[25px] py-[8px] rounded-full text-[15px]  text-gray-400 border border-solid border-gray-300">
                            Latest
                            <span>
                                <MdOutlineKeyboardArrowDown />
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-10 text-[15px]">
                        <p>Story</p>
                        <div className="flex gap-14">
                            <span>Views</span>
                            <span>Reads</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-9 gap-9">
                        <p>You haven’t published any stories yet.</p>
                        <span className="text-[12px] px-2.5 py-1.5 rounded-full bg-black text-white cursor-pointer">Start Writing</span>
                    </div>
                </>
            )}
            {activeTab === "Audience" && (
                <>
                    <h2 className="text-[26px] text-black font-semibold mt-10 mr-8">All time</h2>
                    <p className="text-[13px]">September 15, 2025 – Today (UTC) · Updated daily</p>
                    <div className="flex items-center gap-14 mt-6">
                        <div className="flex flex-col gap-1  text-black relative">
                            <h1 className="text-[45px] font-medium ml-2 ">0</h1>
                            <div className="flex flex-col text-[15px] font-medium">
                                <div className="flex items-center gap-2">
                                    <p>Followers</p>
                                    <span className="cursor-pointer relative group">
                                        <MdInfoOutline />
                                        <div className="opacity-0 group-hover:opacity-100  group-hover:delay-0 delay-[300ms] transition-opacity   w-[250px] h-[100px] bg-white absolute top-full left-1/2 -translate-x-1/2 mt-2 shadow-lg z-10">
                                            <p className="p-4 text-[13px]  text-[#6B6B6B]">Readers who follow you on Medium. This excludes deactivated, deleted, or suspended users.</p>
                                        </div>
                                    </span>
                                </div>
                                <p>0 from last month</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1  text-black relative">
                            <h1 className="text-[45px] font-medium ml-2 ">0</h1>
                            <div className="flex flex-col text-[15px] font-medium ">
                                <div className="flex items-center gap-2">
                                    <p>Followers</p>
                                    <span className="cursor-pointer relative group">
                                        <MdInfoOutline />
                                        <div className=" opacity-0 group-hover:opacity-100  group-hover:delay-0 delay-[300ms] transition-opacity   w-[330px] h-[100px] bg-white absolute top-full left-1/2 -translate-x-1/2 mt-2 shadow-lg z-10">
                                            <p className="p-4 text-[13px]  text-[#6B6B6B]">
                                                Readers who have opted to receive emails from you. This excludes those who have unsubscribed or are inactive, deactivated, deleted, or suspended.
                                            </p>
                                        </div>
                                    </span>
                                </div>
                                <p>0 from last month</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10 mr-8">
                        <h2 className="text-[26px] text-black font-semibold">Audience growth</h2>
                        <p className="px-[20px] py-[8px] rounded-full text-[15px] text-black border border-solid border-black">Download CSV</p>
                    </div>
                    <p className="text-[13px]">Updated daily</p>
                    <div className="flex items-center justify-between mt-20">
                        <span
                            onClick={() => setActive("Month")}
                            className={`flex items-center gap-1 cursor-pointer pb-2 ${active === "Month" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}}`}>
                            Month {active === "Month" && <MdOutlineKeyboardArrowDown />}
                        </span>
                        <div className="flex flex-col">
                            <span className="transform translate-y-[-30px] text-black  text-[18px] font-medium">Followers</span>
                            <span
                                onClick={() => setActive("total")}
                                className={`flex items-center gap-1  transform translate-y-[-15px] cursor-pointer pb-2 ${
                                    active === "total" ? "text-black border-b-1 border-black" : "text-gray-500"
                                }}`}>
                                Total {active === "total" && <MdOutlineKeyboardArrowDown />}
                            </span>
                        </div>
                        <span
                            onClick={() => setActive("Change")}
                            className={`flex items-center gap-1  cursor-pointer pb-2 ${active === "Change" ? "text-black border-b-1 border-black" : "text-gray-500"}}`}>
                            Change {active === "Change" && <MdOutlineKeyboardArrowDown />}
                        </span>
                        <div className="flex flex-col">
                            <span className="transform translate-y-[-30px] text-black  text-[18px] font-medium">Email subscribers</span>
                            <span
                                onClick={() => setActive("Total")}
                                className={` flex items-center gap-1 transform translate-y-[-15px] cursor-pointer pb-2 ${
                                    active === "Total" ? "text-black border-b-1 border-black" : "text-gray-500"
                                }}`}>
                                Total {active === "Total" && <MdOutlineKeyboardArrowDown />}
                            </span>
                        </div>
                        <span
                            onClick={() => setActive("Changee")}
                            className={`flex items-center gap-1 cursor-pointer pb-2 ${active === "Changee" ? "text-black border-b-1 border-black" : "text-gray-500"}}`}>
                            Change {active === "Changee" && <MdOutlineKeyboardArrowDown />}
                        </span>
                    </div>
                    <div className="border  border-gray-100 tranform translate-y-[-14px]"></div>
                </>
            )}
        </div>
    );
}
