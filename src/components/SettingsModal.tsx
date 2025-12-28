import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useSettingsStore } from '../stores/useSettingsStore';

export function SettingsModal() {
    const { weekStart, toggleWeekStart } = useSettingsStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="size-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:scale-105 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[24px]">settings</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>设置</DialogTitle>
                </DialogHeader>
                <div className="py-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">一周开头：</span>
                        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                            <Button
                                variant={weekStart === 1 ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => toggleWeekStart(1)}
                                className="rounded-md px-4 h-8 text-xs"
                            >
                                周一
                            </Button>
                            <Button
                                variant={weekStart === 0 ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => toggleWeekStart(0)}
                                className="rounded-md px-4 h-8 text-xs"
                            >
                                周日
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
