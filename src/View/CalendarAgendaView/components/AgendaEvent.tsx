import React from 'react';
import { minutesToTime } from '../../../calendar/utils';
import type { CalendarEvent } from '../../../types/event';

interface AgendaEventProps {
    event: CalendarEvent;
    onDelete: (id: string) => void;
}

// 颜色映射函数：根据 event.color 映射到预定义的配色主题
const getColorTheme = (color: string) => {
    const colorMap: Record<string, { bg: string; bar: string; text: string; darkBg: string; darkBar: string; darkText: string }> = {
        '#F4B553': { bg: 'bg-[#FFF9EB]', bar: 'bg-[#F4B553]', text: 'text-[#8C6A28]', darkBg: 'dark:bg-yellow-500/10', darkBar: 'dark:bg-yellow-500', darkText: 'dark:text-yellow-100' },
        '#f9a20a': { bg: 'bg-[#FFF9EB]', bar: 'bg-[#F4B553]', text: 'text-[#8C6A28]', darkBg: 'dark:bg-yellow-500/10', darkBar: 'dark:bg-yellow-500', darkText: 'dark:text-yellow-100' },
        '#7ED348': { bg: 'bg-[#EBF9E6]', bar: 'bg-[#7ED348]', text: 'text-[#3F6C26]', darkBg: 'dark:bg-lime-500/10', darkBar: 'dark:bg-lime-500', darkText: 'dark:text-lime-100' },
        '#29402f': { bg: 'bg-[#EBF9E6]', bar: 'bg-[#7ED348]', text: 'text-[#3F6C26]', darkBg: 'dark:bg-lime-500/10', darkBar: 'dark:bg-lime-500', darkText: 'dark:text-lime-100' },
        '#5FA8EE': { bg: 'bg-[#EBF8FF]', bar: 'bg-[#5FA8EE]', text: 'text-[#264E75]', darkBg: 'dark:bg-sky-500/10', darkBar: 'dark:bg-sky-400', darkText: 'dark:text-sky-100' },
        '#14324d': { bg: 'bg-[#EBF8FF]', bar: 'bg-[#5FA8EE]', text: 'text-[#264E75]', darkBg: 'dark:bg-sky-500/10', darkBar: 'dark:bg-sky-400', darkText: 'dark:text-sky-100' },
        '#9F58D6': { bg: 'bg-[#F6EEFD]', bar: 'bg-[#9F58D6]', text: 'text-[#542078]', darkBg: 'dark:bg-purple-500/10', darkBar: 'dark:bg-purple-500', darkText: 'dark:text-purple-100' },
        '#6b46c1': { bg: 'bg-[#F6EEFD]', bar: 'bg-[#9F58D6]', text: 'text-[#542078]', darkBg: 'dark:bg-purple-500/10', darkBar: 'dark:bg-purple-500', darkText: 'dark:text-purple-100' },
        '#FF6B9C': { bg: 'bg-[#FFF0F5]', bar: 'bg-[#FF6B9C]', text: 'text-[#992E52]', darkBg: 'dark:bg-pink-500/10', darkBar: 'dark:bg-pink-500', darkText: 'dark:text-pink-100' },
        '#48202a': { bg: 'bg-[#FFF0F5]', bar: 'bg-[#FF6B9C]', text: 'text-[#992E52]', darkBg: 'dark:bg-pink-500/10', darkBar: 'dark:bg-pink-500', darkText: 'dark:text-pink-100' },
        '#38B2AC': { bg: 'bg-[#E6FFFA]', bar: 'bg-[#38B2AC]', text: 'text-[#236C68]', darkBg: 'dark:bg-teal-500/10', darkBar: 'dark:bg-teal-500', darkText: 'dark:text-teal-100' },
    };

    // 默认使用蓝色主题
    return colorMap[color] || colorMap['#5FA8EE'];
};

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onDelete }) => {
    const theme = getColorTheme(event.color);

    return (
        <div className={`group flex items-stretch ${theme.bg} ${theme.darkBg} rounded-xl p-3.5 pr-4 relative overflow-hidden`}>
            {/* 左侧彩色竖条 */}
            <div className={`absolute left-3.5 top-3 bottom-3 w-1.5 rounded-full ${theme.bar} ${theme.darkBar}`}></div>

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
