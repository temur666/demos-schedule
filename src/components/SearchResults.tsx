import React from 'react';
import { useSearchStore } from '../stores/useSearchStore';
import { useEvents } from '../contexts/useEvents';
import { useCalendarPageStore } from '../stores/useCalendarPageStore';
import { dayjs } from '../calendar/utils';
import { motion } from 'framer-motion';

export const SearchResults: React.FC = () => {
    const { searchQuery, closeSearch } = useSearchStore();
    const { events } = useEvents();
    const { setActiveDate, setView } = useCalendarPageStore();

    if (!searchQuery) return null;

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

    const handleResultClick = (date: string) => {
        setActiveDate(date);
        setView('schedule');
        closeSearch();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-16 left-0 right-0 bottom-0 z-[90] bg-white dark:bg-zinc-900 overflow-y-auto px-4 py-2"
        >
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 px-2">
                搜索结果 ({filteredEvents.length})
            </div>

            {filteredEvents.length > 0 ? (
                <div className="space-y-1">
                    {filteredEvents.map(event => (
                        <button
                            key={event.id}
                            onClick={() => handleResultClick(event.date)}
                            className="w-full flex flex-col items-start p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 active:bg-gray-200 dark:active:bg-white/10 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2 w-full">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: event.color || '#3b82f6' }}
                                />
                                <span className="font-medium text-gray-900 dark:text-white truncate flex-1">
                                    {event.title}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {dayjs(event.date).format('MMM D')}
                                </span>
                            </div>
                            {event.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 pl-4">
                                    {event.description}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                    <p className="text-sm">未找到相关日程</p>
                </div>
            )}
        </motion.div>
    );
};
