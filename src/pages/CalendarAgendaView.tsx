import React, { useRef, useEffect, useCallback } from 'react';
import { useCalendarAgendaStore } from '../stores/useCalendarAgendaStore';
import { dayjs, minutesToTime, formatDate } from '../calendar/utils';

interface CalendarAgendaViewProps {
    activeDate: string;
    onActiveDateChange?: (date: string) => void;
}

const CalendarAgendaView: React.FC<CalendarAgendaViewProps> = ({ activeDate, onActiveDateChange }) => {
    const { days, loadMore, handleDeleteEvent, getEventsForDate } = useCalendarAgendaStore(activeDate);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef(0);
    const prevHeight = useRef(0);

    // 向上滚动加载时的位置补偿
    useEffect(() => {
        if (containerRef.current && prevHeight.current > 0) {
            const newHeight = containerRef.current.scrollHeight;
            if (newHeight > prevHeight.current && containerRef.current.scrollTop < 200) {
                containerRef.current.scrollTop += (newHeight - prevHeight.current);
            }
        }
        prevHeight.current = containerRef.current?.scrollHeight || 0;
    }, [days]);

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

    const getDayInfo = (date: Date) => {
        const d = dayjs(date);
        return {
            weekday: d.format('dddd'),
            day: d.format('MMM D'),
            isToday: d.isSame(dayjs(), 'day'),
            dateStr: formatDate(date)
        };
    };

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar"
        >
            {days.map(date => {
                const { weekday, day, isToday, dateStr } = getDayInfo(date);
                const dayEvents = getEventsForDate(date);

                return (
                    <div key={dateStr} data-date={dateStr} className="relative mb-6">
                        {/* 日期标题栏 */}
                        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                            <div className="px-4 py-4 flex items-center justify-between">
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-widest font-display-bold">
                                        {weekday}
                                    </h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{day}</span>
                                </div>
                                {isToday && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 px-2 py-1 rounded-full">Today</span>
                                )}
                            </div>
                        </div>

                        {/* 事件内容区：即使没有事件也保持固定留白 */}
                        <div className="px-4 py-4 min-h-[80px] flex flex-col justify-center">
                            {dayEvents.length > 0 ? (
                                <div className="space-y-3 relative">
                                    <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                                    {dayEvents.sort((a, b) => a.startTime - b.startTime).map(event => (
                                        <div key={event.id} className="relative flex gap-4 group z-10">
                                            <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                    {minutesToTime(event.startTime)}
                                                </span>
                                            </div>
                                            <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md group/event">
                                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: event.color }}></div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{event.title}</h3>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteEvent(event.id);
                                                        }}
                                                        className="size-6 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                                    </button>
                                                </div>
                                                {event.description && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{event.description}</p>
                                                )}
                                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                    <span>{minutesToTime(event.startTime)} - {minutesToTime(event.endTime)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // 无事件时的固定空白占位
                                <div className="h-12 flex items-center px-6">
                                    <div className="w-full h-px bg-gray-50 dark:bg-white/5"></div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default CalendarAgendaView;
