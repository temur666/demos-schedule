import React from 'react';
import CalendarGridView from './CalendarGridView';
import CalendarAgendaView from './CalendarAgendaView';
import CalendarDayView from './CalenderDayView';
import { CalendarBottomBar } from '../components/CalendarBottomBar';
import { CalendarTopBar } from '../components/CalendarTopBar';
import DateWidget from '../components/DateWidget/DateWidget';
import type { CreateEventInput } from '../types/event';
import { useEvents } from '../contexts/useEvents';
import { minutesToTime, formatDate } from '../calendar/utils';
import { useCalendarPageStore } from '../stores/useCalendarPageStore';
import { useViewSwipe } from '../hooks/useViewSwipe';


const CalendarPage: React.FC = () => {
    const {
        view, setView,
        activeDate, setActiveDate,
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

    const handleCreateWeekPlan = (date: string) => {
        setInitialModalData({
            date,
            startTime: '09:00',
            isWeekPlan: true
        });
        setIsModalOpen(true);
    };

    const handleAddEvent = (input: CreateEventInput) => {
        confirmCreate(input);
    };

    const handleBackToToday = () => {
        setActiveDate(formatDate(new Date()));
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
                            return (
                                <CalendarGridView
                                    activeDate={activeDate}
                                    onDateClick={(date) => {
                                        setActiveDate(date);
                                        setView('schedule');
                                    }}
                                    onWeekClick={(date) => {
                                        setActiveDate(date);
                                        setView('agenda');
                                    }}
                                    onWeekLongPress={handleCreateWeekPlan}
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
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initialModalData={initialModalData}
                onAddEvent={handleAddEvent}
            />


            <DateWidget date={activeDate} onDoubleClick={handleBackToToday} />
        </div>
    );
};

export default CalendarPage;
