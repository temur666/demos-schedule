import React from 'react';
import { dayjs } from '../calendar/utils';
import type { ViewType } from '../stores/useCalendarPageStore';

interface CalendarHeaderProps {
    view: ViewType;
    activeDate: string;
    onNavigatePrevious: () => void;
    onNavigateNext: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    view,
    activeDate,
    onNavigatePrevious,
    onNavigateNext
}) => {
    if (view === 'schedule') {
        return (
            <header className="sticky top-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onNavigatePrevious}
                        className="flex items-center gap-1 text-red-500 dark:text-red-400 cursor-pointer active:opacity-60 transition-opacity"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>chevron_left</span>
                        <span className="text-[17px] font-normal">{dayjs(activeDate).format('MMMM')}</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[17px] font-semibold text-gray-900 dark:text-white">{dayjs(activeDate).format('dddd')}</span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{dayjs(activeDate).format('MMM D, YYYY')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="flex size-8 items-center justify-center rounded-full text-red-500 dark:text-red-400 active:bg-red-50 dark:active:bg-red-900/20 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                        </button>
                        <button
                            onClick={onNavigateNext}
                            className="flex size-8 items-center justify-center rounded-full text-red-500 dark:text-red-400 active:bg-red-50 dark:active:bg-red-900/20 transition-colors"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>chevron_right</span>
                        </button>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <button className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-90">
                        <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '20px' }}>search</span>
                    </button>
                    <button
                        onClick={onNavigatePrevious}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '20px' }}>chevron_left</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:bg-gray-100 dark:active:bg-white/10">
                        {dayjs(activeDate).format('MMMM YYYY')}
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                    </button>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onNavigateNext}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '20px' }}>chevron_right</span>
                    </button>
                    <button className="flex size-8 items-center justify-center rounded-full overflow-hidden border border-gray-200 dark:border-white/20 active:scale-90 transition-transform">
                        <div
                            className="size-full bg-cover bg-center"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB31Yr33XMic1Ymy_L4WodOwMOW2iaAArSmNluP-jlvzSV4e5sLf14xg9MnxJzNJrbNQqkgSfTorVLKkNvr5Il3VGmtjQku9xZYDMg078yY0RRMcmuDMof3lGXPrQg26W5x8liYc-7DnpDKOsh6dE2a9RIIB3bXDMEwzTri1ix_NyTqO4QwNBfplBYDoVPCN59XkCEIVQI3Kcj3zq0mk68FCVLCCvD2vetfPppb9_8RVHb06sh1lPqT1T73CN1AV54JJl38k1l6PQs")' }}
                        ></div>
                    </button>
                </div>
            </div>
        </header>
    );
};
