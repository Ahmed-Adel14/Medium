import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDataStore } from "../store/useDataStore";

export default function ExploreTopic() {
    const topics = [
        "Explore topics",
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
        "Artificial Intelligence",
        "Culture",
        "Software Engineering",
        "Blockchain",
        "Life",
    ];

    const [activeTab, setActiveTab] = useState("Explore topics");
    const { articles, selectedTag, setTag, fetchArticles } = useDataStore();

    useEffect(() => {
        if (articles.length === 0) fetchArticles();
    }, [articles.length, fetchArticles]);

    const filteredArticles = selectedTag && selectedTag !== "Explore topics" ? articles.filter((article) => article.tags.includes(selectedTag)) : null;

    const handleTagClick = (tag) => {
        setActiveTab(tag);
        setTag(tag);
    };

    return (
        <div className="px-8 py-2">
            {/* التاجات */}
            <div className="flex items-center gap-2.5 flex-wrap">
                {topics.map((topic, i) => (
                    <span
                        key={i}
                        onClick={() => handleTagClick(topic)}
                        className={`mt-4 flex items-center gap-2 border border-solid px-[20px] py-[5px] rounded-full text-black cursor-pointer bg-gray-200 ${
                            activeTab === topic ? "border-black" : "border-gray-200"
                        }`}>
                        {topic === "Explore topics" && <FiEdit2 />}
                        {topic}
                    </span>
                ))}
            </div>

            {activeTab === "Explore topics" && <div className="text-center text-5xl font-medium text-black mt-5">Explore topics</div>}

            {activeTab !== "Explore topics" && (
                <>
                    <div className="flex flex-col gap-5 text-center mt-10">
                        <h1 className="text-4xl font-medium text-black">{activeTab}</h1>
                        <span className="text-[18px]">Topic · {filteredArticles?.length || 0} stories</span>
                    </div>

                    <p className="mt-10 text-[23px] text-black font-medium">Recommended stories</p>

                    <div className="mt-10 grid grid-cols-3 gap-8">
                        {filteredArticles && filteredArticles.length > 0 ? (
                            filteredArticles.map((item) => (
                                <Link key={item.id} to={`/article/${item.slug}`} className="cards bg-white rounded-lg shadow overflow-hidden flex flex-col h-full">
                                    {/* Cover Image */}
                                    {item.coverUrl && <img src={item.coverUrl} alt={item.title} className="w-full h-48 object-cover" />}

                                    <div className="flex-1 flex flex-col justify-between p-4">
                                        {/* Author + Hover Card */}
                                        <div className="relative group flex items-center gap-2 mb-2">
                                            {item.avatarUrl ? (
                                                <img src={item.avatarUrl} alt={item.authorName} className="w-5 h-5 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-300" />
                                            )}
                                            <span className="text-sm font-semibold text-gray-700">{item.authorName}</span>

                                            <div className="absolute top-0 transform -translate-y-12 left-0 mt-2 w-72 p-4 bg-white flex flex-col rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition z-50">
                                                <div className="flex items-center justify-between">
                                                    <img src={item.avatarUrl} alt={item.authorName} className="w-12 h-12 rounded-full object-cover" />
                                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600">Follow</button>
                                                </div>
                                                <span className="font-semibold mt-2">{item.authorName}</span>
                                                <p className="text-gray-700 text-sm mt-2 whitespace-pre-line break-words">{item.authorBio || "No bio available"}</p>
                                            </div>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                                        <p className="text-gray-600 text-sm mb-2">{item.subtitle}</p>

                                        {/* Stats & Icons */}
                                        <div className="flex justify-between items-center text-gray-600 text-sm mt-auto">
                                            <div className="flex items-center gap-4">
                                                <span>
                                                    {new Date(item.published).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "short",
                                                    })}
                                                </span>
                                                <span className="relative group flex items-center gap-1 cursor-pointer">
                                                    <FaHandsClapping /> {item.likes}
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        {item.likes} claps
                                                    </div>
                                                </span>
                                                <span className="relative group flex items-center gap-1 cursor-pointer">
                                                    <FaComment /> {item.comments}
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        {item.comments} responses
                                                    </div>
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="relative group">
                                                    <CiCircleMinus className="cursor-pointer text-2xl hover:text-black" />
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        Remove
                                                    </div>
                                                </div>

                                                <div className="relative group">
                                                    <BsBookmarkPlus className="cursor-pointer text-2xl hover:text-black" />
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        Save Article
                                                    </div>
                                                </div>

                                                <div className="relative group">
                                                    <FiMoreHorizontal className="cursor-pointer text-2xl hover:text-black" />
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        More Options
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-500 mt-10">لا توجد مقالات لهذا التاج</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
