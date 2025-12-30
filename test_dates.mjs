import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
dayjs.extend(weekOfYear);

function getWeekOfMonth(date) {
    const d = dayjs(date);
    const startOfMonth = d.startOf('month');
    let weekOfMonth = Math.ceil((d.date() + startOfMonth.day()) / 7);
    return weekOfMonth;
}

const dates = [
    '2025-09-29',
    '2025-09-30',
    '2025-10-01',
    '2025-10-02',
    '2025-10-31'
];

console.log('--- Week of Month Calculation ---');
dates.forEach(date => {
    console.log(`${date}: Month ${dayjs(date).format('M')}, Week of Month ${getWeekOfMonth(date)}`);
});

function getWeekKey(date) {
    return dayjs(date).startOf('week').format('YYYY-ww');
}

console.log('\n--- Corrected Week Grouping Logic (YYYY-ww) ---');
dates.forEach(date => {
    console.log(`${date}: WeekKey ${getWeekKey(date)}`);
});

function getNewWeekKey(date) {
    return dayjs(date).format('YYYY-MM') + '-' + dayjs(date).startOf('week').format('ww');
}

console.log('\n--- New Grouping Logic (YYYY-MM-ww) ---');
dates.forEach(date => {
    console.log(`${date}: WeekKey ${getNewWeekKey(date)}`);
});
