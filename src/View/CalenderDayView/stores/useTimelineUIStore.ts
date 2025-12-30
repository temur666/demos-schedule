import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TIMELINE_CONFIG } from '../config/timelineConfig';

interface TimelineUIState {
    // State - 状态
    rowHeight: number;

    // Actions - 操作
    setRowHeight: (height: number) => void;
    handlePinchZoom: (scale: number) => void;
    resetRowHeight: () => void;
}

export const useTimelineUIStore = create<TimelineUIState>()(
    persist(
        (set, get) => ({
            // 初始状态
            rowHeight: TIMELINE_CONFIG.DEFAULT_ROW_HEIGHT,

            // 设置行高（带边界限制）
            setRowHeight: (height: number) => {
                const clampedHeight = Math.max(
                    TIMELINE_CONFIG.MIN_ROW_HEIGHT,
                    Math.min(TIMELINE_CONFIG.MAX_ROW_HEIGHT, height)
                );
                set({ rowHeight: clampedHeight });
            },

            // 处理捏合缩放
            handlePinchZoom: (scale: number) => {
                const currentHeight = get().rowHeight;
                const newHeight = currentHeight * scale;
                get().setRowHeight(newHeight);
            },

            // 重置为默认高度
            resetRowHeight: () => {
                set({ rowHeight: TIMELINE_CONFIG.DEFAULT_ROW_HEIGHT });
            }
        }),
        {
            name: 'timeline-ui-storage', // localStorage key
        }
    )
);
