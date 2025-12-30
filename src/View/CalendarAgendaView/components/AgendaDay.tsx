import React from 'react';
import { dayjs, formatDate } from '../../../calendar/utils';
import AgendaEvent from './AgendaEvent';
import type { CalendarEvent } from '../../../types/event';

import { useGridUIStore } from '../../CalendarGridView/stores/useGridUIStore';

interface AgendaDayProps {
    date: Date;
    events: CalendarEvent[];
    onDeleteEvent: (id: string) => void;
}

const AgendaDay: React.FC<AgendaDayProps> = ({ date, events, onDeleteEvent }) => {
    const d = dayjs(date);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[d.day()];
    const day = d.format('D');
    const isToday = d.isSame(dayjs(), 'day');
    const dateStr = formatDate(date);
    const rowHeight = useGridUIStore(state => state.rowHeight);


    return (
        <div data-date={dateStr} className="relative mb-6">
            {/* 日期标题栏 */}
            <div className="h-16 bg-white dark:bg-black border-b border-transparent dark:border-white/5">
                <div className="px-2 h-full flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-2xl font-medium text-black dark:text-white font-display tracking-tight">
                            {weekday}
                        </h2>
                        <span className="text-2xl text-black dark:text-white font-serif font-medium">{day}</span>
                    </div>
                    {isToday && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 px-2 py-1 rounded-full">Today</span>
                    )}
                </div>
            </div>

            {/* 事件内容区 */}
            <div className="px-2 py-2 flex flex-col justify-center" style={{ minHeight: rowHeight }}>
                {events.length > 0 ? (
                    <div className="flex flex-col gap-1 relative">
                        <div className="absolute left-[2.5rem] top-0 bottom-0 w-px bg-transparent -z-0"></div>
                        {events.sort((a, b) => a.startTime - b.startTime).map(event => (
                            <AgendaEvent key={event.id} event={event} onDelete={onDeleteEvent} />
                        ))}
                    </div>
                ) : (
                    <div className="h-12 flex items-center px-6">
                        <div className="w-full h-px bg-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(AgendaDay);
