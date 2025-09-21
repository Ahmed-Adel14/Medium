import { useState } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "../store/useDataStore";

export default function Choose() {
    const topics = [
        "Data Science",
        "Technology",
        "Self Improvement",
        "Writing",
        "Relationships",
        "Machine Learning",
        "Productivity",
        "Politics",
        "Cryptocurrency",
        "Psychology",
        "Money",
        "Business",
        "Python",
        "Health",
        "Science",
        "Mental Health",
        "Software Development",
        "Startup",
        "Design",
        "JavaScript",
        "Artificial Intelligence",
        "Culture",
        "Software Engineering",
        "Blockchain",
        "Life",
    ];

    const [selectedTopics, setSelectedTopics] = useState([]);
    const setChosenTags = useDataStore((state) => state.setChosenTags);
    const navigate = useNavigate();

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleConfirm = () => {
        if (selectedTopics.length >= 3) {
            setChosenTags(selectedTopics);
            navigate("/Loading"); // نروح للصفحة الرئيسية
        } else {
            alert("Please select at least 3 topics");
        }
    };

    return (
        <div className="flex items-center gap-7 flex-col">
            <div className="text-[35px] text-[#000000] font-playfair font-[700]">Medium</div>
            <div className="w-60 h-40 mt-18">
                <img className="w-full h-full object-contain" src="/images/choose.png" alt="" />
            </div>
            <h1 className="text-[30px] text-[#000000] font-playfair">What are you interested in?</h1>
            <p className="text-black text-[20px]">Choose three or more.</p>

            <div className="flex items-center gap-2 flex-wrap w-[700px]">
                {topics.map((topic, i) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                        <span
                            key={i}
                            onClick={() => toggleTopic(topic)}
                            className={`mt-4 flex items-center gap-2 border px-[20px] py-[5px] rounded-full cursor-pointer transition-all
                                ${isSelected ? "border-green-600 bg-green-100 text-green-700" : "border-gray-300 bg-gray-200 text-black"}`}>
                            {topic}
                            {isSelected ? <FiCheck className="text-green-600" /> : <FiPlus className="text-gray-600" />}
                        </span>
                    );
                })}
            </div>

            <p onClick={handleConfirm} className="w-[250px] h-[40px] flex items-center justify-center text-white mb-8 rounded-full bg-[#343a40] cursor-pointer">
                Confirm
            </p>
        </div>
    );
}
