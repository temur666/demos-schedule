import React from 'react';
import type { ViewType } from '../stores/useCalendarPageStore';
import { AddEventModal } from './AddEventModal';
import type { CreateEventInput } from '../types/event';

interface CalendarBottomBarProps {
    view: ViewType;
    setView: (view: ViewType) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    initialModalData: { startTime?: string, date?: string };
    onAddEvent: (input: CreateEventInput) => void;
}

export const CalendarBottomBar: React.FC<CalendarBottomBarProps> = ({
    view,
    setView,
    isDarkMode,
    toggleDarkMode,
    isModalOpen,
    setIsModalOpen,
    initialModalData,
    onAddEvent
}) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleDarkMode}
                    className="size-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[24px]">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
                </button>
            </div>

            <div className="relative flex h-12 items-center gap-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 px-2">
                {/* Sliding Background Indicator */}
                <div
                    className="absolute h-10 w-12 rounded-full bg-black/5 dark:bg-white/10 transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(${view === 'grid' ? '0' : view === 'agenda' ? '52px' : '104px'})`
                    }}
                />

                <button
                    onClick={() => setView('grid')}
                    className={`relative h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'grid'
                        ? 'text-gray-900 dark:text-white scale-110'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <span className={`material-symbols-outlined text-[20px] ${view === 'grid' ? 'font-variation-settings-fill' : ''}`}>grid_view</span>
                </button>
                <button
                    onClick={() => setView('agenda')}
                    className={`relative h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'agenda'
                        ? 'text-gray-900 dark:text-white scale-110'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <span className={`material-symbols-outlined text-[20px] ${view === 'agenda' ? 'font-variation-settings-fill' : ''}`}>view_agenda</span>
                </button>
                <button
                    onClick={() => setView('schedule')}
                    className={`relative h-10 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${view === 'schedule'
                        ? 'text-gray-900 dark:text-white scale-110'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                >
                    <span className={`material-symbols-outlined text-[20px] ${view === 'schedule' ? 'font-variation-settings-fill' : ''}`}>schedule</span>
                </button>
            </div>

            <AddEventModal
                onAddEvent={onAddEvent}
                isOpen={isModalOpen}
                initialData={initialModalData}
                onOpenChange={(open) => setIsModalOpen(open)}
            />
        </div>
    );
};
