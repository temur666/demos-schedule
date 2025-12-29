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
    }, [activeDate, loadMore, onActiveDateChange, containerRef]);

    return { handleScroll };
};
