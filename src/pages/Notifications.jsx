import { useState } from "react";
export default function Notifications() {
   const [activeTab, setActiveTab] = useState("All");
    return (
        <>
            <div className="mt-9 ml-53">
                <h1 className="text-[40px] font-bold text-black">Notifications</h1>
                <div className="flex gap-7 mt-7 text-[16px]">
                    <span onClick={() => setActiveTab("All")} className={`cursor-pointer pb-2 ${activeTab === "All" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}`}>
                        All
                    </span>
                    <span onClick={() => setActiveTab("Responses")} className={`cursor-pointer pb-2 ${activeTab === "Responses" ? "text-black border-b-1 border-black -mb-[2px]" : "text-gray-500"}`}>
                        Responses
                    </span>
                </div>
                <div className="border-b border-gray-100 mt-0.4"></div>
                {activeTab === "All" && <p className="flex justify-center mt-8">You're all caught up.</p>}
                {activeTab === "Responses" && <p className="flex justify-center mt-8">You're all caught up.</p>}
            </div>
        </>
    );
}
