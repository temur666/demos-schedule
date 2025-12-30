import React from 'react';
import type { CalendarEvent } from '../../../types/event';
import { getColorTheme } from '../../../utils/colorTheme';

interface EventItemProps {
    event: CalendarEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    const theme = getColorTheme(event.color);

    return (
        <div className={`w-full pl-2 py-0.5 border-l-2 relative ${theme.bg} ${theme.darkBg} rounded`} style={{ borderColor: event.color }}>
            <span className={`text-micro font-medium ${theme.text} ${theme.darkText} truncate block`}>
                {event.title}
            </span>
        </div>
    );
};

export default React.memo(EventItem);
