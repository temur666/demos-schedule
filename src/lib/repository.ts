import type { CalendarEvent } from '../types/event';

export class LocalEventRepo {
    private static STORAGE_KEY = 'calendar_events';

    static save(events: CalendarEvent[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    }

    static load(): CalendarEvent[] {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (!saved) {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
            return [
                {
                    id: 'seed-1',
                    title: 'Morning Sync',
                    startTime: 540, // 09:00
                    endTime: 600,   // 10:00
                    color: '#14324d',
                    date: today,
                    createdAt: Date.now()
                },
                {
                    id: 'seed-2',
                    title: 'Lunch with Team',
                    startTime: 720, // 12:00
                    endTime: 780,   // 13:00
                    color: '#f9a20a',
                    date: today,
                    createdAt: Date.now()
                },
                {
                    id: 'seed-3',
                    title: 'Design Review',
                    startTime: 900, // 15:00
                    endTime: 1020,  // 17:00
                    color: '#6b46c1',
                    date: today,
                    createdAt: Date.now()
                },
                {
                    id: 'seed-4',
                    title: 'Project Deadline',
                    startTime: 600, // 10:00
                    endTime: 720,   // 12:00
                    color: '#48202a',
                    date: tomorrow,
                    createdAt: Date.now()
                },
                {
                    id: 'seed-5',
                    title: 'Next Week Planning',
                    startTime: 840, // 14:00
                    endTime: 900,   // 15:00
                    color: '#29402f',
                    date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
                    createdAt: Date.now()
                }
            ];
        }
        
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
