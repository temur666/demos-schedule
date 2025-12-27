import React from 'react';

const CalendarAgendaView: React.FC = () => {
    return (
        <main className="flex-1 p-0 pb-32">
            <div className="relative">
                <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-[#111]/95 backdrop-blur-md px-6 py-3 border-y border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Wednesday</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Oct 3</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20 px-2 py-1 rounded-full">Today</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                    <div className="absolute left-[4.5rem] top-4 bottom-4 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                    <div className="relative flex gap-4 group z-10">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">10:00</span>
                            <span className="text-[10px] text-gray-400">AM</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Design Sync</h3>
                                <div className="flex -space-x-1.5">
                                    <img className="size-5 rounded-full border border-white dark:border-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB31Yr33XMic1Ymy_L4WodOwMOW2iaAArSmNluP-jlvzSV4e5sLf14xg9MnxJzNJrbNQqkgSfTorVLKkNvr5Il3VGmtjQku9xZYDMg078yY0RRMcmuDMof3lGXPrQg26W5x8liYc-7DnpDKOsh6dE2a9RIIB3bXDMEwzTri1ix_NyTqO4QwNBfplBYDoVPCN59XkCEIVQI3Kcj3zq0mk68FCVLCCvD2vetfPppb9_8RVHb06sh1lPqT1T73CN1AV54JJl38k1l6PQs" alt="User" />
                                    <img className="size-5 rounded-full border border-white dark:border-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF2prPbDSfJmmlq6iiUbuv6Hap22sKIa8yfAbEMd6ioJyI8KxoBDqr-D-v5VJPL0A4pB23yC2J1G2z66HgQAOxcVi2rI4wtQ5-OKlurSxY4RS_S2a-s84gsVpgbsnZL2sSX55xzOn3JzSS_6G2NNcCEzZpkCFruR-wx74g-adiJnR2wlXPCE28yQ38in1GqO6mr1Y7NoWhhbqDWfmfht_DnDvWjLoHhX3Ny7Asct0udGA3KkMqFgI8TghqzbOl2zFS9iafWPChdUw" alt="User" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Weekly design team standup</p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <span className="material-symbols-outlined text-[14px]">videocam</span>
                                <span>Google Meet</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex gap-4 group z-10">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">12:30</span>
                            <span className="text-[10px] text-gray-400">PM</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600"></div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Lunch w/ Team</h3>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                <span>Sweetgreen</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex gap-4 group opacity-40 hover:opacity-100 transition-opacity">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-2">
                            <span className="text-xs font-medium text-gray-400">2:00</span>
                        </div>
                        <div className="flex-1 py-2 border-t border-dashed border-gray-200 dark:border-white/10"></div>
                    </div>
                </div>
            </div>
            <div className="relative mt-2">
                <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-[#111]/95 backdrop-blur-md px-6 py-3 border-y border-gray-100 dark:border-white/5 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Thursday</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Oct 4</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                    <div className="absolute left-[4.5rem] top-4 bottom-4 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                    <div className="relative flex gap-4 group z-10">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">3:00</span>
                            <span className="text-[10px] text-gray-400">PM</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md">
                            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
                                <div className="w-full h-full bg-cover bg-center grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7QQqzc0YwptWRBfk_rRdTM6nZZIGMMNaBxKissmWO0f4IzC1kyTnK3A-R_gY8Wyxmu38Sti6C9q7EnRh9RTq8MkGwL4bEwlrYI-RCeDyy13X9EYAmWEKUniaYzo8P0TRV1MYqMvgTNqFZzrSGix_geZ_Ja0hqdjLf4bl4m6OakS63RuZ_etiqltFXtJbWUOUW5IZJupB0XAgfNbnVFxmdNyUUl-VI7P1Xuo6_ZjlngFTT4HfRKNwcHpJtz__ushAs0q1QuB1d9R0")' }}></div>
                            </div>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Dentist Appointment</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Annual Checkup • Dr. Smith</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mt-2">
                <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-[#111]/95 backdrop-blur-md px-6 py-3 border-y border-gray-100 dark:border-white/5 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Friday</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Oct 5</span>
                </div>
                <div className="px-6 py-8 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">calendar_today</span>
                    </div>
                    <p className="text-xs font-medium text-gray-500">No events scheduled</p>
                </div>
            </div>
            <div className="relative mt-2">
                <div className="sticky top-0 z-10 bg-gray-50/95 dark:bg-[#111]/95 backdrop-blur-md px-6 py-3 border-y border-gray-100 dark:border-white/5 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Saturday</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Oct 6</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-900/20 px-2 py-1 rounded-full ml-auto">Weekend</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                    <div className="absolute left-[4.5rem] top-4 bottom-4 w-px bg-gray-100 dark:bg-white/5 -z-0"></div>
                    <div className="relative flex gap-4 group z-10">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">10:00</span>
                            <span className="text-[10px] text-gray-400">AM</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"></div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Yoga Class</h3>
                        </div>
                    </div>
                    <div className="relative flex gap-4 group z-10">
                        <div className="w-12 flex-shrink-0 flex flex-col items-end pt-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">7:00</span>
                            <span className="text-[10px] text-gray-400">PM</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer hover:shadow-md">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-400"></div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Dinner</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CalendarAgendaView;
