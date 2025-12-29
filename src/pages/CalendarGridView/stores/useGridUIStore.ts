import { create } from 'zustand';

interface GridUIState {
    rowHeight: number;
    setRowHeight: (height: number) => void;
}

export const MIN_ROW_HEIGHT = 160;
export const MAX_ROW_HEIGHT = 400;
export const DEFAULT_ROW_HEIGHT = 160;

export const useGridUIStore = create<GridUIState>((set) => ({
    rowHeight: DEFAULT_ROW_HEIGHT,
    setRowHeight: (height: number) => set({
        rowHeight: Math.min(MAX_ROW_HEIGHT, Math.max(MIN_ROW_HEIGHT, height))
    }),
}));
