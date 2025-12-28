import { useMemo } from 'react';
import { useEvents } from '../contexts/useEvents';
import { CalendarEngine } from '../calendar/engine';
import { dayjs } from '../calendar/utils';

/**
 * Store (ViewModel) for CalendarGridView
 * 厨师长：负责准备数据、处理业务逻辑
 */
export const useCalendarGridStore = (activeDate: string) => {
    const { events, deleteEvent } = useEvents();

    // State: 计算当前视图的周数据
    const weeks = useMemo(() => {
        const viewDate = dayjs(activeDate).toDate();
        const range = CalendarEngine.getVisibleRange(viewDate, 'month');
        return CalendarEngine.getWeeksInRange(range);
    }, [activeDate]);

    // State: 当前月份（用于判断日期是否属于当前月）
    const currentMonth = useMemo(() => {
        return dayjs(activeDate).toDate();
    }, [activeDate]);

    // Action: 删除事件
    const handleDeleteEvent = (eventId: string) => {
        deleteEvent(eventId);
    };

    // Utils: 获取指定日期的事件
    const getEventsForDate = (date: Date) => {
        return CalendarEngine.filterEventsForDate(events, date);
    };

    return {
        // State
        weeks,
        currentMonth,
        // Actions
        handleDeleteEvent,
        // Utils
        getEventsForDate,
    };
};
