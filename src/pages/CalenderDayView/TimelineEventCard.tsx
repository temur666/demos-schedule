import React from 'react';
import { getTextColor, formatTimeRange } from './utils';
import { useTimelineUIStore } from './stores/useTimelineUIStore';
import { TIMELINE_CONFIG } from './config/timelineConfig';

interface TimelineEventCardProps {
    event: any;
    hoursPerRow: number;
}

const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
    event,
    hoursPerRow
}) => {
    const { rowHeight } = useTimelineUIStore();

    const slotDuration = hoursPerRow * 60;
    const left = (event.startTime / slotDuration) * 100;
    const width = ((event.endTime - event.startTime) / slotDuration) * 100;
    const textColor = getTextColor(event.color);
    const top = TIMELINE_CONFIG.ITEM_GAP + (event.column * (rowHeight + TIMELINE_CONFIG.ITEM_GAP));

    return (
        <div
            className={`absolute flex flex-col rounded-xl p-2 shadow-sm border border-white/10 transition-all overflow-hidden ${textColor}`}
            style={{
                left: `${left}%`,
                width: `calc(${Math.max(width, 5)}% - 4px)`,
                top: `${top}px`,
                height: `${rowHeight}px`,
                backgroundColor: event.color,
                zIndex: 10 + event.column
            }}
        >
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
    );
};

export default TimelineEventCard;
