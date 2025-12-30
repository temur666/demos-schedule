import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsModal } from './SettingsModal';
import { useSearchStore } from '../stores/useSearchStore';

import { SearchResults } from './SearchResults';

export const CalendarTopBar: React.FC = () => {
    const { isSearchOpen, searchQuery, setSearchQuery, openSearch, closeSearch } = useSearchStore();

    return (
        <>
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        {/* 背景变暗遮罩 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeSearch}
                            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                        />
                        {/* 顶部下滑搜索框 */}
                        <motion.div
                            initial={{ y: -64 }}
                            animate={{ y: 0 }}
                            exit={{ y: -64 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 right-0 z-[80] h-full max-h-screen bg-white dark:bg-zinc-900 shadow-xl flex flex-col"
                        >
                            <div className="h-16 flex items-center px-4 gap-3 border-b border-gray-100 dark:border-white/5">
                                <div className="flex-1 flex items-center bg-gray-100 dark:bg-white/10 rounded-xl px-3 h-10">
                                    <span className="material-symbols-outlined text-gray-500 mr-2">search</span>
                                    <input
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="搜索日程、活动..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white"
                                    />
                                </div>
                                <button
                                    onClick={closeSearch}
                                    className="text-blue-600 dark:text-blue-400 font-medium text-sm px-2 active:opacity-70 transition-opacity"
                                >
                                    取消
                                </button>
                            </div>

                            <SearchResults />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="fixed top-[9px] right-4 z-[60] flex items-center h-11 px-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10">
                <button
                    onClick={openSearch}
                    className="h-8 w-10 flex items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[22px]">search</span>
                </button>
                <SettingsModal />
            </div>
        </>
    );
};
