import { CalendarEvent } from '../types/event';

const TODAY = '2025-12-30';

export const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: 'mock-1',
        title: '晨间例会',
        startTime: 540, // 09:00
        endTime: 600,   // 10:00
        color: '#4F46E5', // Indigo
        date: TODAY,
        description: '团队每日站会',
        createdAt: Date.now(),
    },
    {
        id: 'mock-2',
        title: '深度工作',
        startTime: 600, // 10:00
        endTime: 720,   // 12:00
        color: '#059669', // Emerald
        date: TODAY,
        description: '专注开发新功能',
        createdAt: Date.now(),
    },
    {
        id: 'mock-3',
        title: '午餐休息',
        startTime: 720, // 12:00
        endTime: 780,   // 13:00
        color: '#F59E0B', // Amber
        date: TODAY,
        createdAt: Date.now(),
    },
    {
        id: 'mock-4',
        title: '产品评审',
        startTime: 840, // 14:00
        endTime: 900,   // 15:00
        color: '#DC2626', // Red
        date: TODAY,
        description: 'Q4 产品规划评审',
        createdAt: Date.now(),
    },
    {
        id: 'mock-5',
        title: '客户沟通',
        startTime: 870, // 14:30
        endTime: 930,   // 15:30
        color: '#7C3AED', // Violet
        date: TODAY,
        description: '讨论需求变更',
        createdAt: Date.now(),
    },
    {
        id: 'mock-6',
        title: '技术分享',
        startTime: 960, // 16:00
        endTime: 1020,  // 17:00
        color: '#2563EB', // Blue
        date: TODAY,
        description: 'React Server Components',
        createdAt: Date.now(),
    }
];
