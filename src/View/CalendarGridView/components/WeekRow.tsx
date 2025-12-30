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
}

const WeekRow: React.FC<WeekRowProps> = ({ weekDays, children, weekEvents, onWeekClick, onWeekLongPress }) => {
    const weekNum = CalendarEngine.getWeekNumber(weekDays[0]);

    return (
        <div className="mb-0">
            <div className="grid grid-cols-3 gap-px bg-border-default dark:bg-white/20 border-b border-border-default dark:border-white/20">
                <WeekPlanCell
                    weekNum={weekNum}
                    weekDays={weekDays}
                    events={weekEvents}
                    onWeekClick={onWeekClick}
                    onWeekLongPress={onWeekLongPress}
                />
                {children}
            </div>
        </div>
    );
};

export default React.memo(WeekRow);
