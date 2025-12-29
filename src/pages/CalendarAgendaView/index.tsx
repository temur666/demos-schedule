import React from 'react';
import { useCalendarAgendaStore } from '../../stores/useCalendarAgendaStore';
import { useAgendaScroll } from './stores/useAgendaScroll';
import AgendaDay from './components/AgendaDay';

interface CalendarAgendaViewProps {
    activeDate: string;
    onActiveDateChange?: (date: string) => void;
}

const CalendarAgendaView: React.FC<CalendarAgendaViewProps> = ({ activeDate, onActiveDateChange }) => {
    const { days, loadMore, handleDeleteEvent, getEventsForDate } = useCalendarAgendaStore(activeDate);

    const { containerRef, handleScroll } = useAgendaScroll({
        days,
        loadMore,
        activeDate,
        onActiveDateChange
    });

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar"
        >
            {days.map(date => (
                <AgendaDay
                    key={date.toISOString()}
                    date={date}
                    events={getEventsForDate(date)}
                    onDeleteEvent={handleDeleteEvent}
                />
            ))}
        </main>
    );
};

export default CalendarAgendaView;
