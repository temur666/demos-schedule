import React from 'react';
import { SettingsModal } from './SettingsModal';

export const CalendarTopBar: React.FC = () => {
    return (
        <div className="fixed top-[9px] right-4 z-[60] flex items-center gap-3">
            <button className="size-11 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <SettingsModal />
        </div>
    );
};
