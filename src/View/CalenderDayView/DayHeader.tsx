import React from 'react';
import { dayjs } from '../../calendar/utils';

interface DayHeaderProps {
    date: Date;
    isToday: boolean;
    layoutMode: 'linear' | 'timeline';
    onLayoutModeChange: (mode: 'linear' | 'timeline') => void;
}

const DayHeader: React.FC<DayHeaderProps> = ({ date, isToday, layoutMode, onLayoutModeChange }) => {
    return (
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
            <div className="px-4 py-4 flex items-center justify-between">
                <h2 className={`text-3xl font-black uppercase tracking-widest font-display-bold ${isToday ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                    {dayjs(date).format('dddd, MMMM D')}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onLayoutModeChange(layoutMode === 'linear' ? 'timeline' : 'linear')}
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] block">
                            {layoutMode === 'linear' ? 'grid_view' : 'view_day'}
                        </span>
                    </button>
                    {isToday && <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded-full font-bold uppercase tracking-wider">Today</span>}
                </div>
            </div>
        </div>
    );
};

export default DayHeader;
