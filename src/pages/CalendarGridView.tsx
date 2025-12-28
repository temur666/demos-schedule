import React from 'react';
import { useCalendarGridStore } from '../stores/useCalendarGridStore';
import { CalendarEngine } from '../calendar/engine';
import { dayjs, formatDate, minutesToTime } from '../calendar/utils';

/**
 * UI (View) - CalendarGridView
 * 服务员：只负责展示，不处理业务逻辑
 */
interface CalendarGridViewProps {
    activeDate: string;
    onDateClick?: (date: string) => void;
}

const CalendarGridView: React.FC<CalendarGridViewProps> = ({ activeDate, onDateClick }) => {
    // Store: 从厨师长获取准备好的数据
    const { weeks, currentMonth, handleDeleteEvent, getEventsForDate } = useCalendarGridStore(activeDate);

    return (
        <main className="flex-1 p-0 pb-32 overflow-y-auto hide-scrollbar">
            {weeks.map((weekDays, weekIdx) => {
                const weekNum = CalendarEngine.getWeekNumber(weekDays[0]);
                return (
                    <div key={weekIdx} className="mb-0">
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Week {weekNum}</span>
                            <span className="h-px flex-1 bg-gray-200 dark:bg-white/10"></span>
                        </div>
                        <div className="grid grid-cols-3 gap-px bg-gray-100 dark:bg-white/10 border-b border-gray-100 dark:border-white/10">
                            <div className="col-span-2 relative bg-gray-50 dark:bg-white/5 min-h-[140px] p-4 flex flex-col justify-start group hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-gray-400 text-sm">edit_note</span>
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weekly Planning</span>
                                </div>
                                <div className="flex-1 border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-3 py-1">
                                    <p className="text-[10px] text-gray-400 italic">Tap to add goals...</p>
                                </div>
                            </div>
                            {weekDays.map(date => {
                                const dayEvents = getEventsForDate(date);
                                const dateStr = formatDate(date);
                                const isSelected = activeDate === dateStr;
                                const isCurrentMonth = dayjs(date).isSame(currentMonth, 'month');

                                return (
                                    <div
                                        key={dateStr}
                                        onClick={() => onDateClick?.(dateStr)}
                                        className={`relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${isSelected ? 'ring-2 ring-inset ring-red-500 z-10' : ''} ${!isCurrentMonth ? 'opacity-40' : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-semibold text-gray-400 uppercase">
                                                {dayjs(date).format('ddd')}
                                            </span>
                                            <span className={`text-sm font-semibold ${isSelected ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{dayjs(date).date()}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {dayEvents.map(event => (
                                                <div key={event.id} className="w-full pl-2 py-0.5 border-l-2 relative group/event" style={{ borderColor: event.color }}>
                                                    <span className="text-[9px] font-medium text-gray-900 dark:text-white truncate block pr-3">{event.title}</span>
                                                    <span className="text-[8px] text-gray-400 block">{minutesToTime(event.startTime)}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteEvent(event.id);
                                                        }}
                                                        className="absolute top-0 right-0 size-3 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover/event:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[8px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default CalendarGridView;
