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
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5">
            <div className="px-2 py-4 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {mainTitle}
                    </h2>
                    <span className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {subTitle}
                    </span>
                    {badge && (
                        <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-sm uppercase tracking-wider">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="text-xl font-medium text-gray-500 dark:text-gray-500 font-display">
                    {d.format('YYYY')}
                </span>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
