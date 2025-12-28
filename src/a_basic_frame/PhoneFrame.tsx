import React, { useState } from 'react';

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
    const [scale, setScale] = useState(0.8); // 默认缩小一点以便在屏幕上完整显示

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-950 p-4 gap-8">
            {/* 控制面板 - 移至右侧并优化样式 */}
            <div className="fixed top-1/2 -translate-y-1/2 right-6 z-[100] flex flex-col gap-6 p-5 bg-white/90 dark:bg-white/95 backdrop-blur-xl rounded-[2rem] border border-gray-200 shadow-2xl w-52">
                <div className="flex flex-col gap-2.5 pb-5 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Presets</span>
                    <div className="relative">
                        <select
                            className="w-full bg-gray-50 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-900 outline-none cursor-pointer appearance-none border border-gray-100 hover:bg-gray-100 transition-colors"
                            onChange={(e) => {
                                const preset = PRESETS.find(p => p.name === e.target.value);
                                if (preset) {
                                    setWidth(preset.width);
                                    setHeight(preset.height);
                                }
                            }}
                        >
                            {PRESETS.map(p => (
                                <option key={p.name} value={p.name} className="text-black bg-white">{p.name}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm">expand_more</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pb-5 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Width</span>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="w-24 bg-gray-50 rounded-lg px-2 py-2 text-xs font-bold text-center text-gray-900 outline-none focus:ring-2 ring-blue-500/20 border border-gray-100"
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Height</span>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-24 bg-gray-50 rounded-lg px-2 py-2 text-xs font-bold text-center text-gray-900 outline-none focus:ring-2 ring-blue-500/20 border border-gray-100"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Scale</span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{Math.round(scale * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0.2"
                        max="1.5"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <button
                    onClick={() => setShowShell(!showShell)}
                    className={`w-full py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${showShell
                        ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {showShell ? 'Phone Shell' : 'Simple Border'}
                </button>
            </div>

            {/* 手机容器 */}
            <div
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
                className={`
          relative flex flex-col overflow-hidden transition-all duration-300 ease-out
          bg-white dark:bg-black shadow-[0_0_100px_-20px_rgba(0,0,0,0.3)]
          ${showShell
                        ? 'rounded-[3.5rem] border-[12px] border-gray-900 dark:border-gray-800 ring-4 ring-gray-800/20 dark:ring-white/5'
                        : 'rounded-xl border border-gray-200 dark:border-white/10'
                    }
        `}
            >
                {/* 灵动岛 (仅在显示外壳时) */}
                {showShell && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 dark:bg-gray-800 rounded-b-3xl z-50 flex items-center justify-center">
                        <div className="w-12 h-1 bg-white/10 rounded-full"></div>
                    </div>
                )}

                {/* 侧边按钮 (仅在显示外壳时) */}
                {showShell && (
                    <>
                        <div className="absolute left-[-14px] top-32 w-[3px] h-12 bg-gray-800 dark:bg-gray-700 rounded-l-md"></div>
                        <div className="absolute left-[-14px] top-48 w-[3px] h-16 bg-gray-800 dark:bg-gray-700 rounded-l-md"></div>
                        <div className="absolute left-[-14px] top-68 w-[3px] h-16 bg-gray-800 dark:bg-gray-700 rounded-l-md"></div>
                        <div className="absolute right-[-14px] top-40 w-[3px] h-24 bg-gray-800 dark:bg-gray-700 rounded-r-md"></div>
                    </>
                )}

                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PhoneFrame;
