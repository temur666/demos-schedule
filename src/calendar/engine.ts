import { dayjs, getStartOfWeek, getEndOfWeek, formatDate } from './utils';
import type { CalendarEvent } from '../types/event';
import type { DateRange, ViewMode } from './types';

export class CalendarEngine {
    static getVisibleRange(viewDate: Date, mode: ViewMode = 'week'): DateRange {
        if (mode === 'month') {
            const startOfMonth = dayjs(viewDate).startOf('month');
            const endOfMonth = dayjs(viewDate).endOf('month');
            return {
                start: getStartOfWeek(startOfMonth.toDate()),
                end: getEndOfWeek(endOfMonth.toDate()),
            };
        }
        return {
            start: getStartOfWeek(viewDate),
            end: getEndOfWeek(viewDate),
        };
    }

    static getWeeksInRange(range: DateRange): Date[][] {
        const weeks: Date[][] = [];
        let current = dayjs(range.start);
        const end = dayjs(range.end);

        while (current.isBefore(end)) {
            const week: Date[] = [];
            for (let i = 0; i < 7; i++) {
                week.push(current.toDate());
                current = current.add(1, 'day');
            }
            weeks.push(week);
        }
        return weeks;
    }

    static getDaysInRange(range: DateRange): Date[] {
        const days: Date[] = [];
        let current = dayjs(range.start);
        const end = dayjs(range.end);

        while (current.isBefore(end) || current.isSame(end, 'day')) {
            days.push(current.toDate());
            current = current.add(1, 'day');
        }
        return days;
    }

    static filterEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
        const dateStr = formatDate(date);
        return events.filter(event => event.date === dateStr);
    }

    static getWeekNumber(date: Date): number {
        return dayjs(date).week();
    }
}
