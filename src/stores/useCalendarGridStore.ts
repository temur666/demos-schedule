import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs } from '../calendar/utils';
import { useSettingsStore } from './useSettingsStore';

export interface MonthGroup {
    monthKey: string;      // 2025-01
    monthDate: Date;       // 用于计算，不用于显示
    weeks: Date[][];
}

export const useCalendarGridStore = (activeDate: string) => {
    const { events, deleteEvent } = useEvents();
    const { weekStart } = useSettingsStore();

    const [months, setMonths] = useState<Date[]>(() => {
        const current = dayjs(activeDate).startOf('month').toDate();
        return [dayjs(current).subtract(1, 'month').toDate(), current, dayjs(current).add(1, 'month').toDate()];
    });

    useEffect(() => {
        const date = dayjs(activeDate);
        if (!months.some(m => dayjs(m).isSame(date, 'month'))) {
            const current = date.startOf('month').toDate();
            setMonths([dayjs(current).subtract(1, 'month').toDate(), current, dayjs(current).add(1, 'month').toDate()]);
        }
    }, [activeDate]);

    // 直接输出 MonthGroup 结构，而不是 weeks
    const monthGroups = useMemo<MonthGroup[]>(() => {
        return months.map(month => {
            const range = CalendarEngine.getVisibleRange(month, 'month');
            const weeks = CalendarEngine.getWeeksInRange(range);

            return {
                monthKey: dayjs(month).format('YYYY-MM'),
                monthDate: month,
                weeks,
            };
        });
    }, [months, weekStart]);

    const loadMore = useCallback((direction: 'up' | 'down') => {
        setMonths(prev => {
            if (direction === 'down') return [...prev, dayjs(prev[prev.length - 1]).add(1, 'month').toDate()];
            return [dayjs(prev[0]).subtract(1, 'month').toDate(), ...prev];
        });
    }, []);

    return {
        monthGroups,
        loadMore,
        handleDeleteEvent: deleteEvent,
        getEventsForDate: (date: Date) => CalendarEngine.filterEventsForDate(events, date),
    };
};
