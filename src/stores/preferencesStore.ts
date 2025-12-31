import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesStore {
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: "light",
      sidebarCollapsed: false,

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "spotify-preferences",
    }
  )
);
