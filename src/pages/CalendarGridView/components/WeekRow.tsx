import React from 'react';
import { CalendarEngine } from '../../../calendar/engine';

interface WeekRowProps {
    weekDays: any[];
    children: React.ReactNode;
}

const WeekRow: React.FC<WeekRowProps> = ({ weekDays, children }) => {
    const weekNum = CalendarEngine.getWeekNumber(weekDays[0]);

    return (
        <div className="mb-0">
            <div className="grid grid-cols-3 gap-px bg-gray-200 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                <div className="col-span-2 relative bg-gray-100 dark:bg-white/5 min-h-[160px] p-2 flex flex-col justify-between group hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                    <span className="text-xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {weekNum} 周
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        周计划
                    </span>
                </div>
                {children}
            </div>
        </div>
    );
};

export default React.memo(WeekRow);
