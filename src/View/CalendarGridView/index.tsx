import React, { useRef } from 'react';
import { MonthHeader } from './components/MonthHeader';
import WeekRow from './components/WeekRow';
import DayCell from './components/DayCell';
import { useDataAction } from './stores/useDataAction';
import { useScrollAction } from './stores/useScrollAction';
import { usePinchAction } from './stores/usePinchAction';

interface CalendarGridViewProps {
    activeDate: string;
    onDateClick?: (date: string) => void;
    onWeekClick?: (date: string) => void;
    onWeekLongPress?: (date: string) => void;
    onActiveDateChange?: (date: string) => void;
}

const CalendarGridView: React.FC<CalendarGridViewProps> = ({ activeDate, onDateClick, onWeekClick, onWeekLongPress, onActiveDateChange }) => {
    const { monthGroups, loadMore, deleteEvent, getEventsForDate, getWeekPlanEvents } = useDataAction(activeDate);
    const containerRef = useRef<HTMLDivElement>(null);
    const { handleScroll } = useScrollAction(containerRef, monthGroups, loadMore, activeDate, onActiveDateChange);

    const { handleTouchStart, handleTouchMove, handleTouchEnd } = usePinchAction();

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar touch-pan-y"
        >
            {monthGroups.map((monthGroup) => (
                <div key={monthGroup.monthKey}>
                    <MonthHeader monthDate={monthGroup.monthDate} />
                    {monthGroup.weeks.map((weekDays, weekIdx) => (
                        <WeekRow
                            key={`${monthGroup.monthKey}-${weekIdx}`}
                            weekDays={weekDays}
                            weekEvents={getWeekPlanEvents(weekDays)}
                            onWeekClick={onWeekClick}
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
