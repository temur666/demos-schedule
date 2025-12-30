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
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // 当 activeDate 改变时（且非手动滚动中），自动滚动到对应位置
    useEffect(() => {
        if (!isScrolling.current && containerRef.current) {
            const el = containerRef.current.querySelector(`[data-date="${activeDate}"]`) as HTMLElement;
            if (el) {
                const container = containerRef.current;
                const elementTop = el.offsetTop;
                const elementHeight = el.offsetHeight;
                const containerHeight = container.clientHeight;

                // 计算居中位置
                const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);

                container.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeDate, days]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        // 开启滚动锁，防止自动滚动逻辑冲突
        isScrolling.current = true;
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false;
        }, 150);

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
