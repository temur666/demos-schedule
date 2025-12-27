import React from 'react';

const CalendarDayView: React.FC = () => {
    return (
        <div className="flex-1 relative overflow-y-auto hide-scrollbar bg-white dark:bg-black">
            <div className="relative w-full pb-32">
                {/* All Day Section */}
                <div className="border-b border-gray-100 dark:border-white/10">
                    <div className="flex min-h-[40px] relative">
                        <div className="w-16 flex-shrink-0 border-r border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-gray-400">all-day</span>
                        </div>
                        <div className="flex-1 p-1">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 border-l-[3px] border-indigo-500 rounded px-2 py-1 mb-1">
                                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Quarterly Goals Review</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Time Indicator */}
                <div className="absolute w-full z-20 pointer-events-none" style={{ top: '645px' }}>
                    <div className="flex items-center">
                        <div className="w-16 flex justify-end pr-2">
                            <span className="text-[10px] font-bold text-red-500">10:15</span>
                        </div>
                        <div className="relative flex-1">
                            <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-red-500 border-2 border-white dark:border-black"></div>
                            <div className="h-[1px] w-full bg-red-500"></div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="flex flex-col">
                        {[
                            "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
                            "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
                            "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
                        ].map((time, index) => (
                            <div key={index} className="flex h-[60px] relative group">
                                <div className="w-16 flex-shrink-0 flex justify-end pr-3 pt-2 text-[11px] font-medium text-gray-400 select-none">
                                    {time}
                                </div>
                                <div className="flex-1 border-t border-gray-100 dark:border-white/10 relative">
                                    {/* Events */}
                                    {time === "9 AM" && (
                                        <div className="absolute top-[1px] left-1 right-2 h-[58px] rounded-md bg-blue-50 dark:bg-blue-900/20 border-l-[3px] border-blue-500 p-2 cursor-pointer hover:brightness-95 transition-all">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <span className="text-xs font-semibold text-blue-900 dark:text-blue-100 leading-tight">Team Standup</span>
                                                <span className="text-[10px] text-blue-700 dark:text-blue-300 mt-0.5">Zoom • Room A</span>
                                            </div>
                                        </div>
                                    )}
                                    {time === "10 AM" && (
                                        <div className="absolute top-[1px] left-1 right-2 h-[88px] z-10 rounded-md bg-green-50 dark:bg-green-900/20 border-l-[3px] border-green-500 p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <span className="text-xs font-semibold text-green-900 dark:text-green-100 leading-tight">Design Sync</span>
                                                <span className="text-[10px] text-green-700 dark:text-green-300 mt-0.5">Creative Studio</span>
                                                <span className="text-[10px] text-green-600 dark:text-green-400/80 mt-auto">10:00 AM - 11:30 AM</span>
                                            </div>
                                        </div>
                                    )}
                                    {time === "12 PM" && (
                                        <div className="absolute top-[1px] left-1 right-12 h-[58px] rounded-md bg-gray-100 dark:bg-gray-800 border-l-[3px] border-gray-400 p-2 cursor-pointer hover:brightness-95 transition-all">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-tight">Lunch w/ Team</span>
                                                <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Cafeteria</span>
                                            </div>
                                        </div>
                                    )}
                                    {time === "2 PM" && (
                                        <div className="flex absolute inset-x-0 top-0 h-full pl-1 pr-2 gap-1">
                                            <div className="flex-1 relative">
                                                <div className="absolute top-[1px] inset-x-0 h-[58px] rounded-md bg-orange-50 dark:bg-orange-900/20 border-l-[3px] border-orange-500 p-2 cursor-pointer hover:brightness-95 transition-all">
                                                    <div className="flex flex-col h-full overflow-hidden">
                                                        <span className="text-[10px] font-semibold text-orange-900 dark:text-orange-100 leading-tight truncate">Client Call</span>
                                                        <span className="text-[9px] text-orange-700 dark:text-orange-300">Remote</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 relative">
                                                <div className="absolute top-[30px] inset-x-0 h-[58px] z-10 rounded-md bg-purple-50 dark:bg-purple-900/20 border-l-[3px] border-purple-500 p-2 cursor-pointer hover:brightness-95 transition-all shadow-sm">
                                                    <div className="flex flex-col h-full overflow-hidden">
                                                        <span className="text-[10px] font-semibold text-purple-900 dark:text-purple-100 leading-tight truncate">Dev Huddle</span>
                                                        <span className="text-[9px] text-purple-700 dark:text-purple-300">Room 304</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {time === "3 PM" && (
                                        <div className="absolute top-[1px] left-1 right-2 h-[58px] rounded-md bg-cyan-50 dark:bg-cyan-900/20 border-l-[3px] border-cyan-500 p-2 cursor-pointer hover:brightness-95 transition-all">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <span className="text-xs font-semibold text-cyan-900 dark:text-cyan-100 leading-tight">Dentist Appt</span>
                                                <span className="text-[10px] text-cyan-700 dark:text-cyan-300 mt-0.5">Downtown</span>
                                            </div>
                                        </div>
                                    )}
                                    {time === "5 PM" && (
                                        <div className="absolute top-[30px] left-1 right-2 h-[90px] rounded-md bg-rose-50 dark:bg-rose-900/20 border-l-[3px] border-rose-500 p-2 cursor-pointer hover:brightness-95 transition-all">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <span className="text-xs font-semibold text-rose-900 dark:text-rose-100 leading-tight">Gym Session</span>
                                                <span className="text-[10px] text-rose-700 dark:text-rose-300 mt-0.5">Local Gym</span>
                                                <span className="text-[10px] text-rose-600 dark:text-rose-400/80 mt-auto">5:30 PM - 7:00 PM</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarDayView;
