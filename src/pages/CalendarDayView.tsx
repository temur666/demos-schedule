import React from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs, minutesToTime } from '../calendar/utils';

interface CalendarDayViewProps {
    activeDate: string;
    onBlankLongPress?: (date: string, time: number) => void;
}

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ activeDate, onBlankLongPress }) => {
    const { events, deleteEvent } = useEvents();

    const viewDate = dayjs(activeDate).toDate();
    const dayEvents = CalendarEngine.filterEventsForDate(events, viewDate);

    const calculatePosition = (minutes: number) => minutes;

    const calculateHeight = (start: number, end: number) => Math.max(end - start, 40); // Minimum height for visibility

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
                            const slotTime = i * 60; // Minutes from start of day

                            return (
                                <div
                                    key={i}
                                    className="flex h-[60px] relative group active:bg-gray-100 dark:active:bg-white/10 transition-all duration-200 cursor-crosshair"
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        onBlankLongPress?.(activeDate, slotTime);
                                    }}
                                >
                                    <div className="w-16 flex-shrink-0 flex justify-end pr-3 pt-2 text-[11px] font-medium text-gray-400 select-none group-hover:text-red-500 transition-colors">
                                        {hour} {ampm}
                                    </div>
                                    <div className="flex-1 border-t border-gray-100 dark:border-white/10 relative">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="size-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 scale-75 group-hover:scale-100 transition-transform">
                                                <span className="material-symbols-outlined text-[20px]">add</span>
                                            </div>
                                        </div>
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
                                    className="absolute left-1 right-2 rounded-md p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm pointer-events-auto overflow-hidden group/event"
                                    style={{
                                        top: `${top}px`,
                                        height: `${height}px`,
                                        backgroundColor: `${event.color}20`, // Add transparency
                                        borderLeft: `3px solid ${event.color}`,
                                        color: event.color
                                    }}
                                >
                                    <div className="flex flex-col h-full relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteEvent(event.id);
                                            }}
                                            className="absolute top-0 right-0 size-6 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/50 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">close</span>
                                        </button>
                                        <span className="text-xs font-semibold leading-tight truncate pr-6">{event.title}</span>
                                        <span className="text-[10px] opacity-80 mt-auto">
                                            {minutesToTime(event.startTime)} - {minutesToTime(event.endTime)}
                                        </span>
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
