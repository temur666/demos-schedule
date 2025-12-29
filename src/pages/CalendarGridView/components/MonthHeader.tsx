import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface MonthHeaderProps {
    monthDate: any;
}

const MonthHeaderComponent: React.FC<MonthHeaderProps> = ({ monthDate }) => {
    return (
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
            <div className="px-2 py-4 flex items-center">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                    {dayjs(monthDate).format('YYYY 年 M 月')}
                </h2>
            </div>
        </div>
    );
};

export const MonthHeader = React.memo(MonthHeaderComponent);