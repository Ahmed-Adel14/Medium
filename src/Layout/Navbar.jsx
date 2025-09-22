import React, { useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa6";
import { useUserStore } from "../store/UserStore";
import { FaSearch, FaCompass } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxArrowTopRight } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Navbar({ isOpen, setIsOpen }) {
    const [isActive, setIsActive] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const boxSearch = useRef(null);
      const { avatar, profileName } = useUserStore();
  useEffect(() => {
      function handleClickOutside(event) {
          if (boxSearch.current && !boxSearch.current.contains(event.target)) {
              setIsActive(false);
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-[8vh] flex items-center justify-between gap-[10px] bg-white z-50 shadow-sm px-4">
                <div className="logo flex g-2 ml-4 items-center gap-4  justify-center ">
                    <p onClick={() => setIsOpen(!isOpen)} className="text-[20px] text-[#000000] cursor-pointer">
                        <FaBars />
                    </p>
                    <Link to="/Home" className="text-[30px]  text-[#000000] font-playfair font-[700] ">
                        Medium
                    </Link>
                    <div
                        ref={boxSearch}
                        onClick={() => setIsActive(!isActive)}
                        className={`flex relative items-center px-3 py-1 w-[250px] border h-[40px] rounded-full border-gray-300 cursor-pointer ${
                            isActive ? "text-black bg-[#d4d7bd]" : "text-[#6B6B6B]"
                        }`}>
                        <FaSearch className="text-[20px]" />
                        <input type="text" placeholder="Search" className="ml-2 outline-none w-full text-sm bg-transparent" />
                        {isActive && (
                            <>
                                <div className="absolute bottom-[-5rem] left-0 w-[320px] h-[70px] bg-stone-50 flex justify-between items-center p-[10px] shadow-md">
                                    <div className="flex gap-[10px] items-center ml-[10px]">
                                        <p className="text-[20px]">
                                            <FaCompass />
                                        </p>
                                        <span>Explore topics</span>
                                    </div>
                                    <div className="text-[20px] flex items-center">
                                        <RxArrowTopRight />
                                    </div>
                                </div>
                                <div className="absolute bottom-[-1.2rem] left-5 w-4 h-4 bg-stone-50 border-l border-t border-gray-200 rotate-45"></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-[25px] items-center mr-[20px]">
                    <Link to="/Publish" className=" flex gap-1 items-center justify-center text-[18px] hover:text-black cursor-pointer ">
                        <FaPenToSquare /> write
                    </Link>
                    <Link to="/Notifications" className="text-[20px]  hover:text-black cursor-pointer">
                        <IoNotificationsOutline />
                    </Link>
                    

                    <div className="relative inline-block">
                        <span
                            onClick={() => setIsImage(!isImage)}
                            className="text-[25px] hover:text-black cursor-pointer w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                            {!avatar ? <BsPersonCircle /> : <img src={avatar} alt="avatar" className="w-full h-full object-cover" />}
                        </span>

                        {isImage && (
                            <>
                                {/* الخلفية الشفافة - أي ضغطه عليها تقفل المينيو */}
                                <div onClick={() => setIsImage(false)} className="fixed inset-0 z-40"></div>

                                {/* البوكس نفسه */}
                                <div className="absolute right-0 mt-2 w-[230px] h-[350px] bg-white shadow-lg rounded-lg z-50">
                                    <div className="flex flex-col gap-2 p-6">
                                        <Link to="/Profile" className="flex items-center gap-2.5">
                                            <div className="w-[3rem] h-[3rem] rounded-full bg-gray-50">
                                                {!avatar ? <BsPersonCircle /> : <img src={avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />}
                                            </div>
                                            <div className="flex flex-col gap-0.5 hover:text-black text-[13px] cursor-pointer">
                                                <span className="font-medium">{profileName}</span>
                                                <span>View Profile</span>
                                            </div>
                                        </Link>

                                        <div className="flex gap-5 items-center mt-3.5 text-[17px] cursor-pointer hover:text-black">
                                            <span>
                                                <BsGear />
                                            </span>
                                            <p>Settings</p>
                                        </div>

                                        <div className="flex gap-5 items-center text-[17px] cursor-pointer hover:text-black">
                                            <span>
                                                <GoQuestion />
                                            </span>
                                            <p>Help</p>
                                        </div>

                                        <div className="w-full border border-gray-100 mt-3"></div>

                                        <div className="flex flex-col text-[14px] font-medium cursor-pointer gap-1.5">
                                            <p className="hover:text-black">Become a Medium member</p>
                                            <p className="hover:text-black">Apply to the Program</p>
                                        </div>

                                        <div className="w-full border border-gray-100 mt-3"></div>

                                        <div className="flex flex-col gap-2 cursor-pointer hover:text-black">
                                            <p>Sign out</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
