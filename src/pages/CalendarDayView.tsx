import React, { useRef, useEffect, useCallback, useState } from 'react';
import { minutesToTime, formatDate, dayjs } from '../calendar/utils';
import { useCalendarDayStore } from '../stores/useCalendarDayStore';

interface CalendarDayViewProps {
    activeDate: string;
    onBlankLongPress?: (date: string, time: number) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ activeDate, onBlankLongPress, onActiveDateChange }) => {
    const { days, loadMore, handleDeleteEvent, getEventsForDate } = useCalendarDayStore(activeDate);
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

    // 检查两个事项是否在时间上重叠
    const isOverlapping = (e1: any, e2: any) => {
        return e1.startTime < e2.endTime && e2.startTime < e1.endTime;
    };

    // 为重叠事项分配布局
    const assignLayoutToEvents = (events: any[]) => {
        if (events.length === 0) return [];
        const sortedEvents = [...events].sort((a, b) => {
            if (a.startTime !== b.startTime) return a.startTime - b.startTime;
            return a.id.localeCompare(b.id);
        });

        const layers: any[][] = [];
        const eventsWithLayout = sortedEvents.map(event => ({
            ...event,
            column: 0,
            totalColumns: 1
        }));

        for (const event of eventsWithLayout) {
            let assignedLayer = -1;
            for (let i = 0; i < layers.length; i++) {
                if (!layers[i].some(le => isOverlapping(event, le))) {
                    assignedLayer = i;
                    break;
                }
            }
            if (assignedLayer === -1) {
                assignedLayer = layers.length;
                layers.push([]);
            }
            layers[assignedLayer].push(event);
            (event as any).column = assignedLayer;
        }

        const maxLayers = layers.length;
        eventsWithLayout.forEach(event => {
            (event as any).totalColumns = maxLayers;
        });

        return eventsWithLayout;
    };

    const getTextColor = (bgColor: string) => {
        if (!bgColor) return 'text-gray-900 dark:text-white';
        if (bgColor.startsWith('#')) {
            const r = parseInt(bgColor.slice(1, 3), 16);
            const g = parseInt(bgColor.slice(3, 5), 16);
            const b = parseInt(bgColor.slice(5, 7), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128 ? 'text-white/90' : 'text-black/90';
        }
        return 'text-gray-900 dark:text-white';
    };

    const formatTimeRange = (event: any) => {
        const start = event.isSegment && !event.isFirstSegment ? event.originalStartTime : event.startTime;
        const end = event.isSegment && !event.isLastSegment ? event.originalEndTime : event.endTime;

        const formatTime = (mins: number) => {
            if (mins === 1440) return "24:00";
            if (mins > 1440) return `${minutesToTime(mins - 1440)}+1`;
            return minutesToTime(mins);
        };

        return `${formatTime(start)} - ${formatTime(end)}`;
    };

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
                            {/* Day Header */}
                            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
                                <div className="px-4 py-4 flex items-center justify-between">
                                    <h2 className={`text-3xl font-black uppercase tracking-widest font-display-bold ${isToday ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                        {dayjs(day).format('dddd, MMMM D')}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setLayoutMode(prev => prev === 'linear' ? 'timeline' : 'linear')}
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

                            {layoutMode === 'linear' ? (
                                <>
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
                                            {assignLayoutToEvents(dayEvents).map((event: any) => {
                                                const top = calculatePosition(event.startTime);
                                                const height = calculateHeight(event.startTime, event.endTime);
                                                const width = 100 / (event.totalColumns || 1);
                                                const left = (event.column || 0) * width;
                                                const textColor = getTextColor(event.color);

                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={`absolute rounded-xl p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm pointer-events-auto overflow-hidden group/event border border-white/10 ${textColor}`}
                                                        style={{
                                                            top: `${top}px`,
                                                            height: `${height}px`,
                                                            left: `${left}%`,
                                                            width: `calc(${width}% - 4px)`,
                                                            backgroundColor: event.color,
                                                            zIndex: 10 + (event.column || 0)
                                                        }}
                                                    >
                                                        <div className="flex flex-col h-full relative">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteEvent(event.id);
                                                                }}
                                                                className="absolute top-0 right-0 size-6 flex items-center justify-center rounded-full bg-black/10 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                                            </button>
                                                            <span className="text-xs font-bold leading-tight truncate pr-6">{event.title}</span>
                                                            <span className="text-[10px] opacity-70 mt-auto font-medium">
                                                                {formatTimeRange(event)}
                                                            </span>

                                                            {/* Segment Indicators */}
                                                            {event.isSegment && !event.isLastSegment && (
                                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-white/40 rounded-full" style={{ width: '24px' }} />
                                                            )}
                                                            {event.isSegment && !event.isFirstSegment && (
                                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-white/40 rounded-full" style={{ width: '24px' }} />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 space-y-4">
                                    {Array.from({ length: 8 }).map((_, rowIndex) => {
                                        const hoursPerRow = 3;
                                        const startMins = rowIndex * hoursPerRow * 60;
                                        const endMins = (rowIndex + 1) * hoursPerRow * 60;

                                        // 过滤并切分属于这个 Slot 的事件
                                        const slotEvents = dayEvents.flatMap(event => {
                                            const eStart = event.startTime;
                                            const eEnd = event.endTime;

                                            // 检查事件是否在该 Slot 时间范围内
                                            if (eStart < endMins && eEnd > startMins) {
                                                const segmentStart = Math.max(eStart, startMins);
                                                const segmentEnd = Math.min(eEnd, endMins);

                                                return [{
                                                    ...event,
                                                    // 在 Slot 内部的相对时间
                                                    displayStart: segmentStart - startMins,
                                                    displayEnd: segmentEnd - startMins,
                                                    // 标记是否被切断
                                                    isCutStart: eStart < startMins,
                                                    isCutEnd: eEnd > endMins
                                                }];
                                            }
                                            return [];
                                        });

                                        const layoutEvents = assignLayoutToEvents(slotEvents.map(e => ({
                                            ...e,
                                            startTime: e.displayStart,
                                            endTime: e.displayEnd
                                        })));

                                        const maxLayers = layoutEvents.length > 0 ? layoutEvents[0].totalColumns : 1;
                                        const FIXED_ITEM_HEIGHT = 46;
                                        const ITEM_GAP = 8;
                                        const containerHeight = Math.max(90, maxLayers * FIXED_ITEM_HEIGHT + (maxLayers + 1) * ITEM_GAP);

                                        return (
                                            <div key={rowIndex} className="flex flex-col gap-2">
                                                <div className="flex justify-between px-1">
                                                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                                                        {minutesToTime(startMins)}
                                                    </span>
                                                    <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                                                        {minutesToTime(endMins)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="relative bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300"
                                                    style={{ height: `${containerHeight}px` }}
                                                >
                                                    {/* Grid Lines */}
                                                    <div className="absolute inset-0 flex justify-between px-[33.33%] pointer-events-none">
                                                        <div className="h-full border-r border-gray-200/50 dark:border-white/5 border-dashed" />
                                                        <div className="h-full border-r border-gray-200/50 dark:border-white/5 border-dashed" />
                                                    </div>

                                                    {layoutEvents.map((event: any) => {
                                                        const slotDuration = hoursPerRow * 60;
                                                        const left = (event.startTime / slotDuration) * 100;
                                                        const width = ((event.endTime - event.startTime) / slotDuration) * 100;
                                                        const textColor = getTextColor(event.color);

                                                        const top = ITEM_GAP + (event.column * (FIXED_ITEM_HEIGHT + ITEM_GAP));

                                                        return (
                                                            <div
                                                                key={event.id}
                                                                className={`absolute rounded-xl p-2 shadow-sm border border-white/10 transition-all ${textColor}`}
                                                                style={{
                                                                    left: `${left}%`,
                                                                    width: `calc(${Math.max(width, 5)}% - 4px)`,
                                                                    top: `${top}px`,
                                                                    height: `${FIXED_ITEM_HEIGHT}px`,
                                                                    backgroundColor: event.color,
                                                                    zIndex: 10 + event.column
                                                                }}
                                                            >
                                                                <div className="flex flex-col h-full relative overflow-hidden">
                                                                    <span className="text-[11px] font-bold leading-none truncate">
                                                                        {event.title}
                                                                    </span>
                                                                    <span className="text-[9px] opacity-70 mt-auto font-medium">
                                                                        {formatTimeRange(event)}
                                                                    </span>

                                                                    {/* Cut Indicators */}
                                                                    {event.isCutEnd && (
                                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/30 rounded-full" />
                                                                    )}
                                                                    {event.isCutStart && (
                                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/30 rounded-full" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarDayView;
