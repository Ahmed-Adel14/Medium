import { useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Box from "../components/Box";
export default function Library() {
    const [activeTab, setActiveTab] = useState("Your lists");
    return (
        <div className="mt-9 ml-53">
            <div className="flex justify-between items-center">
                <h1 className="text-[40px] font-bold text-black">Your library</h1>
                <span className="py-[10px] px-[20px]  bg-green-700 rounded-3xl text-white hover:bg-green-800 cursor-pointer  ">New List</span>
            </div>
            <div className="flex gap-7 mt-7 text-[16px]">
                <span onClick={() => setActiveTab("Your lists")} className={`cursor-pointer pb-2 ${activeTab === "Your lists" ? "text-black border-b-2 border-black -mb-[2px]" : "text-gray-500"}`}>
                    Your lists
                </span>
                <span onClick={() => setActiveTab(" Saved lists")} className={`cursor-pointer pb-2 ${activeTab === " Saved lists" ? "text-black border-b-2 border-black -mb-[2px]" : "text-gray-500"}`}>
                    Saved lists
                </span>
                <span onClick={() => setActiveTab(" Highlights")} className={`cursor-pointer pb-2 ${activeTab === " Highlights" ? "text-black border-b-2 border-black -mb-[2px]" : "text-gray-500"}`}>
                    Highlights
                </span>
                <span
                    onClick={() => setActiveTab(" Reading history")}
                    className={`cursor-pointer pb-2 ${activeTab === " Reading history" ? "text-black border-b-2  border-black -mb-[2px]" : "text-gray-500"}`}>
                    Reading history
                </span>
            </div>
            <div className="border-b border-gray-100 mt-0.5"></div>

            {activeTab === "Your lists" && (
                <div>
                    {" "}
                    <div className="relative w-full h-[25vh] mt-11 rounded-[10px] bg-green-700 flex overflow-hidden">
                        <div className="flex flex-col gap-1 w-[50%]">
                            <p className="p-6 text-2xl tracking-tight font-bold text-white " style={{ wordSpacing: "-2px" }}>
                                Create a list to easily organize and share stories
                            </p>
                            <span className="px-4 py-2.5 ml-4 bg-[#222725] text-white cursor-pointer hover:bg-black rounded-3xl w-fit">Start a list</span>
                        </div>
                        <div className="absolute h-[50vh] w-[45%] right-10 top-[-70px] bg-white opacity-10 rounded-[50%]"></div>
                        <div className="w-[4rem] h-[4rem] rounded-full bg-white absolute right-0 translate-y-[60px] transform translate-x-[-150px] flex justify-center items-center">
                            <p className=" text-2xl text-green-700 ">
                                <BsBookmarkPlus />
                            </p>
                        </div>
                        <span className="absolute top-3 right-3 text-[30px] text-white cursor-pointer">
                            <IoIosClose />
                        </span>
                    </div>
                    <Box/>
                </div>
            )}

            {activeTab === " Saved lists" && (
                <div className="w-full flex flex-col items-center gap-3">
                    <p className="text-black mt-18 font-medium">No lists from others</p>
                    <span>Save someone else's list and it will appear here.</span>
                </div>
            )}
            {activeTab === " Reading history" && (
                <div className="flex items-center flex-col gap-6 mt-18">
                    <p className="text-black font-medium text-[18px]">You haven’t read any stories yet</p>
                    <span>Stories you’ve read on Medium will appear here.</span>
                </div>
            )}
        </div>
    );
}
