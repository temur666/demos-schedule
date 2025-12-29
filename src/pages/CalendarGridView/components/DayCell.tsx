import React from 'react';
import { dayjs, formatDate, minutesToTime } from '../../calendar/utils';

interface DayCellProps {
    date: any;
    events: any[];
    onDateClick?: (date: string) => void;
    onDeleteEvent: (id: string) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, events, onDateClick, onDeleteEvent }) => {
    const dateStr = formatDate(date);

    return (
        <div
            data-date={dateStr}
            onDoubleClick={() => onDateClick?.(dateStr)}
            className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-gray-400 uppercase">
                    {dayjs(date).format('ddd')}
                </span>
                <span className="text-3xl font-black font-serif-art text-gray-900 dark:text-white">
                    {dayjs(date).date()}
                </span>
            </div>
            <div className="flex flex-col gap-1">
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

export default React.memo(DayCell);
