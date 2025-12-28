import React, { createContext, useState, useEffect } from 'react';
import type { CalendarEvent, CreateEventInput } from '../types/event';
import { LocalEventRepo } from '../lib/repository';

interface EventContextType {
    events: CalendarEvent[];
    addEvent: (input: CreateEventInput) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
    getEventsByDate: (date: string) => CalendarEvent[];
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<CalendarEvent[]>(() => LocalEventRepo.load());

    useEffect(() => {
        LocalEventRepo.save(events);
    }, [events]);

    const addEvent = (input: CreateEventInput) => {
        const newEvent: CalendarEvent = {
            ...input,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: Date.now(),
        };
        setEvents(prev => [...prev, newEvent]);
    };

    const deleteEvent = (id: string) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const updateEvent = (id: string, updates: Partial<CalendarEvent>) => {
        setEvents(prev => prev.map(event => event.id === id ? { ...event, ...updates } : event));
    };

    const getEventsByDate = (date: string) => {
        return events.filter(e => e.date === date);
    };
    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, updateEvent, getEventsByDate }}>
            {children}
        </EventContext.Provider>
    );
};

// NOTE: useEvents hook has been moved to a separate file (src/contexts/useEvents.ts) to avoid Fast Refresh conflicts.
// The EventContext now only provides the EventProvider component.
// Exported hook is no longer defined here.
