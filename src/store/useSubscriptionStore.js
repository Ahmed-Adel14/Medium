import { create } from "zustand";

export const useSubscriptionStore = create((set) => ({
    subscribed: false, // الحالة الافتراضية
    setSubscribed: (value) => set({ subscribed: value }), // دالة لتغيير الحالة
}));
