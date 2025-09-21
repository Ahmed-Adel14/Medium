import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            profileName: "", // الاسم الرئيسي
            setProfileName: (name) => set({ profileName: name }),

            avatar: null,
            setAvatar: (newAvatar) => set({ avatar: newAvatar }),

            shortBio: "",
            setShortBio: (shortBio) => set({ shortBio }),
        }),
        { name: "img" }, // مفتاح localStorage
    ),
);
