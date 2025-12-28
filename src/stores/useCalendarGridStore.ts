import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs, formatDate } from '../calendar/utils';
import { useSettings } from '../contexts/SettingsContext';

export const useCalendarGridStore = (activeDate: string) => {
    const { events, deleteEvent } = useEvents();
    const { weekStart } = useSettings();

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

    const weeks = useMemo(() => {
        const allWeeks: Date[][] = [];
        const seenWeeks = new Set<string>();
        months.forEach(month => {
            const range = CalendarEngine.getVisibleRange(month, 'month');
            CalendarEngine.getWeeksInRange(range).forEach(week => {
                const key = formatDate(week[0]);
                if (!seenWeeks.has(key)) {
                    allWeeks.push(week);
                    seenWeeks.add(key);
                }
            });
        });
        return allWeeks.sort((a, b) => a[0].getTime() - b[0].getTime());
    }, [months, weekStart]);

    const loadMore = useCallback((direction: 'up' | 'down') => {
        setMonths(prev => {
            if (direction === 'down') return [...prev, dayjs(prev[prev.length - 1]).add(1, 'month').toDate()];
            return [dayjs(prev[0]).subtract(1, 'month').toDate(), ...prev];
        });
    }, []);

    return {
        weeks,
        loadMore,
        handleDeleteEvent: deleteEvent,
        getEventsForDate: (date: Date) => CalendarEngine.filterEventsForDate(events, date),
    };
};
