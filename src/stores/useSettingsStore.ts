import { useSettings } from '../contexts/SettingsContext';

/**
 * Store (ViewModel) for App Settings
 * Now uses Context for reactive updates without page reload
 */
export const useSettingsStore = () => {
    const { weekStart, toggleWeekStart, isDarkMode, toggleDarkMode } = useSettings();

    return {
        weekStart,
        toggleWeekStart,
        isDarkMode,
        toggleDarkMode,
    };
};
