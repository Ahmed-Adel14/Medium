import { useState } from "react";
import { Link } from "react-router-dom";
import useArticlesStore from "../store/useArticlesStore";

export default function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const addArticle = useArticlesStore((state) => state.addArticle);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(URL.createObjectURL(file));
    };

    // لما يضغط زر Publish
    const handlePublishClick = () => {
        setPopupOpen(true);
    };

    // بعد اختيار Public أو Draft
    const handlePublish = (status) => {
        if (!title.trim() && !content.trim()) {
            alert("لازم تكتب عنوان أو محتوى الأول ✍️");
            return;
        }

        const newArticle = {
            id: Date.now(),
            title: title || "بدون عنوان",
            description: content || "بدون محتوى",
            image: image || null, // ممكن يكون null
            date: new Date().toLocaleDateString(),
            status, // "published" أو "draft"
        };

        addArticle(newArticle);
        setPopupOpen(false);

        // تفريغ الحقول
        setTitle("");
        setContent("");
        setImage(null);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <div className="flex justify-between items-center mx-[250px] mt-2.5">
                <Link to="/" className="text-[30px] text-black font-playfair font-[700]">
                    Medium
                </Link>

                <button onClick={handlePublishClick} className="px-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition cursor-pointer">
                    Publish
                </button>
            </div>

            {/* Editor */}
            <div className="max-w-3xl mx-auto mt-10 px-4 flex flex-col gap-6">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full text-4xl font-bold outline-none placeholder-gray-400" />

                {/* صورة */}
                <div className="flex flex-col">
                    {!image ? (
                        <>
                            <label htmlFor="imageInput" className="cursor-pointer px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition w-fit">
                                + Add an image
                            </label>
                            <input id="imageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </>
                    ) : (
                        <div className="flex justify-center w-full">
                            <img src={image} alt="preview" className="max-h-96 rounded-lg shadow-md" />
                        </div>
                    )}
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    className="w-full text-lg outline-none placeholder-gray-400 resize-none h-[500px]"
                />
            </div>

            {/* Popup */}
            {popupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setPopupOpen(false)} />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10 flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Publish Article</h3>
                        <p>Do you want to make this article Public or keep it as Draft?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setPopupOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick={() => handlePublish("draft")} className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600">
                                Draft
                            </button>
                            <button onClick={() => handlePublish("published")} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                                Public
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
