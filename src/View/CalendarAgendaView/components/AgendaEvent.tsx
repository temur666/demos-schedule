import React from 'react';
import { minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';
import { getColorTheme } from '../../../utils/colorTheme';

interface AgendaEventProps {
    event: CalendarEvent;
    onDelete: (id: string) => void;
}

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onDelete }) => {
    const theme = getColorTheme(event.color);

    return (
        <div className={`group flex items-stretch ${theme.bg} ${theme.darkBg} rounded-xl p-3.5 pr-4 relative overflow-hidden`}>
            {/* 左侧彩色竖条 */}
            <div className={`absolute left-3.5 top-3 bottom-3 w-1 rounded-full ${theme.bar} ${theme.darkBar}`}></div>

            {/* 内容区域 */}
            <div className="flex justify-between items-center w-full pl-5">
                {/* 左侧：标题和描述 */}
                <div className="flex flex-col">
                    <span className={`text-[15px] font-bold ${theme.text} ${theme.darkText}`}>
                        {event.title}
                    </span>
                    {event.description && (
                        <span className={`text-[13px] font-medium ${theme.text} ${theme.darkText} mt-0.5 opacity-90`}>
                            {event.description}
                        </span>
                    )}
                </div>

                {/* 右侧：时间 */}
                <div className={`flex flex-col items-end text-[13px] font-medium ${theme.text} ${theme.darkText} leading-tight ml-3`}>
                    <span>{minutesToTime(event.startTime)}</span>
                    <span>{minutesToTime(event.endTime)}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AgendaEvent);
