import { useRef, useEffect, useCallback } from 'react';

export const useScrollAction = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    monthGroups: any[],
    loadMore: (dir: 'up' | 'down') => void,
    activeDate: string,
    onActiveDateChange?: (date: string) => void
) => {
    const lastScrollTop = useRef(0);
    const prevHeight = useRef(0);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (containerRef.current && prevHeight.current > 0) {
            const newHeight = containerRef.current.scrollHeight;
            if (newHeight > prevHeight.current && containerRef.current.scrollTop < 200) {
                containerRef.current.scrollTop += (newHeight - prevHeight.current);
            }
        }
        prevHeight.current = containerRef.current?.scrollHeight || 0;
    }, [monthGroups]);

    // Scroll to activeDate when it changes (and we are not scrolling)
    useEffect(() => {
        if (!isScrolling.current && containerRef.current) {
            const el = containerRef.current.querySelector(`[data-date="${activeDate}"]`) as HTMLElement;
            if (el) {
                const container = containerRef.current;
                const elementTop = el.offsetTop;
                const elementHeight = el.offsetHeight;
                const containerHeight = container.clientHeight;

                const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);

                container.scrollTo({
                    top: targetScrollTop,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeDate, monthGroups]);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        isScrolling.current = true;
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false;
        }, 150);

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight > scrollHeight - 600) {
            loadMore('down');
        } else if (scrollTop < 300 && scrollTop < lastScrollTop.current) {
            loadMore('up');
        }
        lastScrollTop.current = scrollTop;

        // 2. 根据滚动位置更新 activeDate (检测视图顶部位置的日期)
        const containerRect = containerRef.current.getBoundingClientRect();
        // Grid 视图检测点稍低一点，因为有 MonthHeader
        const detectY = containerRect.top + 150;

        const elements = containerRef.current.querySelectorAll('[data-date]');
        let foundDate: string | null = null;

        for (const el of Array.from(elements)) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= detectY && rect.bottom >= detectY) {
                foundDate = el.getAttribute('data-date');
                break;
            }
        }

        if (foundDate && foundDate !== activeDate) {
            onActiveDateChange?.(foundDate);
        }
    }, [activeDate, loadMore, onActiveDateChange, containerRef]);

    return { handleScroll };
};
