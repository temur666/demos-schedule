import { useEffect, useRef, useState } from 'react'
import './App.css'

type SidebarState = 'closed' | 'peek' | 'full'

const FULL_WIDTH = 280
const PEEK_WIDTH = 60

/* =========================
   物理层（可插拔）
========================= */

const ENABLE_PHYSICS = false

function applyPhysics(delta: number) {
  if (!ENABLE_PHYSICS) return delta
  return delta * 0.85 // 阻尼
}

/* ========================= */

const conversations = [
  { id: 1, name: 'Design Team', lastMsg: 'The new icons are ready!', time: '12:30', avatar: 'DT', color: 'from-pink-500 to-rose-500' },
  { id: 2, name: 'Product Sync', lastMsg: 'Let\'s review the roadmap.', time: '11:45', avatar: 'PS', color: 'from-amber-400 to-orange-500' },
  { id: 3, name: 'Engineering', lastMsg: 'PR #42 is merged.', time: '09:15', avatar: 'EN', color: 'from-emerald-400 to-teal-500' },
  { id: 4, name: 'Marketing', lastMsg: 'Campaign starts tomorrow.', time: 'Yesterday', avatar: 'MK', color: 'from-blue-400 to-indigo-500' },
  { id: 5, name: 'General', lastMsg: 'Welcome to the team!', time: '2 days ago', avatar: 'GE', color: 'from-purple-400 to-violet-500' },
  { id: 6, name: 'Support', lastMsg: 'Ticket #123 resolved.', time: '3 days ago', avatar: 'SP', color: 'from-cyan-400 to-blue-500' },
  { id: 7, name: 'HR Dept', lastMsg: 'New policy update.', time: '4 days ago', avatar: 'HR', color: 'from-red-400 to-pink-500' },
  { id: 8, name: 'Social Media', lastMsg: 'New post is live!', time: '5 days ago', avatar: 'SM', color: 'from-yellow-400 to-orange-500' },
  { id: 9, name: 'Finance', lastMsg: 'Q4 report ready.', time: '1 week ago', avatar: 'FI', color: 'from-green-400 to-emerald-500' },
  { id: 10, name: 'DevOps', lastMsg: 'Server maintenance tonight.', time: '1 week ago', avatar: 'DO', color: 'from-slate-500 to-slate-700' },
  { id: 11, name: 'Sales', lastMsg: 'New lead from website.', time: '2 weeks ago', avatar: 'SA', color: 'from-indigo-400 to-blue-600' },
  { id: 12, name: 'Legal', lastMsg: 'Contract signed.', time: '2 weeks ago', avatar: 'LE', color: 'from-gray-400 to-gray-600' },
]

/* =========================
   Components
========================= */

