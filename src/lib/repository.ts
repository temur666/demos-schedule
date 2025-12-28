import type { CalendarEvent } from '../types/event';

export class LocalEventRepo {
    private static STORAGE_KEY = 'calendar_events';

    static save(events: CalendarEvent[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    }

    static load(): CalendarEvent[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (!saved) return [];
        
        try {
            const events = JSON.parse(saved) as any[];
            return events.map(event => {
                // Migration: convert string times to numeric minutes
                if (typeof event.startTime === 'string') {
                    const [h, m] = event.startTime.split(':').map(Number);
                    event.startTime = (h * 60) + m;
                }
                if (typeof event.endTime === 'string') {
                    const [h, m] = event.endTime.split(':').map(Number);
                    event.endTime = (h * 60) + m;
                }
                return event as CalendarEvent;
            });
        } catch (e) {
            console.error('Failed to load events:', e);
            return [];
        }
    }
}
