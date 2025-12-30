import React from 'react';
import { useCalendarAgendaStore } from '../../stores/useCalendarAgendaStore';
import { useAgendaScroll } from './stores/useAgendaScroll';
import AgendaDay from './components/AgendaDay';
import WeekHeader from './components/WeekHeader';
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

    const groupedWeeks = React.useMemo(() => {
        const groups: { weekKey: string; startDate: Date; days: Date[] }[] = [];
        days.forEach(date => {
            const d = dayjs(date);
            const dayOfMonth = d.date();
            const weekOfMonth = Math.min(Math.ceil(dayOfMonth / 7), 4);
            const weekKey = `${d.format('YYYY-MM')}-W${weekOfMonth}`;

            let group = groups.find(g => g.weekKey === weekKey);
            if (!group) {
                group = { weekKey, startDate: date, days: [] };
                groups.push(group);
            }
            group.days.push(date);
        });
        return groups;
    }, [days]);

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar bg-gray-100 dark:bg-black"
        >
            {groupedWeeks.map((week) => (
                <div key={week.weekKey}>
                    <WeekHeader date={week.startDate} />
                    {week.days.map((date) => (
                        <AgendaDay
                            key={date.toISOString()}
                            date={date}
                            events={getEventsForDate(date)}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    ))}
                </div>
            ))}
        </main>
    );
};

export default CalendarAgendaView;
