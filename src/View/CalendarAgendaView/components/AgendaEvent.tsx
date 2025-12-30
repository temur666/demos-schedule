import React from 'react';
import { minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';

interface AgendaEventProps {
    event: CalendarEvent;
    onDelete: (id: string) => void;
}

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onDelete }) => {
    return (
        <div className="relative flex gap-2 group z-10">
            <div className="w-8 flex-shrink-0 flex flex-col items-end pt-1">
                <span className="text-[8px] font-medium text-gray-900 dark:text-white">
                    {minutesToTime(event.startTime)}
                </span>
            </div>
            <div className="flex-1 p-2 rounded-2xl bg-white dark:bg-white/5 border border-transparent dark:border-white/5 relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer group/event">
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: event.color }}></div>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-[9px]">{event.title}</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(event.id);
                        }}
                        className="size-4 flex items-center justify-center rounded-full bg-transparent dark:bg-white/5 opacity-0 group-hover/event:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-[10px]">delete</span>
                    </button>
                </div>
                {event.description && (
                    <p className="text-[8px] text-black dark:text-white/60 mb-1">{event.description}</p>
                )}
                <div className="flex items-center gap-1 text-[8px] text-black dark:text-white/60">
                    <span className="material-symbols-outlined text-[10px]">schedule</span>
                    <span>{minutesToTime(event.startTime)} - {minutesToTime(event.endTime)}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AgendaEvent);
