
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useSettingsStore } from '../stores/useSettingsStore';

export function SettingsModal() {
    const { weekStart, setWeekStart, isDarkMode, toggleDarkMode, autoFollowSystem, setAutoFollowSystem } = useSettingsStore();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="h-8 w-10 flex items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[22px]">settings</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>设置</DialogTitle>
                </DialogHeader>
                <div className="py-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">外观模式：</span>
                        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg gap-1">
                            <Button
                                variant={!isDarkMode && !autoFollowSystem ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => {
                                    if (isDarkMode || autoFollowSystem) {
                                        setAutoFollowSystem(false);
                                        if (isDarkMode) toggleDarkMode();
                                    }
                                }}
                                className="rounded-md px-3 h-8 text-xs"
                            >
                                浅色
                            </Button>
                            <Button
                                variant={isDarkMode && !autoFollowSystem ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => {
                                    if (!isDarkMode || autoFollowSystem) {
                                        setAutoFollowSystem(false);
                                        if (!isDarkMode) toggleDarkMode();
                                    }
                                }}
                                className="rounded-md px-3 h-8 text-xs"
                            >
                                深色
                            </Button>
                            <Button
                                variant={autoFollowSystem ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setAutoFollowSystem(true)}
                                className="rounded-md px-3 h-8 text-xs"
                            >
                                跟随系统
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">一周开头：</span>
                        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                            <Button
                                variant={weekStart === 1 ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setWeekStart(1)}
                                className="rounded-md px-4 h-8 text-xs"
                            >
                                周一
                            </Button>
                            <Button
                                variant={weekStart === 0 ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setWeekStart(0)}
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
