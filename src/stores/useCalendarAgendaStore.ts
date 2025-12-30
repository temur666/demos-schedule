import { useState, useEffect, useCallback } from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs } from '../calendar/utils';

export const useCalendarAgendaStore = (activeDate: string) => {
    const { events, deleteEvent } = useEvents();

    // 初始加载前后 14 天，并对齐到周初（周一）
    const [days, setDays] = useState<Date[]>(() => {
        const start = dayjs(activeDate).subtract(14, 'day').startOf('week');
        const result: Date[] = [];
        // 加载约 5 周的数据 (35 天)
        for (let i = 0; i < 35; i++) {
            result.push(start.add(i, 'day').toDate());
        }
        return result;
    });

    useEffect(() => {
        const date = dayjs(activeDate);
        if (!days.some(d => dayjs(d).isSame(date, 'day'))) {
            const start = date.subtract(14, 'day').startOf('week');
            const result: Date[] = [];
            for (let i = 0; i < 35; i++) {
                result.push(start.add(i, 'day').toDate());
            }
            setDays(result);
        }
    }, [activeDate, days]);

    const loadMore = useCallback((direction: 'up' | 'down') => {
        setDays(prev => {
            const result = [...prev];
            if (direction === 'down') {
                const last = dayjs(prev[prev.length - 1]);
                for (let i = 1; i <= 7; i++) {
                    result.push(last.add(i, 'day').toDate());
                }
            } else {
                const first = dayjs(prev[0]);
                for (let i = 1; i <= 7; i++) {
                    result.unshift(first.subtract(i, 'day').toDate());
                }
            }
            return result;
        });
    }, []);

    return {
        days,
        loadMore,
        handleDeleteEvent: deleteEvent,
        getEventsForDate: (date: Date) => CalendarEngine.filterEventsForDate(events, date),
    };
};
