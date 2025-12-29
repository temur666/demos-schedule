import React from 'react';
import { dayjs, formatDate } from '../../../calendar/utils';
import { useGridUIStore } from '../stores/useGridUIStore';
import EventItem from './EventItem';

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

interface DayCellProps {
    date: any;
    events: any[];
    onDateClick?: (date: string) => void;
    onDeleteEvent: (id: string) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, events, onDateClick, onDeleteEvent }) => {
    const dateStr = formatDate(date);
    const { rowHeight } = useGridUIStore();

    return (
        <div
            data-date={dateStr}
            onDoubleClick={() => onDateClick?.(dateStr)}
            className="relative bg-white dark:bg-black p-2 flex flex-col group hover:bg-surface-hover dark:hover:bg-white/5 transition-colors cursor-pointer overflow-hidden"
            style={{ minHeight: `${rowHeight}px`, height: `${rowHeight}px` }}
        >
            <div className="flex justify-between items-center mb-2 shrink-0">
                <span className="text-label-base font-medium text-gray-400 uppercase">
                    {WEEK_DAYS[dayjs(date).day()]}
                </span>
                <span className="text-xl font-black font-serif-art text-gray-900 dark:text-white">
                    {dayjs(date).date()}
                </span>
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
                {(() => {
                    // Header is approx 36px + 8px padding = 44px
                    // Event item is approx 40px + 4px gap = 44px
                    // We want to ensure we don't overflow
                    const availableHeight = rowHeight - 44;
                    const itemHeight = 44;
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

export default React.memo(DayCell);
