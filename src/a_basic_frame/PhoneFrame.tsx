import React, { useState } from 'react';
import GridHeightSlider from '../Test/GridHeightSlider';

interface PhoneFrameProps {
    children: React.ReactNode;
}

const PRESETS = [
    { name: 'iPhone 16 Pro Max', width: 430, height: 932 },
    { name: 'iPhone 15', width: 393, height: 852 },
    { name: 'Small Phone', width: 320, height: 568 },
    { name: 'Tablet (Mini)', width: 768, height: 1024 },
];

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
    const [width, setWidth] = useState(430);
    const [height, setHeight] = useState(932);
    const [showShell, setShowShell] = useState(true);
    const [scale, setScale] = useState(0.8);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 p-4 gap-8 transition-colors duration-500">
            {/* 控制面板 - 可折叠设计 */}
            <div
                className={`fixed right-8 z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isCollapsed
                    ? 'top-8 w-14 h-14 rounded-full bg-[#0B121F] shadow-lg cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95'
                    : 'top-1/2 -translate-y-1/2 w-64 p-6 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem]'
                    }`}
                onClick={() => isCollapsed && setIsCollapsed(false)}
            >
                {isCollapsed ? (
                    <span className="material-symbols-outlined text-white text-2xl animate-in zoom-in duration-500">settings</span>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-bold text-[#0B121F]/40 uppercase tracking-[0.15em]">Device Preset</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCollapsed(true);
                                }}
                                className="w-8 h-8 rounded-full hover:bg-gray-50 flex items-center justify-center text-[#0B121F]/40 hover:text-[#0B121F] transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close_fullscreen</span>
                            </button>
                        </div>

                        <div className="relative group">
                            <select
                                className="w-full bg-[#F8FAFC] rounded-2xl px-4 py-3 text-sm font-semibold text-[#0B121F] outline-none cursor-pointer appearance-none border border-transparent hover:border-gray-200 transition-all"
                                onChange={(e) => {
                                    const preset = PRESETS.find(p => p.name === e.target.value);
                                    if (preset) {
                                        setWidth(preset.width);
                                        setHeight(preset.height);
                                    }
                                }}
                            >
                                {PRESETS.map(p => (
                                    <option key={p.name} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0B121F]/30 group-hover:text-[#0B121F] transition-colors">expand_more</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-[#0B121F]/40 uppercase tracking-wider px-1">Width</span>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                    className="w-full bg-[#F8FAFC] rounded-xl px-3 py-2.5 text-xs font-bold text-[#0B121F] outline-none border border-transparent focus:border-gray-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-[#0B121F]/40 uppercase tracking-wider px-1">Height</span>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(Number(e.target.value))}
                                    className="w-full bg-[#F8FAFC] rounded-xl px-3 py-2.5 text-xs font-bold text-[#0B121F] outline-none border border-transparent focus:border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[10px] font-bold text-[#0B121F]/40 uppercase tracking-wider">Scale</span>
                                <span className="text-[10px] font-bold text-[#0B121F] bg-[#F8FAFC] px-2 py-1 rounded-lg">{Math.round(scale * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.2"
                                max="1.5"
                                step="0.1"
                                value={scale}
                                onChange={(e) => setScale(Number(e.target.value))}
                                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0B121F]"
                            />
                        </div>

                        <GridHeightSlider />

                        <button
                            onClick={() => setShowShell(!showShell)}
                            className={`w-full py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${showShell
                                ? 'bg-[#0B121F] text-white shadow-lg shadow-[#0B121F]/20'
                                : 'bg-[#F8FAFC] text-[#0B121F] border border-gray-100 hover:bg-gray-100'
                                }`}
                        >
                            {showShell ? 'Premium Shell' : 'Minimal Border'}
                        </button>
                    </div>
                )}
            </div>

            {/* 手机容器 - 恢复正常显示 */}
            <div
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
                className={`
                    relative flex flex-col overflow-hidden transition-all duration-500 ease-out
                    bg-white dark:bg-black shadow-[0_30px_100px_rgba(0,0,0,0.12)]
                    ${showShell
                        ? 'rounded-[4rem] border-[14px] border-[#0B121F] dark:border-gray-900 ring-8 ring-[#0B121F]/5'
                        : 'rounded-3xl border border-gray-200 dark:border-white/10'
                    }
                `}
            >
                <>
                    {/* 灵动岛 (仅在显示外壳时) */}
                    {showShell && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#0B121F] dark:bg-gray-900 rounded-b-[2rem] z-50 flex items-center justify-center">
                            <div className="w-14 h-1.5 bg-white/10 rounded-full"></div>
                        </div>
                    )}

                    {/* 侧边按钮 (仅在显示外壳时) */}
                    {showShell && (
                        <>
                            <div className="absolute left-[-16px] top-32 w-[4px] h-14 bg-[#0B121F] dark:bg-gray-800 rounded-l-lg"></div>
                            <div className="absolute left-[-16px] top-52 w-[4px] h-20 bg-[#0B121F] dark:bg-gray-800 rounded-l-lg"></div>
                            <div className="absolute left-[-16px] top-76 w-[4px] h-20 bg-[#0B121F] dark:bg-gray-800 rounded-l-lg"></div>
                            <div className="absolute right-[-16px] top-44 w-[4px] h-28 bg-[#0B121F] dark:bg-gray-800 rounded-r-lg"></div>
                        </>
                    )}

                    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative bg-white">
                        {children}
                    </div>
                </>
            </div>
        </div>
    );
};

export default PhoneFrame;
