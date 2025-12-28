import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    weekStart: 1,
});

export const formatDate = (date: dayjs.Dayjs | Date | string | number, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format);
};

export const getStartOfWeek = (date: Date) => {
    return dayjs(date).startOf('week').toDate();
};

export const getEndOfWeek = (date: Date) => {
    return dayjs(date).endOf('week').toDate();
};

export const isSameDay = (date1: Date | string, date2: Date | string) => {
    return dayjs(date1).isSame(dayjs(date2), 'day');
};

export const minutesToTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

export const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
};

export { dayjs };
