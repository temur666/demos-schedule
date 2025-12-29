import { useState, useCallback } from 'react';
import { dayjs, formatDate } from '../calendar/utils';

export type ViewType = 'grid' | 'agenda' | 'schedule';

export const useCalendarPageStore = () => {
    const [view, setView] = useState<ViewType>('schedule');
    const [activeDate, setActiveDate] = useState(formatDate(new Date()));
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialModalData, setInitialModalData] = useState<{ startTime?: string, date?: string, isWeekPlan?: boolean }>({});

    const navigate = useCallback((direction: 'prev' | 'next') => {
        const unit = view === 'grid' ? 'month' : 'day';
        const amount = direction === 'prev' ? -1 : 1;
        setActiveDate(formatDate(dayjs(activeDate).add(amount, unit)));
    }, [view, activeDate]);

    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    return {
        view,
        setView,
        activeDate,
        setActiveDate,
        isDarkMode,
        toggleDarkMode,
        isModalOpen,
        setIsModalOpen,
        initialModalData,
        setInitialModalData,
        navigate,
    };
};
