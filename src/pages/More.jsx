import { LuSparkle } from "react-icons/lu";
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { BsBookmarkPlus } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { CiCircleMinus } from "react-icons/ci";
import { useParams, Link } from "react-router-dom";
import { useSubscriptionStore } from "../store/useSubscriptionStore";
import { useDataStore } from "../store/useDataStore";

export default function More() {
    const { slug } = useParams();
    const articles = useDataStore((state) => state.articles);
    const subscribed = useSubscriptionStore((state) => state.subscribed);
    // هات المقال اللي slug بتاعه زي اللي في اللينك
    const article = articles.find((a) => a.slug === slug);
    

    // نقسم النص إلى جمل
    const sentences = article.content.split(". ").filter(Boolean);
   

    // نجمع كل 3 جمل في فقرة
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
        paragraphs.push(sentences.slice(i, i + 3).join(". ") + ".");
    }

  

    return (
        <>
            <div className="mt-10 ml-50 mr-[50px]">
                <div className="flex flex-col gap-1.5 max-w-[600px]">
                    {/* Badge */}
                    <div className="px-[15px] py-[5px] rounded-[8px] flex items-center gap-2.5 border border-solid w-fit border-gray-100">
                        <span className="text-[#FFC017]">
                            <LuSparkle />
                        </span>
                        <p>Member-only story</p>
                    </div>

                    {/* Title */}
                    <h1 className="text-[40px] text-black font-bold">{article.title}</h1>
                    <p className="text-[22px] font-medium">{article.subtitle}</p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-8">
                        {/* صورة الكاتب */}
                        <img src={article.avatarUrl} className="w-[2rem] h-[2rem] rounded-full object-cover" />

                        {/* اسم الكاتب */}
                        <p className="text-black">{article.authorName}</p>

                        <div className="border border-solid border-black rounded-full px-3 py-1 text-black">Follow</div>
                        <span className="font-medium">
                            {new Date(article.published).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                            })}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="border border-gray-100 mt-4"></div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-1.5 p-1.5">
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-1">
                                <p className="cursor-pointer hover:text-black">
                                    <FaHandsClapping />
                                </p>
                                <span className="hover:text-black">{article.likes}k</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <p className="cursor-pointer hover:text-black">
                                    <FaComment />
                                </p>
                                <span className="hover:text-black">{article.comments}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3.5">
                            <p className="text-[20px] cursor-pointer hover:text-black">
                                <BsBookmarkPlus />
                            </p>
                            <p className="text-[20px] cursor-pointer hover:text-black">
                                <FiMoreHorizontal />
                            </p>
                            <p className="text-[25px] cursor-pointer hover:text-black">
                                <CiCircleMinus />
                            </p>
                        </div>
                    </div>
                </div>
                {/* Divider */}
                <div className="border border-gray-100 mt-4"></div>
            </div>

            {/* Cover image */}
            <div className="ml-40 ">
                <div className="w-full h-[60vh]  mt-7">
                    <img src={article.coverUrl} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Article text */}
                <div className=" mt-7 mr-[50px] flex flex-col gap-6">
                    {paragraphs.map((para, i) => (
                        <p key={i} className="mb-4 text-2xl text-black font-serif text-[19px]">
                            {para}
                        </p>
                    ))}

                    {/* زر الاشتراك + النصوص التحتية */}
                    {/* Article text */}
                    <div className="mt-7  mr-[50px] flex flex-col gap-6 ">
                        {(subscribed ? paragraphs : paragraphs.slice(0, 2)).map((para, i) => (
                            <p key={i} className="mb-4 text-2xl text-black font-serif text-[19px]">
                                {para}
                            </p>
                        ))}

                        {/* زر الاشتراك + النصوص التحتية */}
                        {!subscribed && (
                            <>
                                <div className="text-center mt-6">
                                    <Link to="/subscribe" state={{ slug: article.slug }} className="text-lg font-semibold text-white bg-black px-6 py-3 rounded-full hover:bg-gray-900 transition-all">
                                        Unlock full story ✨
                                    </Link>
                                </div>

                                {/* باقي كلام الممبرشيب */}
                                <div className="ml-28 mt-7 mr-[50px] flex flex-col gap-1.5 max-w-[600px]">
                                    <p className="text-center text-[24px] text-black font-medium">Become a member to read this story, and all of Medium.</p>
                                    <span className="text-center mb-2.5">
                                        Jason McBride put this story behind our paywall, so it’s only available to read with a paid Medium membership, which comes with a host of benefits:
                                    </span>
                                    <div className="flex items-center gap-3 ml-9">
                                        <span className="text-[#FFC017]">
                                            <LuSparkle />
                                        </span>
                                        <p className="text-black font-medium">Access all member-only stories on Medium</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-9">
                                        <span className="text-[#FFC017]">
                                            <LuSparkle />
                                        </span>
                                        <p className="text-black font-medium">Read everything on Medium, including member-only stories</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-9">
                                        <span className="text-[#FFC017]">
                                            <LuSparkle />
                                        </span>
                                        <p className="text-black font-medium">Support the writers you read most</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-9">
                                        <span className="text-[#FFC017]">
                                            <LuSparkle />
                                        </span>
                                        <p className="text-black font-medium">Help build an ad-free, independent reading and writing platform</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
// مممممممممممممممممممممم
