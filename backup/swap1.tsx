// import { useState, useRef, useEffect } from 'react'
// import './App.css'

// function App() {
//     const [sidebarOpen, setSidebarOpen] = useState(false)
//     const [isDragging, setIsDragging] = useState(false)
//     const [startX, setStartX] = useState(0)
//     const [currentX, setCurrentX] = useState(0)
//     const phoneRef = useRef<HTMLDivElement>(null)

//     const SWIPE_THRESHOLD = 50 // pixels needed to trigger swipe

//     const handleMouseDown = (e: React.MouseEvent) => {
//         setIsDragging(true)
//         setStartX(e.clientX)
//         setCurrentX(e.clientX)
//     }

//     const handleMouseMove = (e: React.MouseEvent) => {
//         if (!isDragging) return
//         setCurrentX(e.clientX)
//     }

//     const handleMouseUp = () => {
//         if (!isDragging) return

//         const diff = currentX - startX

//         // Swipe right to open sidebar
//         if (diff > SWIPE_THRESHOLD && !sidebarOpen) {
//             setSidebarOpen(true)
//         }
//         // Swipe left to close sidebar
//         else if (diff < -SWIPE_THRESHOLD && sidebarOpen) {
//             setSidebarOpen(false)
//         }

//         setIsDragging(false)
//         setStartX(0)
//         setCurrentX(0)
//     }

//     const handleMouseLeave = () => {
//         if (isDragging) {
//             setIsDragging(false)
//             setStartX(0)
//             setCurrentX(0)
//         }
//     }

//     // Calculate sidebar position during drag
//     const getSidebarTransform = () => {
//         if (!isDragging) {
//             return sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
//         }

//         const diff = currentX - startX
//         const basePosition = sidebarOpen ? 0 : -280 // sidebar width is 280px
//         const newPosition = Math.max(-280, Math.min(0, basePosition + diff))

//         return `translateX(${newPosition}px)`
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
//             {/* Phone Container */}
//             <div className="relative">
//                 {/* Phone Frame */}
//                 <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
//                     {/* Phone Notch */}
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20"></div>

//                     {/* Phone Screen */}
//                     <div
//                         ref={phoneRef}
//                         className="relative w-[375px] h-[667px] bg-white rounded-[2.5rem] overflow-hidden cursor-grab active:cursor-grabbing select-none"
//                         onMouseDown={handleMouseDown}
//                         onMouseMove={handleMouseMove}
//                         onMouseUp={handleMouseUp}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         {/* Sidebar */}
//                         <div
//                             className="absolute top-0 left-0 h-full w-[280px] bg-gradient-to-b from-indigo-600 to-purple-700 shadow-2xl z-10 transition-transform"
//                             style={{
//                                 transform: getSidebarTransform(),
//                                 transitionDuration: isDragging ? '0ms' : '300ms'
//                             }}
//                         >
//                             <div className="p-6 text-white">
//                                 <div className="flex items-center gap-3 mb-8 mt-8">
//                                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                                         <span className="text-2xl">👤</span>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-bold text-lg">John Doe</h3>
//                                         <p className="text-sm text-white/70">john@example.com</p>
//                                     </div>
//                                 </div>

//                                 <nav className="space-y-2">
//                                     {['Home', 'Profile', 'Messages', 'Settings', 'Notifications', 'Help'].map((item, index) => (
//                                         <button
//                                             key={item}
//                                             className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
//                                             onClick={(e) => e.stopPropagation()}
//                                         >
//                                             <span className="text-xl">
//                                                 {['🏠', '👤', '💬', '⚙️', '🔔', '❓'][index]}
//                                             </span>
//                                             <span className="font-medium">{item}</span>
//                                         </button>
//                                     ))}
//                                 </nav>

//                                 <div className="absolute bottom-6 left-6 right-6">
//                                     <button
//                                         className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium"
//                                         onClick={(e) => e.stopPropagation()}
//                                     >
//                                         🚪 Logout
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content */}
//                         <div className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-100">
//                             {/* Header */}
//                             <div className="bg-white shadow-sm p-4 flex items-center gap-3">
//                                 <button
//                                     onClick={() => setSidebarOpen(!sidebarOpen)}
//                                     className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
//                                 >
//                                     <div className="space-y-1.5">
//                                         <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
//                                         <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
//                                         <div className="w-6 h-0.5 bg-gray-700 rounded"></div>
//                                     </div>
//                                 </button>
//                                 <h1 className="text-xl font-bold text-gray-800">Phone Demo</h1>
//                             </div>

//                             {/* Content Area */}
//                             <div className="p-6 space-y-4">
//                                 <div className="bg-white rounded-2xl p-6 shadow-lg">
//                                     <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                         📱 Swipe to Navigate
//                                     </h2>
//                                     <p className="text-gray-600 mb-4">
//                                         Try swiping right to open the sidebar, or left to close it!
//                                     </p>
//                                     <div className="flex gap-2 text-sm">
//                                         <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
//                                             Swipe Right →
//                                         </span>
//                                         <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
//                                             ← Swipe Left
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Demo Cards */}
//                                 {[1, 2, 3].map((i) => (
//                                     <div key={i} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
//                                         <div className="flex items-center gap-3 mb-3">
//                                             <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                                                 {i}
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-bold text-gray-800">Card Title {i}</h3>
//                                                 <p className="text-sm text-gray-500">Subtitle here</p>
//                                             </div>
//                                         </div>
//                                         <p className="text-gray-600 text-sm">
//                                             This is a demo card showing how the content area looks with the sidebar interaction.
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Overlay when sidebar is open */}
//                         {sidebarOpen && (
//                             <div
//                                 className="absolute inset-0 bg-black/30 z-[5] transition-opacity"
//                                 onClick={() => setSidebarOpen(false)}
//                             />
//                         )}

//                         {/* Swipe Indicator */}
//                         {isDragging && (
//                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-6 py-3 rounded-full font-medium z-50 pointer-events-none">
//                                 {currentX - startX > 0 ? '→ Swipe Right' : '← Swipe Left'}
//                             </div>
//                         )}
//                     </div>

//                     {/* Home Indicator (iPhone style) */}
//                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
//                 </div>

//                 {/* Instructions */}
//                 <div className="mt-8 text-center text-white/80 max-w-md">
//                     <p className="text-sm">
//                         🖱️ <strong>Click and drag</strong> on the phone screen to simulate touch swipe gestures
//                     </p>
//                     <p className="text-xs mt-2 text-white/60">
//                         Swipe threshold: {SWIPE_THRESHOLD}px
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default App
