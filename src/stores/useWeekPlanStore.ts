import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WeekTodo {
    id: string;
    text: string;
    completed: boolean;
}

interface WeekPlanState {
    plans: Record<string, WeekTodo[]>; // weekKey -> todos
    addTodo: (weekKey: string, text: string) => void;
    toggleTodo: (weekKey: string, id: string) => void;
    deleteTodo: (weekKey: string, id: string) => void;
}

export const useWeekPlanStore = create<WeekPlanState>()(
    persist(
        (set) => ({
            plans: {},
            addTodo: (weekKey, text) => set((state) => {
                const currentTodos = state.plans[weekKey] || [];
                const newTodo: WeekTodo = {
                    id: Math.random().toString(36).substring(2, 9),
                    text,
                    completed: false,
                };
                return {
                    plans: {
                        ...state.plans,
                        [weekKey]: [...currentTodos, newTodo],
                    },
                };
            }),
            toggleTodo: (weekKey, id) => set((state) => {
                const currentTodos = state.plans[weekKey] || [];
                return {
                    plans: {
                        ...state.plans,
                        [weekKey]: currentTodos.map(todo =>
                            todo.id === id ? { ...todo, completed: !todo.completed } : todo
                        ),
                    },
                };
            }),
            deleteTodo: (weekKey, id) => set((state) => {
                const currentTodos = state.plans[weekKey] || [];
                return {
                    plans: {
                        ...state.plans,
                        [weekKey]: currentTodos.filter(todo => todo.id !== id),
                    },
                };
            }),
        }),
        {
            name: 'week-plan-storage',
        }
    )
);