function Avatar({ color, avatar }: { color: string; avatar: string }) {
  return (
    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center font-bold text-white shadow-lg border-2 border-white/10 shrink-0`}>
      {avatar}
    </div>
  )
}

function ConversationItem({
  conv,
  isDragging,
}: {
  conv: (typeof conversations)[0]
  isDragging: boolean
}) {
  return (
    <div
      className="relative w-full cursor-pointer hover:bg-white/5 transition-colors group"
      style={{
        height: '52px',
        marginBottom: 'calc(4px + 16px * var(--progress))',
        transition: isDragging ? 'none' : 'margin-bottom 300ms ease-out, background-color 200ms',
      } as any}
    >
      {/* Dynamic Translation Logic */}
      <div
        style={{
          '--tx': 'calc(max(0px, 280px - max(60px, var(--visible-width))))',
          transform: 'translateX(var(--tx))',
          transition: isDragging ? 'none' : 'transform 300ms ease-out, opacity 300ms ease-out',
        } as any}
        className="absolute inset-0 flex items-center px-3"
      >
        <Avatar color={conv.color} avatar={conv.avatar} />

        {/* Content - Fades in after 80px */}
        <div
          className="ml-3 flex-1 min-w-0"
          style={{
            opacity: 'calc(clamp(0, (var(--visible-width) - 80px) / 40, 1))',
          }}
        >
          <div className="flex justify-between items-baseline mb-0.5">
            <span className="font-bold text-[15px] truncate">{conv.name}</span>
            <span className="text-[10px] opacity-40 font-medium">{conv.time}</span>
          </div>
          <div className="text-[13px] opacity-60 truncate leading-tight">{conv.lastMsg}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [sidebarState, setSidebarState] = useState<SidebarState>('closed')
  const [isDragging, setIsDragging] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const drag = useRef({
    dragging: false,
    startX: 0,
    currentX: 0,
    baseX: 0,
    currentSidebarX: -FULL_WIDTH,
    raf: 0 as number | 0
  })

  /* =========================
     实时跟手（贴合）
  ========================= */

  const applyTransform = () => {
    drag.current.raf = 0

    const rawDelta = drag.current.currentX - drag.current.startX
    const delta = applyPhysics(rawDelta)

    const sidebarX = Math.max(
      -FULL_WIDTH,
      Math.min(0, drag.current.baseX + delta)
    )

    drag.current.currentSidebarX = sidebarX

    const visibleWidth = sidebarX + FULL_WIDTH
    const progress = Math.max(0, Math.min(1, (visibleWidth - PEEK_WIDTH) / (FULL_WIDTH - PEEK_WIDTH)))

    sidebarRef.current!.style.transform = `translateX(${sidebarX}px)`
    sidebarRef.current!.style.setProperty('--visible-width', `${visibleWidth}px`)
    sidebarRef.current!.style.setProperty('--progress', `${progress}`)
    contentRef.current!.style.transform = `translateX(${visibleWidth}px)`
  }

  /* =========================
     Pointer / Mouse
  ========================= */

  const onMouseDown = (e: React.MouseEvent) => {
    // If clicking on a scrollable area, we might want to allow scrolling
    // But for simplicity, we only prevent drag if it's an input
    if ((e.target as HTMLElement).closest('.no-drag')) return

    drag.current.dragging = true
    setIsDragging(true)
    drag.current.startX = e.clientX
    drag.current.currentX = e.clientX

    drag.current.baseX =
      sidebarState === 'closed'
        ? -FULL_WIDTH
        : sidebarState === 'peek'
          ? -(FULL_WIDTH - PEEK_WIDTH)
          : 0

    sidebarRef.current!.style.transition = 'none'
    contentRef.current!.style.transition = 'none'

    applyTransform()
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.dragging) return
    drag.current.currentX = e.clientX

    if (!drag.current.raf) {
      drag.current.raf = requestAnimationFrame(applyTransform)
    }
  }

  const onMouseUp = () => {
    if (!drag.current.dragging) return
    drag.current.dragging = false
    setIsDragging(false)

    cancelAnimationFrame(drag.current.raf)

    const x = drag.current.currentSidebarX
    let next: SidebarState

    // 🔑 用“当前位置”判定，而不是 diff
    if (x > -FULL_WIDTH + PEEK_WIDTH) {
      next = 'peek'
    } else {
      next = 'closed'
    }

    // full 的判定（可选）
    if (x > -FULL_WIDTH / 2) {
      next = 'full'
    }

    sidebarRef.current!.style.transition =
      'transform 300ms ease-out'
    contentRef.current!.style.transition =
      'transform 300ms ease-out'

    // 强制同步一次位置，处理 state 未改变时（如拖拽距离不足）不回弹的问题
    let targetX = -FULL_WIDTH
    if (next === 'peek') targetX = -(FULL_WIDTH - PEEK_WIDTH)
    if (next === 'full') targetX = 0

    const targetVisibleWidth = targetX + FULL_WIDTH
    const targetProgress = next === 'full' ? 1 : 0

    sidebarRef.current!.style.transform = `translateX(${targetX}px)`
    sidebarRef.current!.style.setProperty('--visible-width', `${targetVisibleWidth}px`)
    sidebarRef.current!.style.setProperty('--progress', `${targetProgress}`)
    contentRef.current!.style.transform = `translateX(${targetVisibleWidth}px)`

    setSidebarState(next)
  }

  /* =========================
     状态 → 定位（Snap）
  ========================= */

  useEffect(() => {
    let sidebarX = -FULL_WIDTH
    if (sidebarState === 'peek') sidebarX = -(FULL_WIDTH - PEEK_WIDTH)
    if (sidebarState === 'full') sidebarX = 0

    const visibleWidth = sidebarX + FULL_WIDTH
    const progress = sidebarState === 'full' ? 1 : 0

    sidebarRef.current!.style.transform = `translateX(${sidebarX}px)`
    sidebarRef.current!.style.setProperty('--visible-width', `${visibleWidth}px`)
    sidebarRef.current!.style.setProperty('--progress', `${progress}`)
    contentRef.current!.style.transform = `translateX(${visibleWidth}px)`
  }, [sidebarState])

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div
        className="relative w-[375px] h-[667px] bg-white rounded-3xl overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Top Bar (Fixed) */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
          {/* Status Bar */}
          <div className="h-6 px-6 flex justify-between items-center text-[11px] font-semibold text-gray-500">
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" fillOpacity=".3" />
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z" />
              </svg>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
                onClick={() =>
                  setSidebarState(s =>
                    s === 'closed' ? 'peek' : s === 'peek' ? 'full' : 'closed'
                  )
                }
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="font-bold text-gray-800 tracking-tight">App Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="absolute left-0 top-0 h-full w-[280px] bg-indigo-600 text-white z-10 flex flex-col shadow-2xl"
          style={{
            '--visible-width': '0px',
            willChange: 'transform'
          } as any}
        >
          {/* Sidebar Header Space */}
          <div className="h-20 shrink-0" />

          {/* Scrollable Content */}
          <div
            className="flex-1 overflow-y-auto no-drag py-2"
            onMouseDown={(e) => e.stopPropagation()} // Allow scrolling without triggering sidebar drag
          >
            <div className="px-4 py-2 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-200 opacity-60">Messages</h2>
            </div>

            <div className="flex flex-col">
              {conversations.map(conv => (
                <ConversationItem key={conv.id} conv={conv} isDragging={isDragging} />
              ))}
            </div>

            {/* Bottom Spacer to ensure last item is visible above the fixed button */}
            <div className="h-24" />
          </div>

          {/* Bottom Action (Fixed at bottom of sidebar) */}
          <div className="absolute bottom-8 left-0 w-full px-4 z-20" style={{
            opacity: 'calc(clamp(0, (var(--visible-width) - 200px) / 80, 1))',
          }}>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-semibold transition-colors backdrop-blur-md border border-white/10">
              New Conversation
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative h-full bg-gray-50 flex flex-col"
          style={{ willChange: 'transform' }}
        >
          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto pt-24 pb-24 px-4 space-y-4 scroll-smooth">
            {[
              { id: 1, type: 'chat', sender: 'AI Assistant', content: 'Hello! How can I help you today?', time: '10:00 AM' },
              { id: 2, type: 'note', title: 'Meeting Notes', content: 'Discussed the new sidebar design and scrollable content.', time: '10:05 AM' },
              { id: 3, type: 'chat', sender: 'Me', content: 'I want to make the right column scrollable.', time: '10:10 AM' },
              { id: 4, type: 'chat', sender: 'AI Assistant', content: 'Sure, I can help with that. We just need to add overflow-y-auto.', time: '10:11 AM' },
              { id: 5, type: 'note', title: 'To-do List', content: '1. Update App.tsx\n2. Add chat styles\n3. Test scrolling', time: '10:15 AM' },
              { id: 6, type: 'chat', sender: 'Me', content: 'Great, let\'s do it!', time: '10:20 AM' },
              { id: 7, type: 'chat', sender: 'AI Assistant', content: 'I have updated the code for you.', time: '10:21 AM' },
              { id: 8, type: 'chat', sender: 'Me', content: 'Can you add more messages to test scrolling?', time: '10:22 AM' },
              { id: 9, type: 'chat', sender: 'AI Assistant', content: 'Of course! Here is a long message to help you test the scrolling behavior of the right column. It should be smooth and independent.', time: '10:23 AM' },
              { id: 10, type: 'note', title: 'Design Inspiration', content: 'Look at modern chat apps like Slack or Discord for UI ideas.', time: '10:25 AM' },
              { id: 11, type: 'chat', sender: 'AI Assistant', content: 'Another message here.', time: '10:26 AM' },
              { id: 12, type: 'chat', sender: 'AI Assistant', content: 'And another one.', time: '10:27 AM' },
              { id: 13, type: 'chat', sender: 'AI Assistant', content: 'Scrolling test...', time: '10:28 AM' },
              { id: 14, type: 'chat', sender: 'Me', content: 'Looks good!', time: '10:30 AM' },
            ].map(item => (
              <div key={item.id} className={`flex flex-col ${item.type === 'note' ? 'items-center' : item.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                {item.type === 'chat' ? (
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${item.sender === 'Me' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-100'}`}>
                    <div className="font-bold text-[10px] mb-1 opacity-70">{item.sender}</div>
                    <div className="leading-relaxed">{item.content}</div>
                    <div className="text-[9px] mt-1 opacity-50 text-right">{item.time}</div>
                  </div>
                ) : (
                  <div className="w-full bg-amber-50/50 border border-amber-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider">Note: {item.title}</span>
                    </div>
                    <p className="text-sm text-amber-900/80 whitespace-pre-line leading-relaxed">{item.content}</p>
                    <div className="text-[9px] mt-2 text-amber-700/50">{item.time}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fixed Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100/50 z-20">
            <div className="flex gap-2 items-center">
              <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-gray-100 border-none rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking input
                />
              </div>
              <button className="w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
