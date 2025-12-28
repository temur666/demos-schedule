import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getStoredWeekStart, setWeekStart, type WeekStart, saveWeekStart } from '../calendar/locale';

interface SettingsContextType {
    weekStart: WeekStart;
    toggleWeekStart: (start: WeekStart) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weekStart, setWeekStartInternal] = useState<WeekStart>(getStoredWeekStart());

    const toggleWeekStart = useCallback((start: WeekStart) => {
        saveWeekStart(start);
        setWeekStartInternal(start);
    }, []);

    // Apply dayjs global side effect whenever weekStart changes
    useEffect(() => {
        setWeekStart(weekStart);
    }, [weekStart]);

    return (
        <SettingsContext.Provider value={{ weekStart, toggleWeekStart }}>
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
