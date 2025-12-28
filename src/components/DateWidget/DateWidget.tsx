import React from 'react';
import { dayjs } from '../../calendar/utils';

interface DateWidgetProps {
    date: string;
}

/**
 * DateWidget - 模仿传统机械手表日期窗的悬浮组件
 */
const DateWidget: React.FC<DateWidgetProps> = ({ date }) => {
    const day = dayjs(date).date();

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] pointer-events-none select-none">
            {/* 胶囊外壳：磨砂质感 */}
            <div className="w-6 h-12 rounded-full bg-neutral-400/20 dark:bg-neutral-500/20 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                {/* 日期数字：粗体，模仿机械盘面 */}
                <span className="text-[13px] font-black text-gray-900 dark:text-white font-mono tracking-tighter">
                    {day < 10 ? `0${day}` : day}
                </span>
            </div>

            {/* 装饰性机械刻线 */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-gray-400/30"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-gray-400/30"></div>
        </div>
    );
};

export default DateWidget;
