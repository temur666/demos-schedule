import React, { useEffect } from 'react';
import CalendarGridView from './CalendarGridView';
import CalendarAgendaView from './CalendarAgendaView';
import CalendarDayView from './CalenderDayView';
import { CalendarBottomBar } from '../components/CalendarBottomBar';
import { CalendarTopBar } from '../components/CalendarTopBar';
import DateWidget from '../components/DateWidget/DateWidget';
import type { CreateEventInput } from '../types/event';
import { useEvents } from '../contexts/useEvents';
import { minutesToTime } from '../calendar/utils';
import { useCalendarPageStore } from '../stores/useCalendarPageStore';
import { useViewSwipe } from '../hooks/useViewSwipe';


const CalendarPage: React.FC = () => {
    const {
        view, setView,
        activeDate, setActiveDate,
        isDarkMode, toggleDarkMode,
        isModalOpen, setIsModalOpen,
        initialModalData, setInitialModalData
    } = useCalendarPageStore();

    const { addEvent } = useEvents();
    const {
        touchOffset,
        isSwiping,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    } = useViewSwipe(view, setView);

    const confirmCreate = (input: Omit<CreateEventInput, 'date'> & { date?: string }) => {
        addEvent({
            ...input,
            date: input.date || activeDate
        });
        setIsModalOpen(false);
    };

    const handleCreateFromBlank = (date: string, time: number) => {
        setInitialModalData({
            date,
            startTime: minutesToTime(time)
        });
        setIsModalOpen(true);
    };

    const handleAddEvent = (input: CreateEventInput) => {
        confirmCreate(input);
    };

    // Toggle dark mode by adding/removing 'dark' class on the document element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);



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
                            return (
                                <CalendarGridView
                                    activeDate={activeDate}
                                    onDateClick={(date) => {
                                        setActiveDate(date);
                                        setView('schedule');
                                    }}
                                    onActiveDateChange={setActiveDate}
                                />
                            );
                        case 'agenda':
                            return <CalendarAgendaView activeDate={activeDate} onActiveDateChange={setActiveDate} />;
                        case 'schedule':
                            return (
                                <CalendarDayView
                                    activeDate={activeDate}
                                    onBlankLongPress={handleCreateFromBlank}
                                    onActiveDateChange={setActiveDate}
                                />
                            );
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
            <CalendarTopBar />


            <div
                className="flex-1 flex flex-col overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {renderView()}
            </div>

            <CalendarBottomBar
                view={view}
                setView={setView}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initialModalData={initialModalData}
                onAddEvent={handleAddEvent}
            />


            <DateWidget date={activeDate} />
        </div>
    );
};

export default CalendarPage;
