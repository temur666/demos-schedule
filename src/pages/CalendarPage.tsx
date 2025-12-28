import React, { useState, useEffect } from 'react';
import CalendarGridView from './CalendarGridView';
import CalendarAgendaView from './CalendarAgendaView';
import CalendarDayView from './CalendarDayView';
import { AddEventModal } from '../components/AddEventModal';
import type { CreateEventInput } from '../types/event';
import { useEvents } from '../contexts/EventContext';

type ViewType = 'grid' | 'agenda' | 'schedule';

const CalendarPage: React.FC = () => {
    const [view, setView] = useState<ViewType>('schedule');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
    const { addEvent } = useEvents();

    const handleAddEvent = (input: CreateEventInput) => {
        addEvent({
            ...input,
            date: activeDate // Use the currently selected date
        });
    };

    // Touch handling state
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [touchOffset, setTouchOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const views: ViewType[] = ['grid', 'agenda', 'schedule'];

    // Toggle dark mode by adding/removing 'dark' class on the document element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

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

        // Detect horizontal swipe
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
                // Swipe Right -> Previous View
                const prevIndex = (currentIndex - 1 + views.length) % views.length;
                setView(views[prevIndex]);
            } else {
                // Swipe Left -> Next View
                const nextIndex = (currentIndex + 1) % views.length;
                setView(views[nextIndex]);
            }
        }

        setTouchStart(null);
        setTouchOffset(0);
        setIsSwiping(false);
    };

    const renderView = () => {
        return (
            <div
                key={view}
                className="animate-fade-in flex-1 flex flex-col overflow-hidden transition-transform duration-300 ease-out"
                style={{
                    transform: isSwiping ? `translateX(${touchOffset}px)` : 'translateX(0)',
                    opacity: isSwiping ? Math.max(0.5, 1 - Math.abs(touchOffset) / 400) : 1
                }}
            >
                {(() => {
                    switch (view) {
                        case 'grid':
                            return <CalendarGridView activeDate={activeDate} />;
                        case 'agenda':
                            return <CalendarAgendaView activeDate={activeDate} />;
                        case 'schedule':
                            return <CalendarDayView activeDate={activeDate} />;
                        default:
                            return <CalendarAgendaView activeDate={activeDate} />;
                    }
                })()}
            </div>
        );
    };

    return (
        <div
            className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-white dark:bg-black select-none"
        >
            <header
                className="sticky top-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-white/10"
                onTouchStart={(e) => e.stopPropagation()}
            >
                {view === 'schedule' ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-red-500 dark:text-red-400 cursor-pointer active:opacity-60 transition-opacity">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>chevron_left</span>
                            <span className="text-[17px] font-normal">October</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[17px] font-semibold text-gray-900 dark:text-white">Wednesday</span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">Oct 3, 2023</span>
                        </div>
                        <button className="flex size-8 items-center justify-center rounded-full text-red-500 dark:text-red-400 active:bg-red-50 dark:active:bg-red-900/20 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <button className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-90">
                            <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '20px' }}>search</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:bg-gray-100 dark:active:bg-white/10">
                                October 2023
                                <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>expand_more</span>
                            </button>
                        </div>
                        <button className="flex size-8 items-center justify-center rounded-full overflow-hidden border border-gray-200 dark:border-white/20 active:scale-90 transition-transform">
                            <div
                                className="size-full bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB31Yr33XMic1Ymy_L4WodOwMOW2iaAArSmNluP-jlvzSV4e5sLf14xg9MnxJzNJrbNQqkgSfTorVLKkNvr5Il3VGmtjQku9xZYDMg078yY0RRMcmuDMof3lGXPrQg26W5x8liYc-7DnpDKOsh6dE2a9RIIB3bXDMEwzTri1ix_NyTqO4QwNBfplBYDoVPCN59XkCEIVQI3Kcj3zq0mk68FCVLCCvD2vetfPppb9_8RVHb06sh1lPqT1T73CN1AV54JJl38k1l6PQs")' }}
                            ></div>
                        </button>
                    </div>
                )}

                {/* Week Day Selector */}
                <div className="mt-3 flex justify-between items-center px-1 overflow-x-auto hide-scrollbar pb-1">
                    {[
                        { day: 'S', date: '2023-10-01' },
                        { day: 'M', date: '2023-10-02' },
                        { day: 'W', date: '2023-10-03' },
                        { day: 'T', date: '2023-10-04' },
                        { day: 'F', date: '2023-10-05' },
                        { day: 'S', date: '2023-10-06' },
                        { day: 'S', date: '2023-10-07' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveDate(item.date)}
                            className={`flex flex-col items-center gap-1 min-w-[40px] cursor-pointer transition-all duration-200 ${activeDate === item.date ? 'scale-110' : 'opacity-50 hover:opacity-80'}`}
                        >
                            <span className={`text-[10px] uppercase ${activeDate === item.date ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-500'}`}>{item.day}</span>
                            <div className={`flex items-center justify-center size-8 rounded-full text-[16px] transition-all ${activeDate === item.date
                                ? 'bg-red-500 font-semibold text-white shadow-md'
                                : 'font-medium text-gray-900 dark:text-white'
                                }`}>
                                {item.date.split('-')[2]}
                            </div>
                        </div>
                    ))}
                </div>
            </header>

            <div
                className="flex-1 flex flex-col overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {renderView()}
            </div>

            {/* Floating Bottom Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="size-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[24px]">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
                </button>

                <div className="flex h-12 items-center gap-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 px-2">
                    <button
                        onClick={() => setView('grid')}
                        className={`h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'grid'
                            ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white scale-110'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${view === 'grid' ? 'font-variation-settings-fill' : ''}`}>grid_view</span>
                    </button>
                    <button
                        onClick={() => setView('agenda')}
                        className={`h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'agenda'
                            ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white scale-110'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${view === 'agenda' ? 'font-variation-settings-fill' : ''}`}>view_agenda</span>
                    </button>
                    <button
                        onClick={() => setView('schedule')}
                        className={`h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'schedule'
                            ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white scale-110'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-[20px] ${view === 'schedule' ? 'font-variation-settings-fill' : ''}`}>schedule</span>
                    </button>
                </div>

                <AddEventModal onAddEvent={handleAddEvent} />
            </div>
        </div>
    );
};

export default CalendarPage;
