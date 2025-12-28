import React, { useRef, useEffect, useCallback } from 'react';
import { minutesToTime, formatDate, dayjs } from '../calendar/utils';
import { useCalendarDayStore } from '../stores/useCalendarDayStore';

interface CalendarDayViewProps {
    activeDate: string;
    onBlankLongPress?: (date: string, time: number) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ activeDate, onBlankLongPress, onActiveDateChange }) => {
    const { days, loadMore, handleDeleteEvent, getEventsForDate } = useCalendarDayStore(activeDate);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef(0);
    const prevHeight = useRef(0);

    // 上下滚动加载时的位置补偿
    useEffect(() => {
        if (containerRef.current && prevHeight.current > 0) {
            const newHeight = containerRef.current.scrollHeight;
            if (newHeight > prevHeight.current && containerRef.current.scrollTop < 200) {
                containerRef.current.scrollTop += (newHeight - prevHeight.current);
            }
        }
        prevHeight.current = containerRef.current?.scrollHeight || 0;
    }, [days]);

    // 初始滚动到 activeDate 的当前时间或顶部
    useEffect(() => {
        if (containerRef.current) {
            const activeEl = containerRef.current.querySelector(`[data-date="${activeDate}"]`);
            if (activeEl) {
                // 如果是今天，可以考虑滚动到当前小时，这里先简单滚动到该日顶部
                activeEl.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }
    }, []);

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

        // 2. 根据滚动位置更新 activeDate
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

    const calculatePosition = (minutes: number) => minutes;
    const calculateHeight = (start: number, end: number) => Math.max(end - start, 40);

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto hide-scrollbar bg-white dark:bg-black"
        >
            <div className="flex flex-col pb-32">
                {days.map((day) => {
                    const dateStr = formatDate(day);
                    const dayEvents = getEventsForDate(day);
                    const isToday = dateStr === formatDate(new Date());

                    return (
                        <div
                            key={dateStr}
                            data-date={dateStr}
                            className="w-full relative border-b-8 border-gray-50 dark:border-white/5"
                        >
                            {/* Day Header */}
                            <div className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-2 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                                <span className={`text-sm font-bold ${isToday ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                    {dayjs(day).format('dddd, MMMM D')}
                                </span>
                                {isToday && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">Today</span>}
                            </div>

                            {/* All Day Section */}
                            <div className="border-b border-gray-100 dark:border-white/10">
                                <div className="flex min-h-[40px] relative">
                                    <div className="w-16 flex-shrink-0 border-r border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-center">
                                        <span className="text-[10px] font-medium text-gray-400">all-day</span>
                                    </div>
                                    <div className="flex-1 p-1"></div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="relative">
                                <div className="flex flex-col">
                                    {Array.from({ length: 24 }).map((_, i) => {
                                        const hour = i % 12 || 12;
                                        const ampm = i < 12 ? 'AM' : 'PM';
                                        const slotTime = i * 60;

                                        return (
                                            <div
                                                key={i}
                                                className="flex h-[60px] relative group active:bg-gray-100 dark:active:bg-white/10 transition-all duration-200 cursor-crosshair"
                                                onContextMenu={(e) => {
                                                    e.preventDefault();
                                                    onBlankLongPress?.(dateStr, slotTime);
                                                }}
                                            >
                                                <div className="w-16 flex-shrink-0 flex justify-end pr-3 pt-2 text-[11px] font-medium text-gray-400 select-none group-hover:text-red-500 transition-colors">
                                                    {hour} {ampm}
                                                </div>
                                                <div className="flex-1 border-t border-gray-100 dark:border-white/10 relative">
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <div className="size-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 scale-75 group-hover:scale-100 transition-transform">
                                                            <span className="material-symbols-outlined text-[20px]">add</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Real Events Overlay */}
                                <div className="absolute top-0 left-16 right-0 bottom-0 pointer-events-none">
                                    {dayEvents.map(event => {
                                        const top = calculatePosition(event.startTime);
                                        const height = calculateHeight(event.startTime, event.endTime);
                                        return (
                                            <div
                                                key={event.id}
                                                className="absolute left-1 right-2 rounded-md p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm pointer-events-auto overflow-hidden group/event"
                                                style={{
                                                    top: `${top}px`,
                                                    height: `${height}px`,
                                                    backgroundColor: `${event.color}20`,
                                                    borderLeft: `3px solid ${event.color}`,
                                                    color: event.color
                                                }}
                                            >
                                                <div className="flex flex-col h-full relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteEvent(event.id);
                                                        }}
                                                        className="absolute top-0 right-0 size-6 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                                    </button>
                                                    <span className="text-xs font-semibold leading-tight truncate pr-6">{event.title}</span>
                                                    <span className="text-[10px] opacity-80 mt-auto">
                                                        {minutesToTime(event.startTime)} - {minutesToTime(event.endTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarDayView;
