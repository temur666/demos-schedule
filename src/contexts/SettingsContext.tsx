import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getStoredWeekStart, setWeekStart, type WeekStart, saveWeekStart } from '../calendar/locale';

interface SettingsContextType {
    weekStart: WeekStart;
    toggleWeekStart: (start: WeekStart) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weekStart, setWeekStartInternal] = useState<WeekStart>(getStoredWeekStart());

    // Initialize dark mode from localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('darkMode');
            if (stored !== null) {
                return stored === 'true';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    const toggleWeekStart = useCallback((start: WeekStart) => {
        saveWeekStart(start);
        setWeekStartInternal(start);
    }, []);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('darkMode', String(newValue));
            return newValue;
        });
    }, []);

    // Apply dayjs global side effect whenever weekStart changes
    useEffect(() => {
        setWeekStart(weekStart);
    }, [weekStart]);

    // Apply dark mode class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <SettingsContext.Provider value={{ weekStart, toggleWeekStart, isDarkMode, toggleDarkMode }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
