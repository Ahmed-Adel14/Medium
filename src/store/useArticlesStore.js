import { create } from "zustand";
import { persist } from "zustand/middleware";

const useArticlesStore = create(
    persist(
        (set, get) => ({
            articles: [],

            addArticle: (article) => set((state) => ({ articles: [...state.articles, article] })),

            deleteArticle: (id) =>
                set((state) => ({
                    articles: state.articles.filter((a) => a.id !== id),
                })),

            // لو عايز تجيب المسودات بس
            getDrafts: () => get().articles.filter((a) => a.status === "draft"),

            // المنشورة بس
            getPublished: () => get().articles.filter((a) => a.status === "published"),
        }),
        {
            name: "articles-storage", // اسم الـ localStorage key
        },
    ),
);

export default useArticlesStore;
