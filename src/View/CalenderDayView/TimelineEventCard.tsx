import React from 'react';
import { formatTimeRange } from './utils';
import { useTimelineUIStore } from './stores/useTimelineUIStore';
import { TIMELINE_CONFIG } from './config/timelineConfig';
import { getColorTheme } from '../../utils/colorTheme';

interface TimelineEventCardProps {
    event: any;
    hoursPerRow: number;
}

const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
    event,
    hoursPerRow
}) => {
    const { rowHeight } = useTimelineUIStore();
    const theme = getColorTheme(event.color);

    const slotDuration = hoursPerRow * 60;
    const left = (event.startTime / slotDuration) * 100;
    const width = ((event.endTime - event.startTime) / slotDuration) * 100;
    const top = TIMELINE_CONFIG.ITEM_GAP + (event.column * (rowHeight + TIMELINE_CONFIG.ITEM_GAP));

    return (
        <div
            className={`absolute flex flex-col rounded-xl p-2 shadow-sm border border-black/5 dark:border-white/10 transition-all overflow-hidden ${theme.bg} ${theme.darkBg} ${theme.text} ${theme.darkText}`}
            style={{
                left: `${left}%`,
                width: `calc(${Math.max(width, 5)}% - 4px)`,
                top: `${top}px`,
                height: `${rowHeight}px`,
                zIndex: 10 + event.column
            }}
        >
            <span className="text-[11px] font-bold leading-none truncate">
                {event.title}
            </span>
            <span className="text-[9px] opacity-70 mt-0.5 font-medium">
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
