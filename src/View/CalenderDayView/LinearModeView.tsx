import React from 'react';
import { assignLayoutToEvents } from './utils';
import LinearEventCard from './LinearEventCard';

interface LinearModeViewProps {
    dateStr: string;
    events: any[];
    onBlankLongPress?: (date: string, time: number) => void;
    onDeleteEvent: (id: string) => void;
}

const LinearModeView: React.FC<LinearModeViewProps> = ({
    dateStr,
    events,
    onBlankLongPress,
    onDeleteEvent
}) => {
    return (
        <>
            {/* All Day Section */}
            <div className="border-b border-gray-100 dark:border-white/10">
                <div className="flex min-h-[40px] relative">
                    <div className="w-16 flex-shrink-0 border-r border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-gray-400">all-day</span>
                    </div>
                    <div className="flex-1 p-1"></div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                <div className="flex flex-col">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? 'AM' : 'PM';
                        const slotTime = i * 60;

                        return (
                            <div
                                key={i}
                                className="flex h-[60px] relative group active:bg-gray-100 dark:active:bg-white/10 transition-all duration-200 cursor-crosshair"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onBlankLongPress?.(dateStr, slotTime);
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
                    {assignLayoutToEvents(events).map((event: any) => (
                        <LinearEventCard
                            key={event.id}
                            event={event}
                            onDelete={onDeleteEvent}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LinearModeView;
