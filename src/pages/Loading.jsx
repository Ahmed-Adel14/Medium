import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    const [text, setText] = useState("");
    const word = "Medium";
    const navigate = useNavigate();

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(word.slice(0, i + 1));
            i++;
            if (i === word.length) {
                clearInterval(interval);
                 setTimeout(() => navigate("/Home", { replace: true }), 1000); // بعد ما يخلص يروح للهوم
            }
        }, 300); // سرعة الكتابة (كل 300ms يضيف حرف)

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <h1 className="text-white text-6xl font-bold font-playfair tracking-wide">{text}</h1>
        </div>
    );
}
