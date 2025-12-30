import React, { useState } from 'react';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import type { CreateEventInput } from '../types/event';
import { timeToMinutes, formatDate } from '../calendar/utils';

interface AddEventModalProps {
    onAddEvent: (event: CreateEventInput) => void;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialData?: { startTime?: string, date?: string, isWeekPlan?: boolean };
}

const eventColors = [
    { name: 'Deep Blue', value: '#14324d' },
    { name: 'Orange', value: '#f9a20a' },
    { name: 'Deep Red', value: '#48202a' },
    { name: 'Light Blue', value: '#63d2ff' },
    { name: 'Deep Green', value: '#29402f' },
    { name: 'Purple', value: '#6b46c1' }
];

export function AddEventModal({ onAddEvent, isOpen: controlledOpen, onOpenChange, initialData }: AddEventModalProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setIsOpen = onOpenChange || setInternalOpen;

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(eventColors[0].value);

    React.useEffect(() => {
        if (isOpen) {
            // Initialize date
            if (initialData?.date) {
                setDate(initialData.date);
            } else {
                setDate(formatDate(new Date()));
            }

            // Initialize start time if provided
            if (initialData?.startTime) {
                setStartTime(initialData.startTime);
                // Default end time to 1 hour later
                const [h, m] = initialData.startTime.split(':').map(Number);
                const endH = (h + 1) % 24;
                setEndTime(`${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !date || !startTime || !endTime) {
            alert('Please fill in all required fields');
            return;
        }

        if (startTime >= endTime) {
            alert('End time must be after start time');
            return;
        }

        onAddEvent({
            title,
            startTime: timeToMinutes(startTime),
            endTime: timeToMinutes(endTime),
            color: selectedColor,
            date: date,
            isWeekPlan: initialData?.isWeekPlan
        });

        // Reset form
        setTitle('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setLocation('');
        setDescription('');
        setSelectedColor(eventColors[0].value);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="size-12 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-xl flex items-center justify-center hover:scale-105 transition-transform hover:rotate-90 duration-300 active:scale-95">
                    <span className="material-symbols-outlined text-[28px]">add</span>
                </button>
            </DialogTrigger>
            <DialogContent className="p-0">
                <DialogHeader className="px-6 py-4 border-b border-border bg-background/50 dark:bg-white/5 flex-row items-center justify-between space-y-0">
                    <DialogTitle>New Event</DialogTitle>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel
                    </button>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Event Title */}
                    <div className="space-y-1">
                        <input
                            className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-border focus:ring-0 focus:border-foreground text-xl font-semibold placeholder-muted-foreground text-foreground transition-colors"
                            placeholder="Event Title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Date */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Date</label>
                            <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 dark:bg-white/5 rounded-xl border border-transparent focus-within:border-border transition-colors">
                                <span className="material-symbols-outlined text-muted-foreground text-lg">calendar_today</span>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-foreground focus:ring-0"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Time</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 px-2 py-2.5 bg-muted/50 dark:bg-white/5 rounded-xl text-center border border-transparent focus-within:border-border transition-colors">
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-sm font-medium text-foreground focus:ring-0 text-center"
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <span className="text-muted-foreground">-</span>
                                <div className="flex-1 px-2 py-2.5 bg-muted/50 dark:bg-white/5 rounded-xl text-center border border-transparent focus-within:border-border transition-colors">
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-sm font-medium text-foreground focus:ring-0 text-center"
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Location</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 dark:bg-white/5 rounded-xl border border-transparent focus-within:border-border transition-colors">
                            <span className="material-symbols-outlined text-muted-foreground text-lg">location_on</span>
                            <input
                                className="w-full bg-transparent border-none p-0 text-sm font-medium text-foreground placeholder-muted-foreground focus:ring-0"
                                placeholder="Add location or address"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            Description <span className="text-muted-foreground/50 font-normal normal-case ml-1">(Optional)</span>
                        </label>
                        <textarea
                            className="w-full px-3 py-2.5 bg-muted/50 dark:bg-white/5 rounded-xl border border-transparent focus:border-border text-sm font-medium text-foreground placeholder-muted-foreground focus:ring-0 resize-none transition-colors"
                            placeholder="Add details..."
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Color */}
                    <div className="space-y-2">
                        <Label>Color</Label>
                        <div className="flex gap-2 flex-wrap">
                            {eventColors.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value ? 'border-foreground' : 'border-border'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    onClick={() => setSelectedColor(color.value)}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 bg-muted/50 dark:bg-white/5 border-t border-border">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-full bg-foreground text-background font-semibold text-sm shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        Create Event
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
