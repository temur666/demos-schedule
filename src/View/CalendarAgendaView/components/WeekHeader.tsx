import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface WeekHeaderProps {
    date: Date;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ date }) => {
    const d = dayjs(date);
    const dayOfMonth = d.date();
    // 计算当前日期是该月的第几周 (周一作为一周的开始)
    const startOfMonth = d.startOf('month');
    const firstDayWeekday = (startOfMonth.day() + 6) % 7;
    const weekOfMonth = Math.ceil((dayOfMonth + firstDayWeekday) / 7);
    const weekStr = `第 ${weekOfMonth} 周`;

    return (
        <div className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5">
            <div className="pl-2 pr-4 h-full flex items-center justify-between">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                    {d.format('M 月')} {weekStr}
                </h2>
                <span className="text-2xl font-medium text-gray-400 dark:text-gray-500 font-display">
                    {d.format('YYYY')}
                </span>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
