import React from 'react';
import type { CalendarEvent } from '../../../types/event';
import { getColorTheme } from '../../../utils/colorTheme';

interface EventItemProps {
    event: CalendarEvent;
    onDeleteEvent: (id: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onDeleteEvent }) => {
    const theme = getColorTheme(event.color);

    return (
        <div className={`w-full pl-2 py-0.5 border-l-2 relative group/event ${theme.bg} ${theme.darkBg} rounded`} style={{ borderColor: event.color }}>
            <span className={`text-micro font-medium ${theme.text} ${theme.darkText} truncate block pr-3`}>
                {event.title}
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
