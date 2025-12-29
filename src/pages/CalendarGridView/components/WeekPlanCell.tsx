import React from 'react';
import { formatDate, minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';

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
            className="col-span-2 relative bg-gray-100 dark:bg-white/5 min-h-[160px] p-2 flex flex-col group hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                    <span className="text-xl font-medium text-gray-900 dark:text-white font-display tracking-tight">
                        {weekNum} 周
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                        周计划
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-1">
                {events.map(event => (
                    <div key={event.id} className="w-full pl-2 py-0.5 border-l-2 relative group/event" style={{ borderColor: event.color }}>
                        <span className="text-[9px] font-medium text-gray-900 dark:text-white truncate block pr-3">{event.title}</span>
                        <span className="text-[8px] text-gray-400 block">{minutesToTime(event.startTime)}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteEvent(event.id);
                            }}
                            className="absolute top-0 right-0 size-3 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover/event:opacity-100 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-[8px]">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(WeekPlanCell);
