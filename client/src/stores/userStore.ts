import { create } from 'zustand';

type User = {
    id: string;
    name: string;
    email: string;
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

const useStore = create<UserStore>((set) => ({
    user: JSON.parse(localStorage.getItem("user") || "null"), // Load user data from localStorage if available
    setUser: (user) => {
        set({ user });
        localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    },
    clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user"); // Clear user from localStorage
    },
}));

export default useStore;
