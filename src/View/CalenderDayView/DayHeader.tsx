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
                <div className="flex items-center gap-3">
                    <span className="text-label-base font-medium text-gray-400 uppercase">
                        {['日', '一', '二', '三', '四', '五', '六'][dayjs(date).day()]}
                    </span>
                    <div className={`
                        flex items-center justify-center w-12 h-12 rounded-full transition-colors
                        ${isToday ? 'bg-red-500 text-white' : 'text-gray-900 dark:text-white'}
                    `}>
                        <span className="text-3xl font-black font-serif-art">
                            {dayjs(date).date()}
                        </span>
                    </div>
                    <span className="text-xl font-medium text-gray-500 dark:text-gray-400 ml-1">
                        {dayjs(date).format('M月')}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onLayoutModeChange(layoutMode === 'linear' ? 'timeline' : 'linear')}
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] block">
                            {layoutMode === 'linear' ? 'grid_view' : 'view_day'}
                        </span>
                    </button>
                    {/* Today badge removed as it's now integrated into the date box */}
                </div>
            </div>
        </div>
    );
};

export default DayHeader;
