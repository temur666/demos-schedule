import { useState, useCallback } from 'react';
import { useGridUIStore } from './useGridUIStore';

export const usePinchAction = () => {
    const { rowHeight, setRowHeight } = useGridUIStore();
    const [initialDistance, setInitialDistance] = useState<number | null>(null);
    const [initialRowHeight, setInitialRowHeight] = useState<number>(rowHeight);

    const getDistance = (touches: React.TouchList) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            setInitialDistance(getDistance(e.touches));
            setInitialRowHeight(rowHeight);
        }
    }, [rowHeight]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 2 && initialDistance !== null) {
            // 阻止默认滚动行为，解决双指捏合与滚动的冲突
            if (e.cancelable) {
                e.preventDefault();
            }

            const currentDistance = getDistance(e.touches);
            const scale = currentDistance / initialDistance;
            setRowHeight(initialRowHeight * scale);
        }
    }, [initialDistance, initialRowHeight, setRowHeight]);

    const handleTouchEnd = useCallback(() => {
        setInitialDistance(null);
    }, []);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};
