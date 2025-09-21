import { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useArticlesStore from "../store/useArticlesStore";

export default function Stories() {
    const [activeTab, setActiveTab] = useState("Drafts");
    const [openMenuId, setOpenMenuId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTargetId, setModalTargetId] = useState(null);

    // Zustand store
    const articles = useArticlesStore((state) => state.articles);
    const deleteArticle = useArticlesStore((state) => state.deleteArticle);

    const drafts = articles.filter((a) => a.status === "draft");
    const published = articles.filter((a) => a.status === "published");

    // يقفل المنيو لو ضغطت بره
    useEffect(() => {
        function handleClickOutside(e) {
            const insideMenu = !!e.target.closest("[data-menu-root]");
            if (!insideMenu) setOpenMenuId(null);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // يقفل المودال بـ Escape
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setModalOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    // حذف draft
    const confirmDeleteDraft = () => {
        deleteArticle(modalTargetId);
        setModalOpen(false);
        setModalTargetId(null);
        setOpenMenuId(null);
    };

    return (
        <div className="mt-10 ml-[70px] mr-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[42px] font-semibold text-black">Stories</h1>
                <div className="px-[20px] py-[10px] rounded-full border-black border text-[15px] cursor-pointer text-black">Import Story</div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 mt-7 text-[16px]">
                {["Drafts", "Published", "Unlisted"].map((tab) => (
                    <span key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer pb-2 ${activeTab === tab ? "text-black border-b border-black -mb-[2px]" : "text-gray-500"}`}>
                        {tab}
                    </span>
                ))}

                <div className="flex gap-2.5 items-center ml-6">
                    <span onClick={() => setActiveTab("Submissions")} className={`cursor-pointer pb-2 ${activeTab === "Submissions" ? "text-black border-b border-black -mb-[2px]" : "text-gray-500"}`}>
                        Submissions
                    </span>
                    <div className="px-1 rounded-[3px] bg-green-600 text-[14px] text-white">New</div>
                </div>
            </div>

            <div className="border-b border-gray-100 mt-0.5"></div>

            {/* DRAFTS */}
            {activeTab === "Drafts" && (
                <>
                    {drafts.length > 0 ? (
                        <div className="flex flex-col gap-4 mt-4">
                            {drafts.map((d) => (
                                <div key={d.id} className="flex items-center justify-between bg-amber-50 p-4 rounded-md">
                                    <div className="flex items-center gap-4">
                                        {d.image ? (
                                            <img src={d.image} alt={d.title} className="w-[100px] h-[70px] object-cover rounded-md" />
                                        ) : (
                                            <div className="w-[100px] h-[70px] bg-amber-300 rounded-md flex items-center justify-center text-xs text-white">No Image</div>
                                        )}

                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold">{d.title || "Untitled"}</h3>
                                            <span className="text-sm text-gray-600">{d.content?.slice(0, 60) || "No content"}</span>
                                            <span className="text-xs text-gray-500 mt-1">{d.date}</span>
                                        </div>
                                    </div>

                                    <div className="relative" data-menu-root>
                                        <button onClick={() => setOpenMenuId(openMenuId === d.id ? null : d.id)} className="text-[22px] p-2 rounded-full hover:bg-gray-100">
                                            <FiMoreHorizontal />
                                        </button>

                                        {openMenuId === d.id && (
                                            <div className="absolute right-0 top-10 w-[220px] bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
                                                <button
                                                    onClick={() => {
                                                        setModalOpen(true);
                                                        setModalTargetId(d.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[15px] text-red-600 hover:bg-red-50">
                                                    Delete Story...
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex text-center mt-16 flex-col gap-3 text-black">
                            <p>You have no stories in draft.</p>
                            <h2>
                                Why not <span className="underline cursor-pointer">start writing one?</span>
                            </h2>
                        </div>
                    )}
                </>
            )}

            {/* PUBLISHED */}
            {activeTab === "Published" && (
                <>
                    {published.length > 0 ? (
                        <div className="flex flex-col gap-4 mt-4">
                            {published.map((a) => (
                                <div key={a.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                                    <div className="flex items-center gap-4">
                                        {a.image ? (
                                            <img src={a.image} alt={a.title} className="w-[100px] h-[70px] object-cover rounded-md" />
                                        ) : (
                                            <div className="w-[100px] h-[70px] bg-gray-300 rounded-md flex items-center justify-center text-xs text-white">No Image</div>
                                        )}

                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold">{a.title || "Untitled"}</h3>
                                            <span className="text-sm text-gray-600">{a.content?.slice(0, 60) || "No content"}</span>
                                            <span className="text-xs text-gray-500 mt-1">{a.date || "Just now"}</span>
                                        </div>
                                    </div>

                                    <div className="relative" data-menu-root>
                                        <button onClick={() => setOpenMenuId(openMenuId === a.id ? null : a.id)} className="text-[22px] p-2 rounded-full hover:bg-gray-100">
                                            <FiMoreHorizontal />
                                        </button>

                                        {openMenuId === a.id && (
                                            <div className="absolute right-0 top-10 w-[220px] bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
                                                <button
                                                    onClick={() => {
                                                        deleteArticle(a.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-[15px] text-red-600 hover:bg-red-50">
                                                    Delete Story...
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex text-center mt-16 flex-col gap-3 text-black">
                            <p>You have no published stories yet.</p>
                            <h2>We can't wait to see what you write!</h2>
                        </div>
                    )}
                </>
            )}

            {/* باقي التابات */}
            {activeTab === "Unlisted" && (
                <div className="text-center mt-16 text-black">
                    <p>No unlisted stories yet.</p>
                </div>
            )}

            {activeTab === "Submissions" && (
                <>
                    <div className="flex items-center justify-between mt-3.5">
                        <p>Latest</p>
                        <div className="flex items-center mr-12 gap-40">
                            <p>Publication</p>
                            <div className="flex items-center">
                                <p>Status</p>
                                <MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                    </div>
                    <div className="flex text-center mt-16 flex-col gap-3 text-black">
                        <p>You have no submissions yet.</p>
                        <h2 className="underline">Explore publications</h2>
                    </div>
                </>
            )}

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10">
                        <h3 className="text-xl font-semibold mb-2">Delete Post</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick={confirmDeleteDraft} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
