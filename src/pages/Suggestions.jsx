import { useState } from "react";
import { MdOutlineArticle } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
export default function Suggestions() {
      const [showModal, setShowModal] = useState(false);
    const Following = [
        { id: 1, name: "Life", stories: "373K stories", writers: "108K writers" },
        { id: 2, name: "Data Science", stories: "257K stories", writers: "100K writers" },
        { id: 3, name: "Technology", stories: "145K stories", writers: "99K writers" },
        { id: 4, name: "Self Improvement", stories: "350K stories", writers: "240K writers" },
        { id: 5, name: "Writing", stories: "598K stories", writers: "372K writers" },
        { id: 6, name: "Relationships", stories: "442K stories", writers: "150K writers" },
        { id: 7, name: "Machine Learning", stories: "48K stories", writers: "50K writers" },
        { id: 8, name: "Productivity", stories: "42K stories", writers: "15K writers" },
        { id: 9, name: "Politics", stories: "68K stories", writers: "37K writers" },
        { id: 10, name: "Cryptocurrency", stories: "26K stories", writers: "132K writers" },
        { id: 11, name: "Psychology", stories: "44K stories", writers: "100K writers" },
        { id: 12, name: "Money", stories: "442K stories", writers: "150K writers" },
        { id: 13, name: "Business", stories: "100K stories", writers: "150K writers" },
        { id: 14, name: "Python", stories: "412K stories", writers: "165K writers" },
        { id: 15, name: "Health", stories: "51K stories", writers: "12.6K writers" },
        { id: 16, name: "Science", stories: "99K stories", writers: "39K writers" },
        { id: 17, name: "Mental Health", stories: "40K stories", writers: "13.5K writers" },
        { id: 18, name: "Software Development", stories: "241K stories", writers: "47K writers" },
        { id: 19, name: "Startup", stories: "48K stories", writers: "250K writers" },
        { id: 20, name: "Design", stories: "290K stories", writers: "140K writers" },
        { id: 21, name: "Artificial Intelligence", stories: "35K stories", writers: "27K writers" },
        { id: 22, name: "Culture", stories: "100K stories", writers: "21K writers" },
        { id: 23, name: "Software Engineering", stories: "75K stories", writers: "33K writers" },
        { id: 24, name: "Blockchain", stories: "120K stories", writers: "55K writers" },
        
    ];;
    const SomeFollowing = Following.slice(0, 6)
    const AllFollowing=Following

    // object فيه حالات كل زرار
    const [active, setActive] = useState({});

    const toggleFollow = (id) => {
        setActive({
            ...active,
            [id]: !active[id], // يقلب الحالة بس للعنصر ده
        });
    };

    return (
        <div className="mt-16 ml-28">
            <h3 className="text-black text-[18px] font-medium">Topics To Follow</h3>

            {SomeFollowing.map((item) => (
                <div key={item.id} className="flex justify-between items-center mt-7">
                    <div className="flex items-center gap-5">
                        <span className="w-[3rem] h-[3rem] rounded-full bg-gray-200 flex justify-center items-center text-[20px]">
                            <MdOutlineArticle />
                        </span>
                        <div className="flex flex-col gap-1">
                            <p className="text-black text-[18px] font-medium">{item.name}</p>
                            <p>
                                {item.stories} · {item.writers}
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={() => toggleFollow(item.id)}
                        className={`border border-solid px-[10px] py-[5px] cursor-pointer rounded-full ${active[item.id] ? "bg-black text-white" : "border-black text-black"}`}>
                        {active[item.id] ? "Following" : "Follow"}
                    </div>
                </div>
            ))}

            {/* زرار لفتح المودال */}
            <div onClick={() => setShowModal(true)} className="mt-6 cursor-pointer hover:underline">
                See more suggestions
            </div>

            {/* المودال */}
            {showModal && (
                <div className="fixed inset-0 bg-white/95 z-50 w-full h-full overflow-y-auto  ">
                    {/* المحتوى */}
                    <div className=" relative  mx-130 mt-30 ">
                        <div className="flex ">
                            <h2 className="text-[20px] font-bold  text-black ml-20">Topics to follow</h2>
                            <button onClick={() => setShowModal(false)} className=" text-2xl font-bold cursor-pointer absolute right-22 ">
                                <IoCloseOutline />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 mb-20">
                            {AllFollowing.map((item) => (
                                <div key={item.id} className="flex justify-between items-center mt-7">
                                    <div className="flex items-center gap-5">
                                        <span className="w-[3rem] h-[3rem] rounded-full bg-gray-200 flex justify-center items-center text-[20px]">
                                            <MdOutlineArticle />
                                        </span>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-black text-[18px] font-medium">{item.name}</p>
                                            <p>
                                                {item.stories} · {item.writers}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => toggleFollow(item.id)}
                                        className={`border border-solid px-[10px] py-[5px] cursor-pointer rounded-full ${active[item.id] ? "bg-black text-white" : "border-black text-black"}`}>
                                        {active[item.id] ? "Following" : "Follow"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
