import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CalendarEvent, CreateEventInput } from '../types/event';

interface EventContextType {
    events: CalendarEvent[];
    addEvent: (input: CreateEventInput) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<CalendarEvent[]>(() => {
        const saved = localStorage.getItem('calendar_events');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('calendar_events', JSON.stringify(events));
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

    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};
