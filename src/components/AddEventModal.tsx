import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import type { CreateEventInput } from '../types/event';

interface AddEventModalProps {
    onAddEvent: (event: CreateEventInput) => void;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialData?: { startTime?: string, date?: string };
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
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedColor, setSelectedColor] = useState(eventColors[0].value);

    React.useEffect(() => {
        if (isOpen && initialData) {
            if (initialData.startTime) {
                setStartTime(initialData.startTime);
                // Default end time to 1 hour later
                const [h, m] = initialData.startTime.split(':').map(Number);
                const endH = (h + 1) % 24;
                setEndTime(`${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
            }
        }
    }, [isOpen, initialData]);

    const timeToMinutes = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return (hours * 60) + minutes;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !startTime || !endTime) {
            alert('Please fill in all fields');
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
            date: initialData?.date || new Date().toISOString().split('T')[0]
        });

        // Reset form
        setTitle('');
        setStartTime('');
        setEndTime('');
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input
                                id="startTime"
                                type="time"
                                step="60"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endTime">End Time</Label>
                            <Input
                                id="endTime"
                                type="time"
                                step="60"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

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

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Event</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
