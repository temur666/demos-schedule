import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

export type WeekStart = 0 | 1; // 0: Sunday, 1: Monday

export const setWeekStart = (start: WeekStart) => {
    dayjs.updateLocale('en', {
        weekStart: start,
    });
};

export const getStoredWeekStart = (): WeekStart => {
    const stored = localStorage.getItem('calendar_week_start');
    // Default to 1 (Monday) if not set
    return stored === '0' ? 0 : 1;
};

export const saveWeekStart = (start: WeekStart) => {
    localStorage.setItem('calendar_week_start', start.toString());
    setWeekStart(start);
};

// Initialize from storage
setWeekStart(getStoredWeekStart());
