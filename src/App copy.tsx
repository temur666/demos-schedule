// import './App.css'

// export default function App() {
//   return (
//     <div className="dark min-h-screen bg-gray-100 dark:bg-neutral-950 flex items-center justify-center p-4">
//       {/* iPhone 16 Pro Max Container */}
//       <div className="relative w-[440px] h-[956px] bg-background-light dark:bg-background-dark rounded-[55px] shadow-[0_0_0_12px_#1f2937,0_0_0_14px_#374151,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-[1px] border-white/10">
//         {/* Status Bar Area (Dynamic Island Placeholder) */}
//         <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 flex items-center justify-center">
//           <div className="w-12 h-1 bg-white/10 rounded-full"></div>
//         </div>

//         <div className="h-full w-full flex flex-col overflow-y-auto no-scrollbar relative">
//           <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 pt-10 pb-4 border-b border-gray-200 dark:border-white/5">
//             <div className="flex items-center justify-between mb-4">
//               <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
//                 <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: '24px' }}>search</span>
//               </button>
//               <div className="flex items-center gap-1">
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Viewing</span>
//                 <button className="flex items-center gap-1 rounded-full bg-white dark:bg-white/10 px-3 py-1 text-sm font-bold shadow-sm">
//                   October 2023
//                   <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>expand_more</span>
//                 </button>
//               </div>
//               <button className="flex size-10 items-center justify-center rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
//                 <div
//                   className="size-full bg-cover bg-center"
//                   style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB31Yr33XMic1Ymy_L4WodOwMOW2iaAArSmNluP-jlvzSV4e5sLf14xg9MnxJzNJrbNQqkgSfTorVLKkNvr5Il3VGmtjQku9xZYDMg078yY0RRMcmuDMof3lGXPrQg26W5x8liYc-7DnpDKOsh6dE2a9RIIB3bXDMEwzTri1ix_NyTqO4QwNBfplBYDoVPCN59XkCEIVQI3Kcj3zq0mk68FCVLCCvD2vetfPppb9_8RVHb06sh1lPqT1T73CN1AV54JJl38k1l6PQs")' }}
//                 />
//               </button>
//             </div>
//             <div className="flex justify-between px-2 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
//               <div className="w-[32%] text-center">Mon</div>
//               <div className="w-[32%] text-center">Tue</div>
//               <div className="w-[32%] text-center">Wed</div>
//             </div>
//           </header>

