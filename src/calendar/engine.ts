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

    static filterEventsForDate(events: CalendarEvent[], date: Date): any[] {
        const dateStr = formatDate(date);
        const prevDateStr = formatDate(dayjs(date).subtract(1, 'day').toDate());

        const dayEvents: any[] = [];

        events.forEach(event => {
            // Case 1: Event starts on this date
            if (event.date === dateStr) {
                if (event.endTime > 1440) {
                    // Crosses midnight to next day
                    dayEvents.push({
                        ...event,
                        endTime: 1440,
                        isSegment: true,
                        isFirstSegment: true,
                        isLastSegment: false,
                        originalEndTime: event.endTime
                    });
                } else {
                    // Normal single day event
                    dayEvents.push(event);
                }
            }
            // Case 2: Event started on previous day and crosses into this day
            else if (event.date === prevDateStr && event.endTime > 1440) {
                dayEvents.push({
                    ...event,
                    startTime: 0,
                    endTime: event.endTime - 1440,
                    isSegment: true,
                    isFirstSegment: false,
                    isLastSegment: true,
                    originalStartTime: event.startTime,
                    date: dateStr // For rendering purposes in this day
                });
            }
        });

        return dayEvents;
    }

    static getWeekNumber(date: Date): number {
        return dayjs(date).week();
    }
}
