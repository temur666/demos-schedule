import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface WeekHeaderProps {
    date: Date;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ date }) => {
    const d = dayjs(date);
    const monthStr = d.format('M月');
    const startOfMonth = d.startOf('month');

    // 计算当前日期是本月的第几周
    let weekOfMonth = Math.ceil((d.date() + startOfMonth.day()) / 7);
    // 限制在 1-4 周
    if (weekOfMonth > 4) weekOfMonth = 4;

    const weekStr = `第${weekOfMonth}周`;

    return (
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5 h-16">
            <div className="px-4 h-full flex items-center">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                    {monthStr} {weekStr}
                </h2>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
