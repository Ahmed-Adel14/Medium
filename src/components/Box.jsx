import { useUserStore } from "../store/UserStore";
import { useSavedArticlesStore } from "../store/SavedArticlesStore";
import { BsPersonCircle } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Box() {
    const { avatar, profileName } = useUserStore();
    const savedArticles = useSavedArticlesStore((state) => state.savedArticles);

    const savedArticlesArray = Object.values(savedArticles).reverse(); // الأحدث أولاً
    const lastThree = savedArticlesArray.slice(0, 3);

    return (
        <Link to="/Reading-List" className="w-full h-[20vh] mt-6 flex">
            <div className="flex flex-col gap-3 p-4.5 w-[55%] bg-[#f5f5f5] rounded-b-lg rounded-t-[10px]">
                <div className="flex gap-1 items-center">
                    <span className="text-[25px] hover:text-black cursor-pointer w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                        {!avatar ? <BsPersonCircle /> : <img src={avatar} alt="avatar" className="w-full h-full object-cover" />}
                    </span>
                    <p className="text-black">{profileName}</p>
                </div>
                <h2 className="text-black font-bold text-[20px]">Reading List</h2>
                <div className="flex gap-1.5 items-center">
                    <p className="text-[12px]">{lastThree.length === 0 ? "No stories" : `${savedArticlesArray.length} story${savedArticlesArray.length > 1 ? "ies" : ""}`}</p>
                    <span className="text-[12px]">
                        <IoLockClosed />
                    </span>
                </div>
            </div>

            <div className="bg-white w-[45%] h-full flex gap-1">
                {[0, 1, 2].map((i) =>
                    lastThree[i] ? (
                        <Link key={i} to={`/article/${lastThree[i].slug}`} className={`h-full ${i === 0 ? "w-[150px]" : i === 1 ? "w-[80px]" : "w-[50px]"}`}>
                            <img src={lastThree[i].coverUrl} alt={lastThree[i].title} className="w-full h-full object-cover rounded" />
                        </Link>
                    ) : (
                        <div key={i} className={i === 0 ? "w-[150px] h-full bg-gray-200" : i === 1 ? "w-[80px] h-full bg-gray-200" : "w-[50px] h-full bg-gray-200"}></div>
                    ),
                )}
            </div>
        </Link>
    );
}
