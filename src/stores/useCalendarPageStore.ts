import { create } from 'zustand';
import { dayjs, formatDate } from '../calendar/utils';

export type ViewType = 'grid' | 'agenda' | 'schedule';

interface CalendarPageState {
    view: ViewType;
    activeDate: string;
    isModalOpen: boolean;
    initialModalData: { startTime?: string, date?: string, isWeekPlan?: boolean };
    setView: (view: ViewType) => void;
    setActiveDate: (date: string) => void;
    setIsModalOpen: (open: boolean) => void;
    setInitialModalData: (data: { startTime?: string, date?: string, isWeekPlan?: boolean }) => void;
    navigate: (direction: 'prev' | 'next') => void;
}

/**
 * Global Store for Calendar Page state using Zustand
 */
export const useCalendarPageStore = create<CalendarPageState>((set, get) => ({
    view: 'schedule',
    activeDate: formatDate(new Date()),
    isModalOpen: false,
    initialModalData: {},

    setView: (view) => set({ view }),
    setActiveDate: (activeDate) => set({ activeDate }),
    setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
    setInitialModalData: (initialModalData) => set({ initialModalData }),

    navigate: (direction) => {
        const { view, activeDate } = get();
        const unit = view === 'grid' ? 'month' : 'day';
        const amount = direction === 'prev' ? -1 : 1;
        set({ activeDate: formatDate(dayjs(activeDate).add(amount, unit)) });
    },
}));
