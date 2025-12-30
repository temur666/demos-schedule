import React from 'react';
import { calculatePosition, calculateHeight, getTextColor, formatTimeRange } from './utils';

interface LinearEventCardProps {
    event: any;
    onDelete: (id: string) => void;
}

const LinearEventCard: React.FC<LinearEventCardProps> = ({ event, onDelete }) => {
    const top = calculatePosition(event.startTime);
    const height = calculateHeight(event.startTime, event.endTime);
    const width = 100 / (event.totalColumns || 1);
    const left = (event.column || 0) * width;
    const textColor = getTextColor(event.color);

    return (
        <div
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
                        onDelete(event.id);
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
};

export default LinearEventCard;
