export interface DateRange {
    start: Date;
    end: Date;
}

export type ViewMode = 'day' | 'week' | 'month' | 'agenda';

export interface CalendarState {
    viewDate: Date;
    viewMode: ViewMode;
}
