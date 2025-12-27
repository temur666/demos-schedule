import React from 'react';

const CalendarGridView: React.FC = () => {
    return (
        <main className="flex-1 p-0 pb-32">
            {/* Week 1 */}
            <div className="mb-0">
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Week 1</span>
                    <span className="h-px flex-1 bg-gray-200 dark:bg-white/10"></span>
                </div>
                <div className="grid grid-cols-3 gap-px bg-gray-100 dark:bg-white/10 border-b border-gray-100 dark:border-white/10">
                    <div className="col-span-2 relative bg-gray-50 dark:bg-white/5 min-h-[140px] p-4 flex flex-col justify-start group hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-gray-400 text-sm">edit_note</span>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weekly Planning (本周的规划)</span>
                        </div>
                        <div className="flex-1 border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-3 py-1">
                            <p className="text-[10px] text-gray-400 italic">Tap to add goals or notes for the week...</p>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Mon</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">1</span>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Tue</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">2</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-gray-300 dark:border-gray-600">
                                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 truncate block">Check-in</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase">Wed</span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold shadow-sm">3</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-green-500">
                                <span className="text-[9px] font-bold text-gray-900 dark:text-white truncate block">Design Sync</span>
                                <span className="text-[8px] text-gray-400 block">10:00 AM</span>
                            </div>
                            <div className="w-full pl-2 py-0.5 border-l-2 border-gray-200 dark:border-gray-700">
                                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 truncate block">Lunch w/ Team</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
                            <div
                                className="w-full h-full bg-cover bg-center grayscale"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7QQqzc0YwptWRBfk_rRdTM6nZZIGMMNaBxKissmWO0f4IzC1kyTnK3A-R_gY8Wyxmu38Sti6C9q7EnRh9RTq8MkGwL4bEwlrYI-RCeDyy13X9EYAmWEKUniaYzo8P0TRV1MYqMvgTNqFZzrSGix_geZ_Ja0hqdjLf4bl4m6OakS63RuZ_etiqltFXtJbWUOUW5IZJupB0XAgfNbnVFxmdNyUUl-VI7P1Xuo6_ZjlngFTT4HfRKNwcHpJtz__ushAs0q1QuB1d9R0")' }}
                            ></div>
                        </div>
                        <div className="relative z-10 flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Thu</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">4</span>
                        </div>
                        <div className="relative z-10 flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-blue-400">
                                <span className="text-[9px] font-medium text-gray-700 dark:text-gray-300 truncate block">Dentist Appt</span>
                                <span className="text-[8px] text-gray-400 block">3:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Fri</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">5</span>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Sat</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">6</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-purple-400">
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 truncate block">Yoga Class</span>
                            </div>
                            <div className="w-full pl-2 py-0.5 border-l-2 border-pink-400">
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 truncate block">Dinner</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Sun</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">7</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-orange-400">
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 truncate block">Brunch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Week 2 */}
            <div className="mb-0">
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Week 2</span>
                    <span className="h-px flex-1 bg-gray-200 dark:bg-white/10"></span>
                </div>
                <div className="grid grid-cols-3 gap-px bg-gray-100 dark:bg-white/10 border-b border-gray-100 dark:border-white/10">
                    <div className="col-span-2 relative bg-gray-50 dark:bg-white/5 min-h-[140px] p-4 flex flex-col justify-start group hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-gray-400 text-sm">edit_note</span>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weekly Planning (本周的规划)</span>
                        </div>
                        <div className="flex-1 border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-3 py-1">
                            <p className="text-[10px] text-gray-400 italic">No goals set for this week yet.</p>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Mon</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">8</span>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Tue</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">9</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-black dark:border-white">
                                <span className="text-[9px] font-medium text-gray-900 dark:text-white truncate block">Project Review</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF2prPbDSfJmmlq6iiUbuv6Hap22sKIa8yfAbEMd6ioJyI8KxoBDqr-D-v5VJPL0A4pB23yC2J1G2z66HgQAOxcVi2rI4wtQ5-OKlurSxY4RS_S2a-s84gsVpgbsnZL2sSX55xzOn3JzSS_6G2NNcCEzZpkCFruR-wx74g-adiJnR2wlXPCE28yQ38in1GqO6mr1Y7NoWhhbqDWfmfht_DnDvWjLoHhX3Ny7Asct0udGA3KkMqFgI8TghqzbOl2zFS9iafWPChdUw")' }}
                            ></div>
                        </div>
                        <div className="relative z-10 flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Wed</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">10</span>
                        </div>
                        <div className="relative z-10 flex flex-col gap-1.5">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-gray-900 dark:border-white">
                                <span className="text-[9px] font-bold text-gray-900 dark:text-white truncate block">Design Sprint</span>
                            </div>
                            <div className="w-full pl-2 py-0.5 border-l-2 border-gray-300 dark:border-gray-600">
                                <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 truncate block">Client Call</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Thu</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">11</span>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Fri</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">12</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-gray-400">
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 truncate block">Release v2.1</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Sat</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">13</span>
                        </div>
                    </div>
                    <div className="relative bg-white dark:bg-black min-h-[140px] p-3 flex flex-col group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase">Sun</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">14</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-full pl-2 py-0.5 border-l-2 border-indigo-400">
                                <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300 truncate block">Family Lunch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CalendarGridView;
