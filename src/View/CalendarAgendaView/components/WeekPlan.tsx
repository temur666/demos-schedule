import React, { useState } from 'react';
import { useWeekPlanStore } from '../../../stores/useWeekPlanStore';
import { useGridUIStore } from '../../CalendarGridView/stores/useGridUIStore';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface WeekPlanProps {
    weekKey: string;
}

const WeekPlan: React.FC<WeekPlanProps> = ({ weekKey }) => {
    const { plans, addTodo, toggleTodo, deleteTodo } = useWeekPlanStore();
    const [inputValue, setInputValue] = useState('');
    const rowHeight = useGridUIStore(state => state.rowHeight);

    const todos = plans[weekKey] || [];

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(weekKey, inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="relative mb-6">
            {/* 标题栏 */}
            <div className="h-16 bg-white dark:bg-black border-b border-transparent dark:border-white/5">
                <div className="px-2 h-full flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-2xl font-medium text-black dark:text-white font-display tracking-tight">
                            周计划
                        </h2>
                        <span className="text-sm text-gray-400 font-serif">WEEK PLAN</span>
                    </div>
                </div>
            </div>

            {/* 内容区 */}
            <div className="px-2 py-4 flex flex-col gap-3" style={{ minHeight: rowHeight }}>
                <form onSubmit={handleAdd} className="flex items-center gap-2 px-2 mb-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="添加本周目标..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
                    />
                    <button type="submit" className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <Plus size={18} className="text-gray-400" />
                    </button>
                </form>

                <div className="flex flex-col gap-2">
                    {todos.map(todo => (
                        <div key={todo.id} className="group flex items-center gap-3 px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-all">
                            <button
                                onClick={() => toggleTodo(weekKey, todo.id)}
                                className="text-gray-300 hover:text-blue-500 transition-colors"
                            >
                                {todo.completed ? (
                                    <CheckCircle2 size={18} className="text-blue-500" />
                                ) : (
                                    <Circle size={18} />
                                )}
                            </button>
                            <span className={`flex-1 text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(weekKey, todo.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(WeekPlan);
