import React from 'react';
import { minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';

interface EventItemProps {
    event: CalendarEvent;
    onDeleteEvent: (id: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onDeleteEvent }) => {
    return (
        <div className="w-full pl-2 py-0.5 border-l-2 relative group/event" style={{ borderColor: event.color }}>
            <span className="text-micro font-medium text-gray-900 dark:text-white truncate block pr-3">
                {event.title}
            </span>
            <span className="text-tiny text-gray-400 block">
                {minutesToTime(event.startTime)}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(event.id);
                }}
                className="absolute top-0 right-0 size-3 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover/event:opacity-100 transition-opacity"
            >
                <span className="material-symbols-outlined text-tiny">close</span>
            </button>
        </div>
    );
};

export default React.memo(EventItem);
