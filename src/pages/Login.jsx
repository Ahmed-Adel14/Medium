import { TfiEmail } from "react-icons/tfi";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
    const [showModal, setShowModal] = useState(false);

    const links = ["Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Rules", "Terms", "Text to speech"];

    return (
        <>
            {/* Navbar */}
            <div className="flex justify-between items-center mt-3 mx-[150px] ">
                <h1 className="text-[30px] font-bold text-black font-playfair">Medium</h1>
                <div className="flex items-center gap-8">
                    <p className="text-black cursor-pointer">Our story</p>
                    <p className="text-black cursor-pointer">Membership</p>
                    <p className="text-black cursor-pointer">Write</p>
                    <p onClick={() => setShowModal(true)} className="text-black cursor-pointer">
                        Sign in
                    </p>
                    <span onClick={() => setShowModal(true)} className="text-white bg-[#212529] rounded-full px-3.5 py-2 cursor-pointer hover:bg-black">
                        Get started
                    </span>
                </div>
            </div>

            <div className="border border-[#212529] mt-5"></div>

            {/* Hero */}
            <div className="flex items-center gap-9 ml-[150px] h-[80vh] ">
                <div className="flex flex-col w-[60%] mt-36 mb-7">
                    <h1 className="text-[#212529] text-[120px] tracking-[-7px] font-playfair max-w-[700px] leading-30">Human stories & ideas</h1>
                    <p className="text-[#212529] mt-8 text-[25px] tracking-[-1px]">A place to read, write, and deepen your understanding</p>
                    <span onClick={() => setShowModal(true)} className="text-white text-[20px] bg-[#212529] mt-8 rounded-full px-10 py-2 cursor-pointer hover:bg-black w-fit">
                        Start Reading
                    </span>
                </div>
                <div className="w-[40%] h-full">
                    <img src="/public/images/4_SdjkdS98aKH76I8eD0_qjw.webp" alt="" className="w-full h-full " />
                </div>
            </div>

            <div className="border border-[#212529]"></div>

            {/* Footer Links */}
            <div className="mt-5 flex items-center justify-center gap-2.5 text-[14px]">
                {links.map((link, i) => (
                    <p key={i} className="cursor-pointer">
                        {link}
                    </p>
                ))}
            </div>

            {/* Modal (Sign up options) */}
            {showModal && (
                <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white w-[420px] rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl cursor-pointer">
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Join Medium</h2>

                        <div className="flex flex-col gap-4">
                            <Link to="/SignIn" className="border border-black rounded-full py-2 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                Sign up with Google
                            </Link>
                            <Link to="/SignIn" className="border border-black rounded-full py-2 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 text-blue-600 cursor-pointer">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                                Sign up with Facebook
                            </Link>
                            <Link to="/SignIn" className="border border-black rounded-full py-2 font-medium hover:bg-gray-50 flex items-center justify-center gap-3 cursor-pointer">
                                <p>
                                    <TfiEmail />
                                </p>
                                <span>Sign up with email</span>
                            </Link>
                        </div>

                        <p className="text-sm text-gray-600 text-center mt-6">
                            Already have an account? <Link to="/SignIn" className="text-green-600 cursor-pointer hover:underline font-medium">Sign in</Link>
                        </p>

                        <p className="text-xs text-gray-500 text-center mt-4 leading-5">
                            Click “Sign up” to agree to Medium’s <span className="underline cursor-pointer">Terms of Service</span> and acknowledge that Medium’s{" "}
                            <span className="underline cursor-pointer">Privacy Policy</span> applies to you.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
