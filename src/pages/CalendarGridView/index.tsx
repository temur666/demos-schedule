import React, { useRef } from 'react';
import MonthHeader from './components/MonthHeader';
import WeekRow from './components/WeekRow';
import DayCell from './components/DayCell';
import { useDataAction } from './stores/useDataAction';
import { useScrollAction } from './stores/useScrollAction';

interface CalendarGridViewProps {
    activeDate: string;
    onDateClick?: (date: string) => void;
    onWeekLongPress?: (date: string) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarGridView: React.FC<CalendarGridViewProps> = ({ activeDate, onDateClick, onWeekLongPress, onActiveDateChange }) => {
    const { monthGroups, loadMore, deleteEvent, getEventsForDate, getWeekPlanEvents } = useDataAction(activeDate);
    const containerRef = useRef<HTMLDivElement>(null);
    const { handleScroll } = useScrollAction(containerRef, monthGroups, loadMore, activeDate, onActiveDateChange);

    return (
        <main ref={containerRef} onScroll={handleScroll} className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar">
            {monthGroups.map((monthGroup) => (
                <div key={monthGroup.monthKey}>
                    <MonthHeader monthDate={monthGroup.monthDate} />
                    {monthGroup.weeks.map((weekDays, weekIdx) => (
                        <WeekRow
                            key={`${monthGroup.monthKey}-${weekIdx}`}
                            weekDays={weekDays}
                            weekEvents={getWeekPlanEvents(weekDays)}
                            onWeekClick={onDateClick}
                            onWeekLongPress={onWeekLongPress}
                            onDeleteEvent={deleteEvent}
                        >
                            {weekDays.map(date => (
                                <DayCell
                                    key={date.toString()}
                                    date={date}
                                    events={getEventsForDate(date)}
                                    onDateClick={onDateClick}
                                    onDeleteEvent={deleteEvent}
                                />
                            ))}
                        </WeekRow>
                    ))}
                </div>
            ))}
        </main>
    );
};

export default CalendarGridView;
