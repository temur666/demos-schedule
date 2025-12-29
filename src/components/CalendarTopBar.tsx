import React from 'react';
import { SettingsModal } from './SettingsModal';

export const CalendarTopBar: React.FC = () => {
    return (
        <div className="fixed top-[9px] right-4 z-[60] flex items-center h-11 px-1.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10">
            <button className="h-8 w-10 flex items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <SettingsModal />
        </div>
    );
};
