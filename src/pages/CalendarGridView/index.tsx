import React, { useRef, useState } from 'react';
import { MonthHeader } from './components/MonthHeader';
import WeekRow from './components/WeekRow';
import DayCell from './components/DayCell';
import { useDataAction } from './stores/useDataAction';
import { useScrollAction } from './stores/useScrollAction';
import { useGridUIStore } from './stores/useGridUIStore';

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

    const { rowHeight, setRowHeight } = useGridUIStore();
    const [initialDistance, setInitialDistance] = useState<number | null>(null);
    const [initialRowHeight, setInitialRowHeight] = useState<number>(rowHeight);

    const getDistance = (touches: React.TouchList) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            setInitialDistance(getDistance(e.touches));
            setInitialRowHeight(rowHeight);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialDistance !== null) {
            const currentDistance = getDistance(e.touches);
            const scale = currentDistance / initialDistance;
            setRowHeight(initialRowHeight * scale);
        }
    };

    const handleTouchEnd = () => {
        setInitialDistance(null);
    };

    return (
        <main
            ref={containerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar touch-none"
        >
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
