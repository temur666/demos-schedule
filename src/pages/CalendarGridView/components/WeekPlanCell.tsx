import React from 'react';
import { formatDate } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';
import { useGridUIStore } from '../stores/useGridUIStore';
import EventItem from './EventItem';

interface WeekPlanCellProps {
    weekNum: number;
    weekDays: Date[];
    events: CalendarEvent[];
    onWeekClick?: (date: string) => void;
    onWeekLongPress?: (date: string) => void;
    onDeleteEvent: (id: string) => void;
}

const WeekPlanCell: React.FC<WeekPlanCellProps> = ({ weekNum, weekDays, events, onWeekClick, onWeekLongPress, onDeleteEvent }) => {
    const firstDayStr = formatDate(weekDays[0]);
    const timerRef = React.useRef<any>(null);
    const { rowHeight } = useGridUIStore();

    const handleTouchStart = () => {
        timerRef.current = setTimeout(() => {
            onWeekLongPress?.(firstDayStr);
        }, 500);
    };

    const handleTouchEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    return (
        <div
            onDoubleClick={() => onWeekClick?.(firstDayStr)}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="col-span-2 relative bg-surface-secondary dark:bg-white/5 p-2 flex flex-col group hover:bg-surface-tertiary dark:hover:bg-white/20 transition-colors cursor-pointer overflow-hidden"
            style={{ minHeight: `${rowHeight}px`, height: `${rowHeight}px` }}
        >
            <div className="flex justify-between items-start mb-2 shrink-0">
                <div className="flex flex-col">
                    <span className="text-xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {weekNum} 周
                    </span>
                    <span className="text-label-sm text-gray-400 uppercase tracking-wider">
                        周计划
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-1 overflow-hidden">
                {(() => {
                    // Header is approx 52px + 8px padding = 60px
                    // Event item is approx 40px + 4px gap = 44px
                    const availableHeight = rowHeight - 60;
                    const itemHeight = 24;
                    const maxItems = Math.max(1, Math.floor(availableHeight / itemHeight));
                    const shouldLimit = events.length > maxItems;
                    const displayCount = shouldLimit ? maxItems - 1 : events.length;
                    const visibleEvents = events.slice(0, displayCount);
                    const remainingCount = events.length - displayCount;

                    return (
                        <>
                            {visibleEvents.map(event => (
                                <EventItem
                                    key={event.id}
                                    event={event}
                                    onDeleteEvent={onDeleteEvent}
                                />
                            ))}
                            {shouldLimit && (
                                <div className="pl-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    + 还有{remainingCount}个
                                </div>
                            )}
                        </>
                    );
                })()}
            </div>
        </div>
    );
};

export default React.memo(WeekPlanCell);
