import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaLock, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (username === "admin" && password === "123456") {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Login Successful — Welcome 🎉",
                    toast: true,
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    navigate("/welcome");
                });
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Invalid username or password",
                    toast: true,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    };

    return (
        <div className="h-screen flex">
            {/* الجزء الشمال (صورة / Illustration) */}
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src="/public/images/student-selecting-ebook-online-from-book-library_701961-8638.jpg" alt="Sign in illustration" className="w-fit h-auto" />
            </div>

            {/* الجزء اليمين (الفورم) */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
                <div className="w-[90%] max-w-md p-8 shadow-lg rounded-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

                    <form onSubmit={handleSubmit} autoComplete="off">
                        {/* Dummy Inputs عشان نمنع حفظ الباسورد */}
                        <input type="text" name="fake-username" autoComplete="username" style={{ display: "none" }} />
                        <input type="password" name="fake-password" autoComplete="new-password" style={{ display: "none" }} />

                        {/* Username */}
                        <div className="mb-4">
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <FaUser className="text-gray-400 mr-2" />
                                <input type="text" placeholder="Your name" className="w-full outline-none" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
                            </div>
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between text-sm mb-4">
                            <label className="flex items-center gap-1">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <Link to="#" className="text-green-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <button type="submit" className="w-full bg-green-600 text-white rounded-lg py-3 font-semibold hover:bg-green-700 transition">
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        <button className="border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition text-blue-600">
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                            Continue with Facebook
                        </button>
                        <button className="border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition">
                            <TfiEmail />
                            Continue with Email
                        </button>
                    </div>

                    {/* Redirect */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <Link to="/Signup" className="text-green-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div className="mb-6 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 text-center">
              
                <p className="font-mono text-gray-900">
                    Username: <span className="font-bold">admin</span>
                </p>
                <p className="font-mono text-gray-900">
                    Password: <span className="font-bold">123456</span>
                </p>
                <p>طبعا ده هيتشال</p>
            </div>
        </div>
    );
}
