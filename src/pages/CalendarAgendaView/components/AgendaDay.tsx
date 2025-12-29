import React from 'react';
import { dayjs, formatDate } from '../../../calendar/utils';
import AgendaEvent from './AgendaEvent';
import type { CalendarEvent } from '../../../types/event';

interface AgendaDayProps {
    date: Date;
    events: CalendarEvent[];
    onDeleteEvent: (id: string) => void;
}

const AgendaDay: React.FC<AgendaDayProps> = ({ date, events, onDeleteEvent }) => {
    const d = dayjs(date);
    const weekday = d.format('dddd');
    const day = d.format('MMM D');
    const isToday = d.isSame(dayjs(), 'day');
    const dateStr = formatDate(date);

    return (
        <div data-date={dateStr} className="relative mb-6">
            {/* 日期标题栏 */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-widest font-display-bold">
                            {weekday}
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{day}</span>
                    </div>
                    {isToday && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 px-2 py-1 rounded-full">Today</span>
                    )}
                </div>
            </div>

            {/* 事件内容区 */}
            <div className="px-4 py-4 min-h-[80px] flex flex-col justify-center">
                {events.length > 0 ? (
                    <div className="space-y-3 relative">
                        <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                        {events.sort((a, b) => a.startTime - b.startTime).map(event => (
                            <AgendaEvent key={event.id} event={event} onDelete={onDeleteEvent} />
                        ))}
                    </div>
                ) : (
                    <div className="h-12 flex items-center px-6">
                        <div className="w-full h-px bg-gray-50 dark:bg-white/5"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(AgendaDay);
