import React from 'react';
import { calculatePosition, calculateHeight, formatTimeRange } from './utils';
import { getColorTheme } from '../../utils/colorTheme';

interface LinearEventCardProps {
    event: any;
}

const LinearEventCard: React.FC<LinearEventCardProps> = ({ event }) => {
    const top = calculatePosition(event.startTime);
    const height = calculateHeight(event.startTime, event.endTime);
    const width = 100 / (event.totalColumns || 1);
    const left = (event.column || 0) * width;
    const theme = getColorTheme(event.color);

    return (
        <div
            className={`absolute rounded-xl p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm pointer-events-auto overflow-hidden group/event border border-black/5 dark:border-white/10 ${theme.bg} ${theme.darkBg} ${theme.text} ${theme.darkText}`}
            style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `${left}%`,
                width: `calc(${width}% - 4px)`,
                zIndex: 10 + (event.column || 0)
            }}
        >
            <div className="flex flex-col h-full relative">
                <span className="text-xs font-bold leading-tight truncate">{event.title}</span>
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
};

export default LinearEventCard;
