import Swal from "sweetalert2";
import { useNavigate,useLocation } from "react-router-dom";
import { useSubscriptionStore } from "../store/useSubscriptionStore";

export default function SubscriptionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const setSubscribed = useSubscriptionStore((state) => state.setSubscribed);
    const { slug } = location.state;
     

    const handleSubscribe = () => {
        // تحديث zustand
        setSubscribed(true);

        // تخزين في localStorage
        localStorage.setItem("subscribed", "true");

        Swal.fire({
            position: "top",
            icon: "success",
            title: "You are now a member! ✨",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            width: "auto",
        }).then(() => {
            navigate(`/article/${slug}`); // يرجع للصفحة بعد انتهاء التنبيه
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-10 text-center">Choose Your Plan</h1>

            <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
                {/* الاشتراك الشهري */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transform transition-all">
                    <h2 className="text-2xl font-semibold mb-4">Monthly Plan</h2>
                    <p className="text-3xl font-bold mb-6">$9.99 / month</p>
                    <ul className="text-left mb-6 space-y-2">
                        <li>✅ Full access to all articles</li>
                        <li>✅ Comment on stories</li>
                        <li>✅ Save stories to library</li>
                    </ul>

                    <button onClick={handleSubscribe} className="cursor-pointer bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all">
                        Subscribe Monthly
                    </button>
                </div>

                {/* الاشتراك السنوي */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border-2 border-amber-500 hover:scale-105 transform transition-all">
                    <h2 className="text-2xl font-semibold mb-4">Annual Plan</h2>
                    <p className="text-3xl font-bold mb-6">$99.99 / year</p>
                    <ul className="text-left mb-6 space-y-2">
                        <li>✅ Full access to all articles</li>
                        <li>✅ Comment on stories</li>
                        <li>✅ Save stories to library</li>
                        <li>✅ 2 months free</li>
                    </ul>

                    <button onClick={handleSubscribe} className="cursor-pointer bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all">
                        Subscribe Annually
                    </button>
                </div>
            </div>
        </div>
    );
}
