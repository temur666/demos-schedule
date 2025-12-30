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
    const weekStr = `第${weekOfMonth}周`;

    return (
        <div className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5">
            <div className="px-2 h-full flex items-center">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                    {d.format('M月')} {weekStr}
                </h2>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
