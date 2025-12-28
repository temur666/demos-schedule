import { useState, useEffect, useCallback } from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs } from '../calendar/utils';

export const useCalendarDayStore = (activeDate: string) => {
    const { events, deleteEvent } = useEvents();

    const [days, setDays] = useState<Date[]>(() => {
        const current = dayjs(activeDate).startOf('day').toDate();
        return [
            dayjs(current).subtract(1, 'day').toDate(),
            current,
            dayjs(current).add(1, 'day').toDate()
        ];
    });

    useEffect(() => {
        const date = dayjs(activeDate).startOf('day');
        if (!days.some(d => dayjs(d).isSame(date, 'day'))) {
            const current = date.toDate();
            setDays([
                dayjs(current).subtract(1, 'day').toDate(),
                current,
                dayjs(current).add(1, 'day').toDate()
            ]);
        }
    }, [activeDate]);

    const loadMore = useCallback((direction: 'up' | 'down') => {
        setDays(prev => {
            if (direction === 'down') {
                const last = prev[prev.length - 1];
                return [...prev, dayjs(last).add(1, 'day').toDate()];
            } else {
                const first = prev[0];
                return [dayjs(first).subtract(1, 'day').toDate(), ...prev];
            }
        });
    }, []);

    return {
        days,
        loadMore,
        handleDeleteEvent: deleteEvent,
        getEventsForDate: (date: Date) => CalendarEngine.filterEventsForDate(events, date),
    };
};
