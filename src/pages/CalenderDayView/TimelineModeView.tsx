import React from 'react';
import { minutesToTime } from '../../calendar/utils';
import { assignLayoutToEvents } from './utils';
import TimelineEventCard from './TimelineEventCard';
import { useTimelineUIStore } from './stores/useTimelineUIStore';
import { TIMELINE_CONFIG } from './config/timelineConfig';

interface TimelineModeViewProps {
    events: any[];
}

const TimelineModeView: React.FC<TimelineModeViewProps> = ({ events }) => {
    const { rowHeight, handlePinchZoom } = useTimelineUIStore();

    // 处理捏合缩放手势（Ctrl/Cmd + 滚轮）
    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const scale = e.deltaY > 0 ? 0.95 : 1.05;
            handlePinchZoom(scale);
        }
    };

    return (
        <div className="p-4" onWheel={handleWheel}>
            {Array.from({ length: 8 }).map((_, rowIndex) => {
                const startMins = rowIndex * TIMELINE_CONFIG.HOURS_PER_ROW * 60;
                const endMins = (rowIndex + 1) * TIMELINE_CONFIG.HOURS_PER_ROW * 60;

                // 过滤并切分属于这个 Slot 的事件
                const slotEvents = events.flatMap(event => {
                    const eStart = event.startTime;
                    const eEnd = event.endTime;

                    // 检查事件是否在该 Slot 时间范围内
                    if (eStart < endMins && eEnd > startMins) {
                        const segmentStart = Math.max(eStart, startMins);
                        const segmentEnd = Math.min(eEnd, endMins);

                        return [{
                            ...event,
                            // 在 Slot 内部的相对时间
                            displayStart: segmentStart - startMins,
                            displayEnd: segmentEnd - startMins,
                            // 标记是否被切断
                            isCutStart: eStart < startMins,
                            isCutEnd: eEnd > endMins
                        }];
                    }
                    return [];
                });

                const layoutEvents = assignLayoutToEvents(slotEvents.map(e => ({
                    ...e,
                    startTime: e.displayStart,
                    endTime: e.displayEnd
                })));

                const maxLayers = layoutEvents.length > 0 ? layoutEvents[0].totalColumns : 1;
                const containerHeight = Math.max(
                    TIMELINE_CONFIG.MIN_ROW_HEIGHT,
                    maxLayers * rowHeight + (maxLayers + 1) * TIMELINE_CONFIG.ITEM_GAP
                );

                return (
                    <div key={rowIndex} className="flex flex-col mb-4">
                        <div className="flex justify-between px-1 mb-1">
                            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                                {minutesToTime(startMins)}
                            </span>
                            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                                {minutesToTime(endMins)}
                            </span>
                        </div>
                        <div
                            className="relative bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden transition-all duration-300"
                            style={{ height: `${containerHeight}px` }}
                        >
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex justify-between px-[33.33%] pointer-events-none">
                                <div className="h-full border-r border-gray-200/50 dark:border-white/5 border-dashed" />
                                <div className="h-full border-r border-gray-200/50 dark:border-white/5 border-dashed" />
                            </div>

                            {layoutEvents.map((event: any) => (
                                <TimelineEventCard
                                    key={event.id}
                                    event={event}
                                    hoursPerRow={TIMELINE_CONFIG.HOURS_PER_ROW}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TimelineModeView;
