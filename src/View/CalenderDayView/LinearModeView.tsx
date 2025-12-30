import React from 'react';
import { assignLayoutToEvents } from './utils';
import LinearEventCard from './LinearEventCard';

interface LinearModeViewProps {
    dateStr: string;
    events: any[];
    onBlankLongPress?: (date: string, time: number) => void;
}

const LinearModeView: React.FC<LinearModeViewProps> = ({
    dateStr,
    events,
    onBlankLongPress
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
            <div className="relative pt-4">
                <div className="flex flex-col">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? 'AM' : 'PM';
                        const slotTime = i * 60;

                        return (
                            <div
                                key={i}
                                className="flex h-[60px] items-start relative group active:bg-gray-100 dark:active:bg-white/10 transition-all duration-200 cursor-crosshair"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onBlankLongPress?.(dateStr, slotTime);
                                }}
                            >
                                <div className="w-16 flex-shrink-0 flex justify-end pr-3 -translate-y-1/2 text-[11px] leading-none font-medium text-gray-400 select-none">
                                    {hour} {ampm}
                                </div>
                                <div className="flex-1 border-t border-gray-100 dark:border-white/10" />
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
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LinearModeView;
