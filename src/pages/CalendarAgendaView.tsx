import React from 'react';
import { useEvents } from '../contexts/EventContext';

interface CalendarAgendaViewProps {
    activeDate: string;
}

const CalendarAgendaView: React.FC<CalendarAgendaViewProps> = ({ activeDate }) => {
    const { events, deleteEvent } = useEvents();

    const minutesToTime = (minutes: number): string => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    // Group events by date
    const groupedEvents = events.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {} as Record<string, typeof events>);

    // Sort dates
    const sortedDates = Object.keys(groupedEvents).sort();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
            day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            isToday: dateStr === new Date().toISOString().split('T')[0]
        };
    };

    return (
        <main className="flex-1 p-0 pb-32">
            {sortedDates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 opacity-40">
                    <span className="material-symbols-outlined text-4xl mb-2">calendar_today</span>
                    <p>No events scheduled yet</p>
                </div>
            ) : (
                sortedDates.map(dateStr => {
                    const { weekday, day, isToday } = formatDate(dateStr);
                    const dayEvents = groupedEvents[dateStr];

                    return (
                        <div key={dateStr} className={`relative mb-4 ${dateStr === activeDate ? 'ring-2 ring-red-500/20 rounded-xl' : ''}`}>
                            <div className={`sticky top-0 z-10 px-6 py-3 border-y border-gray-100 dark:border-white/5 flex items-center justify-between ${dateStr === activeDate
                                ? 'bg-red-50/95 dark:bg-red-900/20 backdrop-blur-md'
                                : 'bg-gray-50/95 dark:bg-[#111]/95 backdrop-blur-md'
                                }`}>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-lg font-bold ${dateStr === activeDate ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{weekday}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{day}</span>
                                </div>
                                {isToday && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 px-2 py-1 rounded-full">Today</span>
                                )}
                            </div>
                            <div className="px-4 py-4 space-y-3">
                                <div className="absolute left-[4.5rem] top-4 bottom-4 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                                {dayEvents.sort((a, b) => a.startTime - b.startTime).map(event => (
                                    <div key={event.id} className="relative flex gap-4 group z-10">
                                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                {minutesToTime(event.startTime)}
                                            </span>
                                        </div>
                                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md group/event">
                                            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: event.color }}></div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{event.title}</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteEvent(event.id);
                                                    }}
                                                    className="size-6 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">delete</span>
                                                </button>
                                            </div>
                                            {event.description && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{event.description}</p>
                                            )}
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                <span>{minutesToTime(event.startTime)} - {minutesToTime(event.endTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </main>
    );
};

export default CalendarAgendaView;
