import { useState, useEffect } from "react";
import ArticlePage from "../components/ArticlePage";
import { useDataStore } from "../store/useDataStore";

export default function Home() {
    const [activeTab, setActiveTab] = useState("Foryou");
    const { articles, chosenTags, fetchArticles } = useDataStore();

    useEffect(() => {
        if (articles.length === 0) fetchArticles();
    }, [articles.length, fetchArticles]);

    const filteredArticles = chosenTags.length > 0 ? articles.filter((article) => article.tags.some((tag) => chosenTags.includes(tag))) : articles;

    return (
        <div className="px-[6em] mt-3">
            <div className="flex gap-[40px] border-b border-gray-100">
                <p className={`cursor-pointer pb-1 ${activeTab === "Foryou" ? "text-black border-b-2 border-black" : "text-gray-500"}`} onClick={() => setActiveTab("Foryou")}>
                    Foryou
                </p>
                <p className={`cursor-pointer pb-1 ${activeTab === "Featured" ? "text-black border-b-2 border-black" : "text-gray-500"}`} onClick={() => setActiveTab("Featured")}>
                    Featured
                </p>
            </div>

            {activeTab === "Foryou" && <ArticlePage articles={filteredArticles} />}

            {activeTab === "Featured" && (
                <div className="flex flex-col items-center mt-28 gap-4 text-black">
                    <p>No featured stories</p>
                    <span>Featured stories from the publications you follow will appear here.</span>
                </div>
            )}
        </div>
    );
}
