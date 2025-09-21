import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Box from "../components/Box";
import { useUserStore } from "../store/UserStore";
import { BsBookmarkFill } from "react-icons/bs";
export default function Profile() {
    const [activeTab, setActiveTab] = useState("Home");
    const { profileName } = useUserStore();
    return (
        <div className="mt-10 ml-[100px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[42px] font-semibold text-black"> {profileName}</h1>
                <p className="text-[23px] hover:text-black cursor-pointer ">
                    <FiMoreHorizontal />
                </p>
            </div>
            <div className="flex gap-7 mt-7 text-[16px]">
                <span onClick={() => setActiveTab("Home")} className={`cursor-pointer pb-2 ${activeTab === "Home" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}`}>
                    Home
                </span>
                <span onClick={() => setActiveTab("About")} className={`cursor-pointer pb-2 ${activeTab === "About" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}`}>
                    About
                </span>
            </div>

            <div className="border-b border-gray-100 mt-0.4"></div>
            {activeTab === "Home" && <Box />}
            {activeTab === "About" && (
                <div className="w-full h-[40vh] bg-gray-100 mt-10 flex flex-col justify-center items-center gap-4 text-black">
                    <p className="text-black font-medium text-[18px]">Tell the world about yourself</p>
                    <span className="text-[14px] px-11 text-center">
                        Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to
                        personalize your bio.
                    </span>
                    <div className="px-[20px] py-[10px] border-solid border rounded-full cursor-pointer text-shadow-black hover:text-black">Get Started</div>
                </div>
            )}
        </div>
    );
}
