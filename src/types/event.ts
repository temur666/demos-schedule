export interface CalendarEvent {
    id: string;
    title: string;
    startTime: number; // Minutes from start of day (0-1439)
    endTime: number;   // Minutes from start of day (0-1439)
    color: string;
    date: string;      // Format: "YYYY-MM-DD"
    description?: string;
    isWeekPlan?: boolean;
    createdAt: number;
}

export type CreateEventInput = Omit<CalendarEvent, 'id' | 'createdAt'>;
