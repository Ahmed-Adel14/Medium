import { useParams } from "react-router-dom";
import { useDataStore } from "../store/useDataStore";
import { useEffect, useState } from "react";

export default function AuthorPage() {
    const { id } = useParams(); // id الكاتب من الرابط
    const articles = useDataStore((state) => state.articles);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        // نجيب أول مقال للكاتب عن طريق authorName أو authorId لو موجود
        const found = articles.find((a) => a.authorId === parseInt(id));
        if (found) {
            setAuthor({
                name: found.authorName,
                bio: found.authorBio,
                avatarUrl: found.avatarUrl,
            });
        }
    }, [id, articles]);

    if (!author) return <p className="text-center mt-10">Author not found</p>;

    return (
        <div className="mt-10 ml-10">
            <div className="flex items-center gap-4">
                <img src={author.avatarUrl} alt={author.name} className="w-20 h-20 rounded-full object-cover" />
                <div>
                    <h1 className="text-2xl font-bold">{author.name}</h1>
                    <p className="text-gray-600 mt-2 line-clamp-4">{author.bio}</p> {/* لو طويل يقص */}
                </div>
            </div>
        </div>
    );
}
