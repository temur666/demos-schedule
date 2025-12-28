import { useSettings } from '../contexts/SettingsContext';

/**
 * Store (ViewModel) for App Settings
 * Now uses Context for reactive updates without page reload
 */
export const useSettingsStore = () => {
    const { weekStart, toggleWeekStart } = useSettings();

    return {
        weekStart,
        toggleWeekStart,
    };
};
