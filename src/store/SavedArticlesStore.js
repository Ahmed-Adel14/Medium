import { create } from "zustand";

// نخزن البيانات في localStorage بحيث تبقى بعد إعادة تحميل الصفحة
const savedArticlesFromStorage = JSON.parse(localStorage.getItem("savedArticles") || "{}");

export const useSavedArticlesStore = create((set) => ({
    savedArticles: savedArticlesFromStorage,

    // دالة لحفظ أو إزالة المقال من الـ saved
    toggleSaveArticle: (article) =>
        set((state) => {
            const id = article.id;
            const newSaved = { ...state.savedArticles };
            if (newSaved[id]) {
                delete newSaved[id]; // إزالة المقال لو موجود
            } else {
                newSaved[id] = article; // حفظ المقال
            }
            localStorage.setItem("savedArticles", JSON.stringify(newSaved));
            return { savedArticles: newSaved };
        }),

    // دالة لحذف المقال مباشرة
    removeArticle: (id) =>
        set((state) => {
            const newSaved = { ...state.savedArticles };
            delete newSaved[id];
            localStorage.setItem("savedArticles", JSON.stringify(newSaved));
            return { savedArticles: newSaved };
        }),
}));
