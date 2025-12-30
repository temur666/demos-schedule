import { useMemo, useState, useEffect, useCallback } from 'react';
import { useEvents } from '../../../contexts/useEvents';
import { CalendarEngine } from '../../../calendar/engine';
import { dayjs } from '../../../calendar/utils';
import { useSettings } from '../../../contexts/SettingsContext';

export interface MonthGroup {
    monthKey: string;
    monthDate: Date;
    weeks: Date[][];
}

export const useDataAction = (activeDate: string) => {
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

    const monthGroups = useMemo<MonthGroup[]>(() => {
        return months.map(month => ({
            monthKey: dayjs(month).format('YYYY-MM'),
            monthDate: month,
            weeks: CalendarEngine.getWeeksInRange(CalendarEngine.getVisibleRange(month, 'month')),
        }));
    }, [months, weekStart]);

    const loadMore = useCallback((direction: 'up' | 'down') => {
        setMonths(prev => direction === 'down'
            ? [...prev, dayjs(prev[prev.length - 1]).add(1, 'month').toDate()]
            : [dayjs(prev[0]).subtract(1, 'month').toDate(), ...prev]);
    }, []);

    return {
        monthGroups,
        loadMore,
        deleteEvent,
        getEventsForDate: (date: Date) => CalendarEngine.filterEventsForDate(events, date),
        getWeekPlanEvents: (weekDays: Date[]) => CalendarEngine.filterWeekPlanEvents(events, weekDays)
    };
};
