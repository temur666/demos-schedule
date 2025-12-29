import React from 'react';
import { dayjs } from '../../../calendar/utils';

interface MonthHeaderProps {
    monthDate: any;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ monthDate }) => {
    return (
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-red-500/10">
            <div className="px-4 py-4 flex items-center">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-widest font-display-bold">
                    {dayjs(monthDate).format('MMMM YYYY')}
                </h2>
            </div>
        </div>
    );
};

export default React.memo(MonthHeader);
