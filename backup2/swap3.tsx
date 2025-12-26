import { useEffect, useRef, useState } from 'react'
import './App.css'

type SidebarState = 'closed' | 'peek' | 'full'

const FULL_WIDTH = 280
const PEEK_WIDTH = 60

/* =========================
   物理层（可插拔）
========================= */

const ENABLE_PHYSICS = true

function applyPhysics(delta: number) {
    if (!ENABLE_PHYSICS) return delta
    return delta * 0.85 // 阻尼
}

/* ========================= */

export default function App() {
    const [sidebarState, setSidebarState] = useState<SidebarState>('closed')

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

        sidebarRef.current!.style.transform = `translateX(${sidebarX}px)`
        contentRef.current!.style.transform = `translateX(${sidebarX + FULL_WIDTH}px)`
    }

    /* =========================
       Pointer / Mouse
    ========================= */

    const onMouseDown = (e: React.MouseEvent) => {
        drag.current.dragging = true
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
            'transform 320ms cubic-bezier(.2,.8,.2,1)'
        contentRef.current!.style.transition =
            'transform 320ms cubic-bezier(.2,.8,.2,1)'

        // 强制同步一次位置，处理 state 未改变时（如拖拽距离不足）不回弹的问题
        let targetX = -FULL_WIDTH
        if (next === 'peek') targetX = -(FULL_WIDTH - PEEK_WIDTH)
        if (next === 'full') targetX = 0

        sidebarRef.current!.style.transform = `translateX(${targetX}px)`
        contentRef.current!.style.transform = `translateX(${targetX + FULL_WIDTH}px)`

        setSidebarState(next)
    }

    /* =========================
       状态 → 定位（Snap）
    ========================= */

    useEffect(() => {
        let sidebarX = -FULL_WIDTH
        if (sidebarState === 'peek') sidebarX = -(FULL_WIDTH - PEEK_WIDTH)
        if (sidebarState === 'full') sidebarX = 0

        sidebarRef.current!.style.transform = `translateX(${sidebarX}px)`
        contentRef.current!.style.transform = `translateX(${sidebarX + FULL_WIDTH}px)`
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
                {/* Sidebar */}
                <div
                    ref={sidebarRef}
                    className="absolute left-0 top-0 h-full w-[280px] bg-indigo-600 text-white z-10"
                >
                    <div className="p-6 font-bold text-lg">Sidebar</div>
                </div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="relative h-full bg-gray-100"
                    style={{ willChange: 'transform' }}
                >
                    <div className="p-4 bg-white shadow flex items-center gap-3">
                        <button
                            className="px-3 py-2 bg-gray-200 rounded"
                            onClick={() =>
                                setSidebarState(s =>
                                    s === 'closed' ? 'peek' : s === 'peek' ? 'full' : 'closed'
                                )
                            }
                        >
                            ☰
                        </button>
                        <h1 className="font-bold">Drawer Final Model</h1>
                    </div>

                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="bg-white rounded shadow p-4 text-gray-700"
                            >
                                Card {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
