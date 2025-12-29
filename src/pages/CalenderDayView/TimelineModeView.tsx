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
        <div className="flex flex-col" onWheel={handleWheel}>
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
                    <div key={rowIndex} className="flex flex-col">
                        {/* 时间指示线与标签 */}
                        <div className="flex items-center h-8">
                            <div className="w-8 flex-shrink-0 text-[11px] font-medium text-gray-400 dark:text-gray-500 text-center">
                                {Math.floor(startMins / 60)}
                            </div>
                            <div className="flex-1 border-t border-gray-100 dark:border-white/10" />
                            <div className="w-8 flex-shrink-0 text-[11px] font-medium text-gray-400 dark:text-gray-500 text-center">
                                {Math.floor(endMins / 60)}
                            </div>
                        </div>

                        {/* 事件内容区域 */}
                        <div className="px-8">
                            <div
                                className="relative transition-all duration-300"
                                style={{ height: `${containerHeight}px` }}
                            >
                                {/* 内部小时分割线 (1h 间隔) */}
                                <div className="absolute inset-0 flex justify-between px-[33.33%] pointer-events-none">
                                    <div className="h-full border-r border-gray-100/50 dark:border-white/5" />
                                    <div className="h-full border-r border-gray-100/50 dark:border-white/5" />
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
                    </div>
                );
            })}

            {/* 底部 24:00 指示线 */}
            <div className="flex items-center h-8">
                <div className="w-8 flex-shrink-0 text-[11px] font-medium text-gray-400 dark:text-gray-500 text-center">
                    24
                </div>
                <div className="flex-1 border-t border-gray-100 dark:border-white/10" />
                <div className="w-8 flex-shrink-0 text-[11px] font-medium text-gray-400 dark:text-gray-500 text-center">
                    24
                </div>
            </div>
        </div>
    );
};

export default TimelineModeView;
