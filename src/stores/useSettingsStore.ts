import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type WeekStart, setWeekStart as updateDayjsLocale } from '../calendar/locale';

interface SettingsState {
    weekStart: WeekStart;
    isDarkMode: boolean;
    setWeekStart: (start: WeekStart) => void;
    toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            weekStart: 1, // Default to Monday
            isDarkMode: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,

            setWeekStart: (start) => {
                updateDayjsLocale(start);
                set({ weekStart: start });
            },

            toggleDarkMode: () => set((state) => {
                const newValue = !state.isDarkMode;
                if (newValue) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                return { isDarkMode: newValue };
            }),
        }),
        {
            name: 'app-settings',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Apply side effects after hydration
                    updateDayjsLocale(state.weekStart);
                    if (state.isDarkMode) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
            },
        }
    )
);
