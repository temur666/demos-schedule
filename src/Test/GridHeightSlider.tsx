import React from 'react';
import { useGridUIStore, MIN_ROW_HEIGHT, MAX_ROW_HEIGHT } from '../pages/CalendarGridView/stores/useGridUIStore';

const GridHeightSlider: React.FC = () => {
    const { rowHeight, setRowHeight } = useGridUIStore();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-[#0B121F]/40 uppercase tracking-wider">Grid Height</span>
                <span className="text-[10px] font-bold text-[#0B121F] bg-[#F8FAFC] px-2 py-1 rounded-lg">{Math.round(rowHeight)}px</span>
            </div>
            <input
                type="range"
                min={MIN_ROW_HEIGHT}
                max={MAX_ROW_HEIGHT}
                step="1"
                value={rowHeight}
                onChange={(e) => setRowHeight(Number(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0B121F]"
            />
        </div>
    );
};

export default GridHeightSlider;
