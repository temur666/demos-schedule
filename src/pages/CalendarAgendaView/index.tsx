import React from 'react';
import { useCalendarAgendaStore } from '../../stores/useCalendarAgendaStore';
import { useAgendaScroll } from './stores/useAgendaScroll';
import AgendaDay from './components/AgendaDay';
import { dayjs } from '../../calendar/utils';

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
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar bg-gray-100 dark:bg-black"
        >
            {days.map((date, index) => {
                const isNewWeek = index === 0 || !dayjs(date).isSame(days[index - 1], 'week');
                return (
                    <AgendaDay
                        key={date.toISOString()}
                        date={date}
                        events={getEventsForDate(date)}
                        onDeleteEvent={handleDeleteEvent}
                        showWeekHeader={isNewWeek}
                    />
                );
            })}
        </main>
    );
};

export default CalendarAgendaView;
