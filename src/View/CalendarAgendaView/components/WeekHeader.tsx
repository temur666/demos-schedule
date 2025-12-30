import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface WeekHeaderProps {
    date: Date;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ date }) => {
    const d = dayjs(date);
    const weekOfYear = d.week();
    const monthStr = d.format('M 月');
    const weekStr = `${weekOfYear} 周`;

    const now = dayjs();
    let mainTitle = monthStr;
    let subTitle = weekStr;
    let badge = '';

    if (d.isSame(now, 'week')) {
        badge = '本周';
    } else if (d.isSame(now.add(1, 'week'), 'week')) {
        badge = '下周';
    } else if (d.isSame(now.subtract(1, 'week'), 'week')) {
        badge = '上周';
    }

    return (
        <div className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5">
            <div className="pl-4 pr-4 h-full flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {mainTitle}
                    </h2>
                    <span className="text-lg font-serif-art text-gray-900 dark:text-white">
                        {subTitle}
                    </span>
                    {badge && (
                        <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="text-2xl font-medium text-gray-400 dark:text-gray-500 font-display">
                    {d.format('YYYY')}
                </span>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
