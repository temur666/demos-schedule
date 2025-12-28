import React from 'react';
import { useEvents } from '../contexts/EventContext';

interface CalendarDayViewProps {
    activeDate: string;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ activeDate }) => {
    const { events } = useEvents();

    const dayEvents = events.filter(event => event.date === activeDate);

    const calculatePosition = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60) + minutes;
    };

    const calculateHeight = (start: string, end: string) => {
        return calculatePosition(end) - calculatePosition(start);
    };

    return (
        <div className="flex-1 relative overflow-y-auto hide-scrollbar bg-white dark:bg-black">
            <div className="relative w-full pb-32">
                {/* All Day Section (Simplified for now) */}
                <div className="border-b border-gray-100 dark:border-white/10">
                    <div className="flex min-h-[40px] relative">
                        <div className="w-16 flex-shrink-0 border-r border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-gray-400">all-day</span>
                        </div>
                        <div className="flex-1 p-1">
                            {/* You could add all-day events here if they existed in the type */}
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="flex flex-col">
                        {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i % 12 || 12;
                            const ampm = i < 12 ? 'AM' : 'PM';
                            return (
                                <div key={i} className="flex h-[60px] relative group">
                                    <div className="w-16 flex-shrink-0 flex justify-end pr-3 pt-2 text-[11px] font-medium text-gray-400 select-none">
                                        {hour} {ampm}
                                    </div>
                                    <div className="flex-1 border-t border-gray-100 dark:border-white/10 relative">
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Real Events Overlay */}
                    <div className="absolute top-0 left-16 right-0 bottom-0 pointer-events-none">
                        {dayEvents.map(event => {
                            const top = calculatePosition(event.startTime);
                            const height = calculateHeight(event.startTime, event.endTime);
                            return (
                                <div
                                    key={event.id}
                                    className="absolute left-1 right-2 rounded-md p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm pointer-events-auto overflow-hidden"
                                    style={{
                                        top: `${top}px`,
                                        height: `${height}px`,
                                        backgroundColor: `${event.color}20`, // Add transparency
                                        borderLeft: `3px solid ${event.color}`,
                                        color: event.color
                                    }}
                                >
                                    <div className="flex flex-col h-full">
                                        <span className="text-xs font-semibold leading-tight truncate">{event.title}</span>
                                        <span className="text-[10px] opacity-80 mt-auto">{event.startTime} - {event.endTime}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarDayView;
