export interface CalendarEvent {
    id: string;
    title: string;
    startTime: string; // Format: "HH:mm"
    endTime: string;   // Format: "HH:mm"
    color: string;
    date: string;      // Format: "YYYY-MM-DD"
    description?: string;
    createdAt: number;
}

export type CreateEventInput = Omit<CalendarEvent, 'id' | 'createdAt'>;
