import React from 'react';
import { CalendarEngine } from '../../../calendar/engine';
import WeekPlanCell from './WeekPlanCell';
import type { CalendarEvent } from '../../../types/event';

interface WeekRowProps {
    weekDays: Date[];
    children: React.ReactNode;
    weekEvents: CalendarEvent[];
    onWeekClick?: (date: string) => void;
    onWeekLongPress?: (date: string) => void;
    onDeleteEvent: (id: string) => void;
}

const WeekRow: React.FC<WeekRowProps> = ({ weekDays, children, weekEvents, onWeekClick, onWeekLongPress, onDeleteEvent }) => {
    const weekNum = CalendarEngine.getWeekNumber(weekDays[0]);

    return (
        <div className="mb-0">
            <div className="grid grid-cols-3 gap-px bg-gray-200 dark:bg-white/20 border-b border-gray-200 dark:border-white/20">
                <WeekPlanCell
                    weekNum={weekNum}
                    weekDays={weekDays}
                    events={weekEvents}
                    onWeekClick={onWeekClick}
                    onWeekLongPress={onWeekLongPress}
                    onDeleteEvent={onDeleteEvent}
                />
                {children}
            </div>
        </div>
    );
};

export default React.memo(WeekRow);
