import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useUserStore } from "../store/UserStore";
import { IoIosClose } from "react-icons/io";
import { BsBookmarkPlus } from "react-icons/bs";
import { useDataStore } from "../store/useDataStore";

export default function RightSideBar() {
    const location = useLocation();
    const isProfile = location.pathname === "/Profile";
    const isHome = location.pathname === "/Home";
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(true);
    const { avatar, setAvatar, profileName, setProfileName, shortBio, setShortBio } = useUserStore();
    const [changeAvatar, setChangeAvatar] = useState(avatar);
    const [changeName, setChangeName] = useState(profileName);
    const [changeBio, setChangeBio] = useState(shortBio);
    const articles = useDataStore((state) => state.articles);

    // ناخد 3 كتاب مختلفين بدون تكرار
    const authorsMap = new Map();
    articles.forEach((article) => {
        if (!authorsMap.has(article.authorName) && authorsMap.size < 3) {
            authorsMap.set(article.authorName, {
                id: article.id,
                name: article.authorName,
                bio: article.authorBio,
                avatarUrl: article.avatarUrl,
            });
        }
    });

    const authors = Array.from(authorsMap.values());

    // تغيير الصورة
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setChangeAvatar(reader.result); // هنا بيتخزن Base64 في localStorage
            };
            reader.readAsDataURL(file);
        }
    };
    const resetChanges = () => {
        setChangeAvatar(avatar);
        setChangeName(profileName);
        setChangeBio(shortBio);
        setIsOpen(false);
    };
    const hasChanges = changeAvatar !== avatar || changeName !== profileName || changeBio !== shortBio;

    return (
        <div>
            {isProfile && (
                <div className="m-8 flex flex-col gap-3">
                    {/* دي برا - بس عرض (مش اختيار) */}
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-gray-600"></span>}
                    </div>

                    <p className="text-black"> {profileName}</p>
                    <p className="text-black"> {shortBio}</p>

                    <span onClick={() => setIsOpen(true)} className="text-green-600 text-[13px] cursor-pointer hover:text-black">
                        Edit Profile
                    </span>
                </div>
            )}

            {isOpen && (
                <div onClick={resetChanges} className="fixed inset-0 bg-black/50 flex justify-center z-50 overflow-y-auto ">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white w-[550px] min-h-[100vh] mt-10 mb-10 p-7 rounded-[5px] shadow-lg relative">
                        <div onClick={resetChanges} className="absolute top-2 right-2 text-2xl cursor-pointer">
                            <IoCloseOutline />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-black text-[22px] font-medium text-center">Profile information</h1>

                            {/* صورة جوه المودال - هي اللي تختار */}
                            <div className="flex items-center gap-4 mt-8">
                                <input type="file" id="avatarInput" accept="image/*" className="hidden" onChange={handleChange} />
                                <label htmlFor="avatarInput" className="w-[5rem] h-[5rem] rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden">
                                    {changeAvatar ? <img src={changeAvatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-gray-600"></span>}
                                </label>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4 ">
                                        <p className="text-green-500 cursor-pointer" onClick={() => document.getElementById("avatarInput").click()}>
                                            Update
                                        </p>
                                        <p className="text-red-700 cursor-pointer" onClick={() => setChangeAvatar(null)}>
                                            Remove
                                        </p>
                                    </div>
                                    <span className="tracking-tight" style={{ wordSpacing: "-2px" }}>
                                        Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                                    </span>
                                </div>
                            </div>

                            {/* باقي الفورم زي ما هو */}
                            <div className="mt-6 text-black">Name*</div>
                            <input
                                type="text"
                                value={changeName}
                                onChange={(e) => setChangeName(e.target.value)}
                                className={`text-black w-full h-9 bg-gray-100 px-2 rounded-md outline-none border ${changeName.length > 50 ? "border-red-500" : "border-gray-200"}`}
                            />
                            <div className="flex items-center mt-1">
                                {changeName.length > 50 && <p className="text-red-600 text-xs">Name may only contain a maximum of 50 characters.</p>}
                                <span className="ml-auto text-sm text-gray-500">
                                    <span className={changeName.length > 50 ? "text-red-600" : "text-black"}>{changeName.length}</span>
                                    /50
                                </span>
                            </div>

                            <div className="mt-6 text-black">Short bio</div>
                            <textarea
                                value={changeBio}
                                onChange={(e) => setChangeBio(e.target.value)}
                                className={`text-black w-full h-23 bg-gray-100 px-2 rounded-md outline-none border ${changeBio.length > 160 ? "border-red-500" : "border-gray-200"}`}
                            />
                            <div className="flex items-center mt-1">
                                {changeBio.length > 160 && <p className="text-red-600 text-xs">Bio may only contain a maximum of 160 characters.</p>}
                                <span className="ml-auto text-sm text-gray-500">
                                    <span className={changeBio.length > 160 ? "text-red-600" : "text-black"}>{changeBio.length}</span>
                                    /160
                                </span>
                            </div>

                            <div className="flex mt-3.5 items-center justify-between">
                                <p className="text-black">About Page</p>
                                <span className="hover:text-black cursor-pointer">
                                    <BsArrowUpRight />
                                </span>
                            </div>
                            <span style={{ wordSpacing: "1px" }} className="text-[15px] tracking-tight ">
                                About Page Personalize with images and more to paint more of a vivid portrait of yourself than your ‘Short bio.’
                            </span>

                            <div className="flex items-center justify-end gap-3 mt-8">
                                <span onClick={resetChanges} className="border border-solid border-green-500 text-green-500 px-[15px] py-[5px] rounded-full cursor-pointer">
                                    Cancel
                                </span>
                                <span
                                    onClick={() => {
                                        if (!hasChanges) return; // ملوش لازمة يشتغل
                                        setAvatar(changeAvatar);
                                        setShortBio(changeBio);
                                        setProfileName(changeName);
                                        setIsOpen(false);
                                    }}
                                    className={`border px-[15px] py-[5px] rounded-full ${
                                        hasChanges ? "bg-green-700 text-white cursor-pointer hover:bg-green-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}>
                                    Save
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isHome && (
                <div className="p-2.5 mt-3">
                    {isClose && (
                        <div className="w-full h-70 bg-[#90e0ef] rounded-[10px] flex flex-col p-6 gap-3 max-w-[300px] relative">
                            <div onClick={() => setIsClose(false)} className="absolute top-4 right-3 text-[25px]">
                                <IoIosClose />
                            </div>
                            <h2 className="text-black font-bold mb-2">Writing on Medium</h2>
                            <span className="text-black font-medium leading-4.5">Join our Medium Writing 101 Webinar</span>
                            <span className="text-black font-medium ">Read Medium tips & tricks</span>
                            <span className="text-black font-medium leading-4.5 ">Get practical Medium writing advice</span>
                            <div className="px-3.5 py-1.5 rounded-full bg-[#252422] text-white w-fit mt-3.5 cursor-pointer hover:bg-black ">Start Writing</div>
                        </div>
                    )}

                    <h1 className="text-black font-medium mt-8 text-[18px]">Recommended topics</h1>
                    <div className="flex mt-4 flex-wrap gap-2.5 ">
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Technology</div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Self Improvement</div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Writing </div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Relationships</div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Machine Learning</div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Politics</div>
                        <div className="px-3.5 py-1.5 bg-gray-100 rounded-full w-fit text-black cursor-pointer">Cryptocurrency</div>
                    </div>
                    <Link to="/ExploreTopic" className="mt-2 cursor-pointer hover:underline">
                        See more topics
                    </Link>
                    <div className="text-black font-medium mt-8 mb-3 text-[18px]">Who to follow</div>
                    <div className="flex flex-col gap-8">
                        {authors.map((author, i) => (
                            <Link key={i} to={`/author/${author.id}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* صورة الكاتب دائرية */}
                                    <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden border border-gray-200">
                                        {author.avatarUrl ? <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" /> : null}
                                    </div>

                                    {/* اسم الكاتب + بايو */}
                                    <div className="flex flex-col gap-1 max-w-[200px]">
                                        <p className="text-black font-bold truncate">{author.name}</p>
                                        <span className="text-gray-600 text-sm">
                                            {author.bio ? author.bio.split(" ").slice(0, 9).join(" ") + (author.bio.split(" ").length > 9 ? "..." : "") : "No bio"}
                                        </span>
                                    </div>
                                </div>

                                {/* زر المتابعة */}
                                <div className="border border-solid border-black px-3 py-1.5 rounded-full bg-gray-100 text-black cursor-pointer hover:bg-gray-200 transition">Follow</div>
                            </Link>
                        ))}
                    </div>

                    <h2 className="text-black font-medium mt-8 text-[18px]">Reading list</h2>

                    <p className="mt-2">
                        Click the <BsBookmarkPlus className="inline align-middle text-xl" /> on any story to easily add it to your reading list or a custom list that you can share.
                    </p>
                    <div className="mt-3 text-[13px] ">Help Status About Careers Press Blog Privacy Rules Terms Text to speech</div>
                </div>
            )}
        </div>
    );
}
// زززززززززززززززززززززز
