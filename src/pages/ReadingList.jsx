import { useUserStore } from "../store/UserStore";
import { useSavedArticlesStore } from "../store/SavedArticlesStore";
import { Link } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { CiCircleMinus } from "react-icons/ci";

export default function ReadingList() {
    const { avatar, profileName } = useUserStore();
    const savedArticles = useSavedArticlesStore((state) => state.savedArticles);
    const toggleSaveArticle = useSavedArticlesStore((state) => state.toggleSaveArticle);

    const savedArticlesArray = Object.values(savedArticles).reverse(); // الأحدث أولاً

    const toggleSave = (article, e) => {
        e.preventDefault();
        toggleSaveArticle(article);
    };

    return (
        <div className="mt-12 ml-40 flex flex-col gap-6">
            {/* معلومات المستخدم */}
            <div className="flex items-center gap-4">
                <div className="w-[4rem] h-[4rem] rounded-full bg-amber-200 overflow-hidden">
                    {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" /> : null}
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-black font-semibold text-lg">{profileName}</span>
                    <p className="text-gray-500">
                        {savedArticlesArray.length} {savedArticlesArray.length === 1 ? "story" : "stories"}
                    </p>
                </div>
            </div>

            <h1 className="text-black text-[35px] font-bold mt-6">Reading List</h1>
            <div className="border border-gray-100 mt-3.5 mb-6"></div>

            {/* عرض المقالات كاملة */}
            <div className="flex flex-col gap-6">
                {savedArticlesArray.length > 0 ? (
                    savedArticlesArray.map((article) => {
                        const isSaved = !!savedArticles[article.id];
                        return (
                            <div key={article.id}>
                                <Link to={`/article/${article.slug}`} className="flex flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-3">
                                        <div className="relative group flex items-center gap-2">
                                            {article.avatarUrl ? (
                                                <img src={article.avatarUrl} alt={article.authorName} className="w-5 h-5 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-300" />
                                            )}
                                            <span className="text-sm font-semibold text-gray-700">{article.authorName}</span>

                                            <div className="absolute top-0 transform -translate-y-12 left-0 mt-2 w-72 p-4 bg-white flex flex-col rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition z-50">
                                                <div className="flex items-center justify-between">
                                                    <img src={article.avatarUrl} alt={article.authorName} className="w-12 h-12 rounded-full object-cover" />
                                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600">Follow</button>
                                                </div>
                                                <span className="font-semibold mt-2">{article.authorName}</span>
                                                <p className="text-gray-700 text-sm mt-2 whitespace-pre-line break-words">{article.authorBio || "No bio available"}</p>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
                                        <p className="text-gray-600 text-sm">{article.subtitle}</p>

                                        <div className="flex justify-between items-center text-gray-600 text-sm mt-auto">
                                            <div className="flex items-center gap-4">
                                                <span>{new Date(article.published).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                                                <span className="relative group flex items-center gap-1 cursor-pointer">
                                                    <FaHandsClapping /> {article.likes}
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        {article.likes} claps
                                                    </div>
                                                </span>
                                                <span className="relative group flex items-center gap-1 cursor-pointer">
                                                    <FaComment /> {article.comments}
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        {article.comments} responses
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

                                                <div className="relative group" onClick={(e) => toggleSave(article, e)}>
                                                    {isSaved ? (
                                                        <BsBookmarkFill className="cursor-pointer text-2xl hover:text-black" />
                                                    ) : (
                                                        <BsBookmarkPlus className="cursor-pointer text-2xl hover:text-black" />
                                                    )}
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                        {isSaved ? "Saved" : "Save Article"}
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

                                    {article.coverUrl && (
                                        <div className="flex-shrink-0 w-1/3">
                                            <img src={article.coverUrl} alt={article.title} className="w-full h-32 mt-8 object-cover rounded-xl" />
                                        </div>
                                    )}
                                </Link>
                                <div className="border border-gray-100 mt-3"></div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No saved stories yet.</p>
                )}
            </div>
        </div>
    );
}
