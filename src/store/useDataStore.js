import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDataStore = create(
    persist(
        (set) => ({
            articles: [],
            chosenTags: [],
            selectedTag: null,
            setTag: (tag) => set({ selectedTag: tag }),
            setChosenTags: (tags) => set({ chosenTags: Array.isArray(tags) ? tags : [] }),

            fetchArticles: async () => {
                try {
                    let allArticles = [];
                    let page = 1;
                    let pageSize = 100;
                    let totalPages = 1;

                    do {
                        const res = await fetch(
                            `http://localhost:1337/api/articles?populate=coverImage&populate=author.avatar&populate=tags&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
                        );
                        const data = await res.json();

                        const normalized = data.data.map((article) => {
                            const coverUrl = article.coverImage?.data?.attributes?.url || article.coverImage?.url || null;
                            const avatarUrl = article.author?.avatar?.data?.attributes?.url || article.author?.avatar?.url || null;

                            return {
                                id: article.id,
                                title: article.title,
                                subtitle: article.subtitle,
                                content: article.content,
                                published: article.published,
                                likes: article.likes || 0,
                                slug: article.slug,
                                comments: article.comment || 0,
                                coverUrl: coverUrl ? `http://localhost:1337${coverUrl}` : null,
                                avatarUrl: avatarUrl ? `http://localhost:1337${avatarUrl}` : null,
                                authorName: article.author?.name || "Unknown",
                                authorBio: article.author?.bio || "",
                                authorId: article.author?.id || null,
                                tags: article.tags?.data ? article.tags.data.map((tag) => tag.attributes.name) : [],
                            };
                        });

                        allArticles = [...allArticles, ...normalized];
                        totalPages = data.meta.pagination.pageCount;
                        page++;
                    } while (page <= totalPages);

                    set({ articles: allArticles });
                } catch (err) {
                    console.error(err);
                }
            },
        }),
        {
            name: "data-storage",
            partialize: (state) => ({
                chosenTags: state.chosenTags,
                articles: state.articles,
                selectedTag: state.selectedTag,
            }),
        },
    ),
);
