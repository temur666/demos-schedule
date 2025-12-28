import { useState } from 'react';
import type { ViewType } from '../stores/useCalendarPageStore';

export const useViewSwipe = (view: ViewType, setView: (view: ViewType) => void) => {
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [touchOffset, setTouchOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const views: ViewType[] = ['grid', 'agenda', 'schedule'];

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
        setTouchOffset(0);
        setIsSwiping(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const currentX = e.targetTouches[0].clientX;
        const currentY = e.targetTouches[0].clientY;
        const dx = currentX - touchStart.x;
        const dy = currentY - touchStart.y;

        if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
            setIsSwiping(true);
        }

        if (isSwiping) {
            setTouchOffset(dx);
        }
    };

    const handleTouchEnd = () => {
        if (isSwiping && Math.abs(touchOffset) > 100) {
            const currentIndex = views.indexOf(view);
            if (touchOffset > 0) {
                const prevIndex = (currentIndex - 1 + views.length) % views.length;
                setView(views[prevIndex]);
            } else {
                const nextIndex = (currentIndex + 1) % views.length;
                setView(views[nextIndex]);
            }
        }

        setTouchStart(null);
        setTouchOffset(0);
        setIsSwiping(false);
    };

    return {
        touchOffset,
        isSwiping,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};
