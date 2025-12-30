import React, { useRef, useEffect, useCallback, useState } from 'react';
import { formatDate } from '../../calendar/utils';
import { useCalendarDayStore } from '../../stores/useCalendarDayStore';
import DayHeader from './DayHeader';
import LinearModeView from './LinearModeView';
import TimelineModeView from './TimelineModeView';

interface CalendarDayViewProps {
    activeDate: string;
    onBlankLongPress?: (date: string, time: number) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({
    activeDate,
    onBlankLongPress,
    onActiveDateChange
}) => {
    const { days, loadMore, getEventsForDate } = useCalendarDayStore(activeDate);
    const [layoutMode, setLayoutMode] = useState<'linear' | 'timeline'>('linear');
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
                activeEl.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }
    }, [activeDate]);

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

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto hide-scrollbar bg-white dark:bg-black"
        >
            <div className="flex flex-col pb-32">
                {days.map((day) => {
                    const dateStr = formatDate(day);
                    const rawEvents = getEventsForDate(day);
                    const dayEvents = [...rawEvents, {
                        id: 'test-cross-row',
                        title: '跨行测试事件 🚀',
                        startTime: 840, // 14:00
                        endTime: 1020,  // 17:00
                        color: '#ff4d4f',
                        date: dateStr,
                        createdAt: Date.now()
                    }];
                    const isToday = dateStr === formatDate(new Date());

                    return (
                        <div
                            key={dateStr}
                            data-date={dateStr}
                            className="w-full relative border-b-8 border-gray-50 dark:border-white/5"
                        >
                            <DayHeader
                                date={day}
                                isToday={isToday}
                                layoutMode={layoutMode}
                                onLayoutModeChange={setLayoutMode}
                            />

                            {layoutMode === 'linear' ? (
                                <LinearModeView
                                    dateStr={dateStr}
                                    events={dayEvents}
                                    onBlankLongPress={onBlankLongPress}
                                />
                            ) : (
                                <TimelineModeView events={dayEvents} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarDayView;
