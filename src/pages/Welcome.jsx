import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/UserStore";

export default function Welcome() {
    const navigate = useNavigate();
    const { profileName, setProfileName } = useUserStore();

    const handleCreateAccount = () => {
        if (!profileName.trim()) {
            alert("Please enter your full name");
            return;
        }

        // نحفظ البيانات في localStorage
        const email = `${profileName}@gmail.com`;
        localStorage.setItem("userFullName", profileName);
        localStorage.setItem("userEmail", email);

        // نروح لصفحة Choose
        navigate("/choose");
    };

    return (
        <div className="flex items-center gap-7 flex-col">
            <div className="text-[35px] text-[#000000] font-playfair font-[700]">Medium</div>

            <div className="w-60 h-40">
                <img className="w-full h-full" src="/images/images.png" alt="" />
            </div>

            <div className="text-[35px] text-[#000000d7] font-playfair">Welcome to Medium!</div>

            <span className="text-[20px] text-black">We need a little more information to finish creating your account.</span>

            <p>Your full name</p>
            <input type="text" className="border rounded-lg px-3 py-2" value={profileName} onChange={(e) => setProfileName(e.target.value)} />

            <span>Your email is {profileName.trim() ? `${profileName}@gmail.com` : ""}</span>

            <div onClick={handleCreateAccount} className="px-5 py-1.5 rounded-full bg-[#fb8500] text-white cursor-pointer hover:bg-[#e07a00] transition">
                Create account
            </div>
        </div>
    );
}