//           <main className="flex-1 px-4 py-2 pb-32">
//             <div className="mb-6">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white px-2 mb-3 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
//                 Week 1
//               </h3>
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] opacity-50 border border-transparent">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-semibold text-gray-400 uppercase">Mon</span>
//                     <span className="text-lg font-bold text-gray-400">1</span>
//                   </div>
//                   <div className="mt-1 flex-1"></div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] opacity-50 border border-transparent">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-semibold text-gray-400 uppercase">Tue</span>
//                     <span className="text-lg font-bold text-gray-400">2</span>
//                   </div>
//                   <div className="mt-1 flex flex-col gap-1">
//                     <div className="w-full bg-gray-200 dark:bg-white/10 rounded px-1 py-0.5">
//                       <span className="text-[8px] font-medium text-gray-500 dark:text-gray-400 truncate block">Check-in</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-primary text-background-dark p-2 aspect-[4/5] shadow-[0_0_20px_rgba(54,226,123,0.3)] transform scale-105 z-10">
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-bold uppercase opacity-80">Wed</span>
//                     <span className="text-xl font-extrabold leading-none">3</span>
//                   </div>
//                   <div className="flex-1 flex flex-col gap-1 overflow-hidden">
//                     <div className="bg-background-dark text-primary rounded px-1.5 py-1 shadow-sm border-l-2 border-white/20">
//                       <span className="text-[9px] font-bold block truncate">Design Sync</span>
//                       <span className="text-[8px] opacity-80 block">10:00 AM</span>
//                     </div>
//                     <div className="bg-white/30 rounded px-1.5 py-1">
//                       <span className="text-[9px] font-bold block truncate text-background-dark">Lunch w/ Team</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
//                     <div
//                       className="w-full h-full bg-cover bg-center"
//                       style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7QQqzc0YwptWRBfk_rRdTM6nZZIGMMNaBxKissmWO0f4IzC1kyTnK3A-R_gY8Wyxmu38Sti6C9q7EnRh9RTq8MkGwL4bEwlrYI-RCeDyy13X9EYAmWEKUniaYzo8P0TRV1MYqMvgTNqFZzrSGix_geZ_Ja0hqdjLf4bl4m6OakS63RuZ_etiqltFXtJbWUOUW5IZJupB0XAgfNbnVFxmdNyUUl-VI7P1Xuo6_ZjlngFTT4HfRKNwcHpJtz__ushAs0q1QuB1d9R0")' }}
//                     />
//                   </div>
//                   <div className="relative z-10 flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Thu</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">4</span>
//                   </div>
//                   <div className="relative z-10 flex flex-col gap-1">
//                     <div className="bg-blue-100/90 dark:bg-blue-900/40 rounded px-1.5 py-1 border-l-2 border-blue-500 backdrop-blur-sm">
//                       <span className="text-[9px] font-bold text-blue-900 dark:text-blue-100 truncate block">Dentist Appt</span>
//                       <span className="text-[7px] text-blue-800 dark:text-blue-200 block">3:00 PM</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Fri</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">5</span>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-primary uppercase">Sat</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">6</span>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5 border-l-2 border-purple-500">
//                       <span className="text-[8px] font-medium text-purple-900 dark:text-purple-200 truncate block">Yoga Class</span>
//                     </div>
//                     <div className="bg-pink-100 dark:bg-pink-900/30 rounded px-1 py-0.5 border-l-2 border-pink-500">
//                       <span className="text-[8px] font-medium text-pink-900 dark:text-pink-200 truncate block">Dinner</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white px-2 mb-3 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
//                 Week 2
//               </h3>
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-primary uppercase">Sun</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">7</span>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <div className="bg-orange-100 dark:bg-orange-900/30 rounded px-1 py-0.5 border-l-2 border-orange-500">
//                       <span className="text-[8px] font-medium text-orange-900 dark:text-orange-200 truncate block">Brunch</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Mon</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">8</span>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Tue</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">9</span>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <div className="bg-primary/10 rounded px-1 py-0.5 border-l-2 border-primary">
//                       <span className="text-[8px] font-medium text-gray-900 dark:text-primary truncate block">Project Review</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="absolute inset-0 rounded-xl overflow-hidden opacity-30">
//                     <div
//                       className="w-full h-full bg-cover bg-center"
//                       style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF2prPbDSfJmmlq6iiUbuv6Hap22sKIa8yfAbEMd6ioJyI8KxoBDqr-D-v5VJPL0A4pB23yC2J1G2z66HgQAOxcVi2rI4wtQ5-OKlurSxY4RS_S2a-s84gsVpgbsnZL2sSX55xzOn3JzSS_6G2NNcCEzZpkCFruR-wx74g-adiJnR2wlXPCE28yQ38in1GqO6mr1Y7NoWhhbqDWfmfht_DnDvWjLoHhX3Ny7Asct0udGA3KkMqFgI8TghqzbOl2zFS9iafWPChdUw")' }}
//                     />
//                   </div>
//                   <div className="relative z-10 flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Wed</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">10</span>
//                   </div>
//                   <div className="relative z-10 flex flex-col gap-1">
//                     <div className="bg-white/20 backdrop-blur-md rounded px-1 py-0.5">
//                       <span className="text-[8px] font-bold text-white truncate block">Design Sprint</span>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-md rounded px-1 py-0.5">
//                       <span className="text-[8px] font-medium text-white/80 truncate block">Client Call</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Thu</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">11</span>
//                   </div>
//                 </div>
//                 <div className="group relative flex flex-col rounded-xl bg-white dark:bg-white/5 p-2 aspect-[4/5] border border-gray-100 dark:border-white/10 hover:border-primary/50 transition-colors">
//                   <div className="flex justify-between items-start mb-1">
//                     <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Fri</span>
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">12</span>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <div className="bg-primary/5 rounded px-1 py-0.5 border border-primary/20">
//                       <span className="text-[8px] font-medium text-gray-600 dark:text-gray-300 truncate block">Release v2.1</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>

//           <button className="absolute bottom-28 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_4px_20px_rgba(54,226,123,0.4)] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all">
//             <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>add</span>
//           </button>

//           <nav className="absolute bottom-0 left-0 right-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-white/5 px-6 pb-8 pt-3">
//             <div className="flex items-center justify-around">
//               <button className="flex flex-col items-center gap-1 text-primary">
//                 <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: '"FILL" 1' }}>calendar_view_month</span>
//                 <span className="text-[10px] font-bold">Month</span>
//               </button>
//               <button className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>view_week</span>
//                 <span className="text-[10px] font-medium">Week</span>
//               </button>
//               <button className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>schedule</span>
//                 <span className="text-[10px] font-medium">Day</span>
//               </button>
//               <button className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>settings</span>
//                 <span className="text-[10px] font-medium">Settings</span>
//               </button>
//             </div>
//             {/* Home Indicator */}
//             <div className="mt-4 flex justify-center">
//               <div className="w-32 h-1.5 bg-gray-300 dark:bg-white/20 rounded-full"></div>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </div>
//   )
// }
