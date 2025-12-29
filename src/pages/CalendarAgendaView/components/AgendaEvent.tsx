import React from 'react';
import { minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';

interface AgendaEventProps {
    event: CalendarEvent;
    onDelete: (id: string) => void;
}

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onDelete }) => {
    return (
        <div className="relative flex gap-4 group z-10">
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
                            onDelete(event.id);
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
    );
};

export default React.memo(AgendaEvent);
