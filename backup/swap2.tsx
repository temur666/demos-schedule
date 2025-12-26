// import { useState, useRef, useEffect } from 'react'
// import './App.css'

// // Sidebar states: 'closed' | 'peek' | 'full'
// type SidebarState = 'closed' | 'peek' | 'full'

// function App() {
//     const [sidebarState, setSidebarState] = useState<SidebarState>('closed')
//     const [isDragging, setIsDragging] = useState(false)
//     const [startX, setStartX] = useState(0)
//     const [currentX, setCurrentX] = useState(0)
//     const phoneRef = useRef<HTMLDivElement>(null)

//     const PEEK_WIDTH = 60 // pixels for peek mode
//     const FULL_WIDTH = 280 // pixels for full sidebar
//     const PEEK_THRESHOLD = 20 // pixels to trigger peek mode
//     const FULL_THRESHOLD = 150 // pixels to trigger full mode

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

//         if (sidebarState === 'closed') {
//             // From closed: right swipe to peek or full
//             if (diff > FULL_THRESHOLD) {
//                 setSidebarState('full')
//             } else if (diff > PEEK_THRESHOLD) {
//                 setSidebarState('peek')
//             }
//         } else if (sidebarState === 'peek') {
//             // From peek: right swipe to full, left swipe to close
//             if (diff > FULL_THRESHOLD - PEEK_WIDTH) {
//                 setSidebarState('full')
//             } else if (diff < -PEEK_THRESHOLD) {
//                 setSidebarState('closed')
//             }
//         } else if (sidebarState === 'full') {
//             // From full: left swipe to close
//             if (diff < -PEEK_THRESHOLD) {
//                 setSidebarState('closed')
//             }
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
//             // Static positions based on state
//             if (sidebarState === 'closed') return 'translateX(-100%)'
//             if (sidebarState === 'peek') return `translateX(-${FULL_WIDTH - PEEK_WIDTH}px)`
//             if (sidebarState === 'full') return 'translateX(0)'
//         }

//         // During drag: calculate real-time position
//         const diff = currentX - startX
//         let basePosition = 0

//         if (sidebarState === 'closed') {
//             basePosition = -FULL_WIDTH
//         } else if (sidebarState === 'peek') {
//             basePosition = -(FULL_WIDTH - PEEK_WIDTH)
//         } else if (sidebarState === 'full') {
//             basePosition = 0
//         }

//         const newPosition = Math.max(-FULL_WIDTH, Math.min(0, basePosition + diff))
//         return `translateX(${newPosition}px)`
//     }

//     // Calculate main content transform (for squeeze effect in peek mode)
//     const getMainContentTransform = () => {
//         if (!isDragging) {
//             // In peek or full mode, push content to the right by PEEK_WIDTH
//             if (sidebarState === 'peek' || sidebarState === 'full') {
//                 return `translateX(${PEEK_WIDTH}px)`
//             }
//             return 'translateX(0)'
//         }

//         // During drag: calculate real-time position
//         const diff = currentX - startX
//         let offset = 0

//         if (sidebarState === 'closed' && diff > 0) {
//             // Dragging right from closed: gradually push content
//             offset = Math.min(PEEK_WIDTH, diff)
//         } else if (sidebarState === 'peek') {
//             // In peek mode: adjust based on drag
//             if (diff > 0) {
//                 // Dragging right: content stays at PEEK_WIDTH
//                 offset = PEEK_WIDTH
//             } else {
//                 // Dragging left: gradually reduce offset
//                 offset = Math.max(0, PEEK_WIDTH + diff)
//             }
//         } else if (sidebarState === 'full') {
//             // In full mode: content stays at PEEK_WIDTH
//             offset = PEEK_WIDTH
//         }

//         return `translateX(${offset}px)`
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
//                         <div
//                             className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-100 transition-transform"
//                             style={{
//                                 transform: getMainContentTransform(),
//                                 transitionDuration: isDragging ? '0ms' : '300ms',
//                                 pointerEvents: sidebarState === 'full' ? 'none' : 'auto' // Disable interaction in full mode
//                             }}
//                         >
//                             {/* Header */}
//                             <div className="bg-white shadow-sm p-4 flex items-center gap-3">
//                                 <button
//                                     onClick={() => {
//                                         // Cycle through states: closed -> peek -> full -> closed
//                                         if (sidebarState === 'closed') setSidebarState('peek')
//                                         else if (sidebarState === 'peek') setSidebarState('full')
//                                         else setSidebarState('closed')
//                                     }}
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
//                                         📱 Two-Stage Sidebar
//                                     </h2>
//                                     <p className="text-gray-600 mb-4">
//                                         This sidebar has two modes:
//                                     </p>
//                                     <div className="space-y-2 text-sm mb-4">
//                                         <div className="flex items-start gap-2">
//                                             <span className="text-lg">👀</span>
//                                             <div>
//                                                 <strong className="text-indigo-700">Peek Mode ({PEEK_WIDTH}px):</strong>
//                                                 <p className="text-gray-600">Content is squeezed by {PEEK_WIDTH}px but still interactive. Swipe left to close.</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-start gap-2">
//                                             <span className="text-lg">📖</span>
//                                             <div>
//                                                 <strong className="text-purple-700">Full Mode ({FULL_WIDTH}px):</strong>
//                                                 <p className="text-gray-600">Sidebar fully open with overlay. Content is blocked.</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-2 text-sm flex-wrap">
//                                         <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
//                                             Swipe {PEEK_THRESHOLD}px → Peek
//                                         </span>
//                                         <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
//                                             Swipe {FULL_THRESHOLD}px → Full
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

//                         {/* Overlay when sidebar is in full mode */}
//                         {sidebarState === 'full' && (
//                             <div
//                                 className="absolute inset-0 bg-black/30 z-[5] transition-opacity"
//                                 onClick={() => setSidebarState('closed')}
//                             />
//                         )}

//                         {/* Swipe Indicator */}
//                         {isDragging && (
//                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-6 py-3 rounded-full font-medium z-50 pointer-events-none">
//                                 {(() => {
//                                     const diff = currentX - startX
//                                     const direction = diff > 0 ? '→' : '←'
//                                     const absDistance = Math.abs(diff)

//                                     let targetState = ''
//                                     if (sidebarState === 'closed' && diff > 0) {
//                                         targetState = absDistance > FULL_THRESHOLD ? 'Full' : absDistance > PEEK_THRESHOLD ? 'Peek' : 'Closed'
//                                     } else if (sidebarState === 'peek') {
//                                         if (diff > 0) {
//                                             targetState = absDistance > FULL_THRESHOLD - PEEK_WIDTH ? 'Full' : 'Peek'
//                                         } else {
//                                             targetState = absDistance > PEEK_THRESHOLD ? 'Closed' : 'Peek'
//                                         }
//                                     } else if (sidebarState === 'full' && diff < 0) {
//                                         targetState = absDistance > PEEK_THRESHOLD ? 'Closed' : 'Full'
//                                     }

//                                     return `${direction} ${Math.round(absDistance)}px → ${targetState}`
//                                 })()}
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
//                         Peek: {PEEK_THRESHOLD}px | Full: {FULL_THRESHOLD}px
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default App
