import { useRef, useEffect, useCallback } from 'react';

interface UseAgendaScrollProps {
    days: Date[];
    loadMore: (direction: 'up' | 'down') => void;
    activeDate: string;
    onActiveDateChange?: (date: string) => void;
}

export const useAgendaScroll = ({ days, loadMore, activeDate, onActiveDateChange }: UseAgendaScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef(0);
    const prevHeight = useRef(0);

    // 向上滚动加载时的位置补偿
    useEffect(() => {
        if (containerRef.current && prevHeight.current > 0) {
            const newHeight = containerRef.current.scrollHeight;
            if (newHeight > prevHeight.current && containerRef.current.scrollTop < 200) {
                containerRef.current.scrollTop += (newHeight - prevHeight.current);
            }
        }
        prevHeight.current = containerRef.current?.scrollHeight || 0;
    }, [days]);

    useEffect(() => {
        if (!containerRef.current) return;
        const targetEl = containerRef.current.querySelector(`[data-date="${activeDate}"]`);
        if (targetEl) {
            const container = containerRef.current;
            const targetRect = targetEl.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const targetCenter = targetRect.top + targetRect.height / 2;
            const containerCenter = containerRect.top + containerRect.height / 2;

            if (Math.abs(targetCenter - containerCenter) > 50) {
                container.scrollTo({
                    top: container.scrollTop + (targetCenter - containerCenter),
                    behavior: 'smooth'
                });
            }
        }
    }, [activeDate, days]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        // 1. 触发加载更多
        if (scrollTop + clientHeight > scrollHeight - 600) {
            loadMore('down');
        } else if (scrollTop < 300 && scrollTop < lastScrollTop.current) {
            loadMore('up');
        }
        lastScrollTop.current = scrollTop;

        // 2. 根据滚动位置更新 activeDate (检测视图中心位置的日期)
        const containerRect = containerRef.current.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        const elements = containerRef.current.querySelectorAll('[data-date]');
        for (const el of Array.from(elements)) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= centerY && rect.bottom >= centerY) {
                const date = el.getAttribute('data-date');
                if (date && date !== activeDate) onActiveDateChange?.(date);
                break;
            }
        }
    }, [activeDate, loadMore, onActiveDateChange]);

    return {
        containerRef,
        handleScroll
    };
};
