import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface WeekHeaderProps {
    date: Date;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ date }) => {
    const d = dayjs(date);
    const dayOfMonth = d.date();
    const weekOfMonth = Math.min(Math.ceil(dayOfMonth / 7), 4);
    const weekStr = `第${weekOfMonth}周`;

    return (
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-subtle dark:border-white/5">
            <div className="px-2 py-4 flex items-center">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                    {d.format('M月')} {weekStr}
                </h2>
            </div>
        </div>
    );
};

export default React.memo(WeekHeader);
