import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type WeekStart, setWeekStart as updateDayjsLocale } from '../calendar/locale';

interface SettingsState {
    weekStart: WeekStart;
    isDarkMode: boolean;
    autoFollowSystem: boolean;
    setWeekStart: (start: WeekStart) => void;
    toggleDarkMode: () => void;
    setAutoFollowSystem: (auto: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            weekStart: 1, // Default to Monday
            isDarkMode: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
            autoFollowSystem: true, // 默认跟随系统

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
                // 手动切换时，关闭自动跟随系统
                return { isDarkMode: newValue, autoFollowSystem: false };
            }),

            setAutoFollowSystem: (auto) => set((_state) => {
                if (auto) {
                    // 重新启用跟随系统时，立即同步系统主题
                    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (systemDark) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    return { autoFollowSystem: true, isDarkMode: systemDark };
                }
                return { autoFollowSystem: false };
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
