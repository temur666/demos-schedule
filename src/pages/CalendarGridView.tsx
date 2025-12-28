import React, { useRef, useEffect, useCallback } from 'react';
import { useCalendarGridStore } from '../stores/useCalendarGridStore';
import { CalendarEngine } from '../calendar/engine';
import { dayjs, formatDate, minutesToTime } from '../calendar/utils';
import { motion } from 'framer-motion';

interface CalendarGridViewProps {
    activeDate: string;
    onDateDoubleClick?: (date: string) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarGridView: React.FC<CalendarGridViewProps> = ({ activeDate, onDateDoubleClick, onActiveDateChange }) => {
    const { weeks, loadMore, handleDeleteEvent, getEventsForDate } = useCalendarGridStore(activeDate);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef(0);
    const prevHeight = useRef(0);

    // 向上滚动加载时的位置补偿：防止页面跳动
    useEffect(() => {
        if (containerRef.current && prevHeight.current > 0) {
            const newHeight = containerRef.current.scrollHeight;
            if (newHeight > prevHeight.current && containerRef.current.scrollTop < 200) {
                containerRef.current.scrollTop += (newHeight - prevHeight.current);
            }
        }
        prevHeight.current = containerRef.current?.scrollHeight || 0;
    }, [weeks]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        // 1. 触发加载更多
        if (scrollTop + clientHeight > scrollHeight - 600) {
            loadMore('down');
        } else if (scrollTop < 300 && scrollTop < lastScrollTop.current) {
            loadMore('up');
        }
        lastScrollTop.current = scrollTop;

        // 2. 根据滚动位置更新 activeDate (检测视图中心位置的日期)
        const containerRect = containerRef.current.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        const elements = containerRef.current.querySelectorAll('[data-date]');
        for (const el of Array.from(elements)) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= centerY && rect.bottom >= centerY) {
                const date = el.getAttribute('data-date');
                if (date && date !== activeDate) onActiveDateChange?.(date);
                break;
            }
        }
    }, [activeDate, loadMore, onActiveDateChange]);

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar"
        >
            {weeks.map((weekDays, weekIdx) => {
                const weekNum = CalendarEngine.getWeekNumber(weekDays[0]);
                return (
                    <div key={weekIdx} className="mb-0">
                        <div className="grid grid-cols-3 gap-px bg-gray-100 dark:bg-white/10 border-b border-gray-100 dark:border-white/10">
                            <div className="col-span-2 relative bg-gray-50 dark:bg-white/5 min-h-[140px] p-4 flex flex-col justify-between group hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest font-display-bold">Week {weekNum}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Weekly Planning</span>
                            </div>
                            {weekDays.map(date => {
                                const dayEvents = getEventsForDate(date);
                                const dateStr = formatDate(date);
                                const isSelected = activeDate === dateStr;

                                return (
                                    <motion.div
                                        key={dateStr}
                                        data-date={dateStr}
                                        layoutId={isSelected ? "calendar-view-container" : undefined}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        onClick={() => onActiveDateChange?.(dateStr)}
                                        onDoubleClick={() => onDateDoubleClick?.(dateStr)}
                                        className={`relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isSelected ? 'ring-2 ring-inset ring-red-500 z-10' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-semibold text-gray-400 uppercase">
                                                {dayjs(date).format('ddd')}
                                            </span>
                                            <span className={`text-3xl font-black font-serif-art ${isSelected ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{dayjs(date).date()}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {dayEvents.map(event => (
                                                <div key={event.id} className="w-full pl-2 py-0.5 border-l-2 relative group/event" style={{ borderColor: event.color }}>
                                                    <span className="text-[9px] font-medium text-gray-900 dark:text-white truncate block pr-3">{event.title}</span>
                                                    <span className="text-[8px] text-gray-400 block">{minutesToTime(event.startTime)}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteEvent(event.id);
                                                        }}
                                                        className="absolute top-0 right-0 size-3 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover/event:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[8px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default CalendarGridView;
