import { minutesToTime } from '../../calendar/utils';

// 检查两个事项是否在时间上重叠
export const isOverlapping = (e1: any, e2: any) => {
    return e1.startTime < e2.endTime && e2.startTime < e1.endTime;
};

// 为重叠事项分配布局
export const assignLayoutToEvents = (events: any[]) => {
    if (events.length === 0) return [];
    const sortedEvents = [...events].sort((a, b) => {
        if (a.startTime !== b.startTime) return a.startTime - b.startTime;
        return a.id.localeCompare(b.id);
    });

    const results: any[] = [];
    let cluster: any[] = [];
    let clusterEnd = -1;

    const processCluster = (c: any[]) => {
        const layers: any[][] = [];
        c.forEach(event => {
            let layer = -1;
            for (let i = 0; i < layers.length; i++) {
                if (!layers[i].some(le => isOverlapping(event, le))) {
                    layer = i;
                    break;
                }
            }
            if (layer === -1) {
                layer = layers.length;
                layers.push([]);
            }
            layers[layer].push(event);
            event.column = layer;
        });
        const totalCols = layers.length;
        c.forEach(event => { event.totalColumns = totalCols; });
    };

    sortedEvents.forEach(event => {
        const eventWithLayout = { ...event, column: 0, totalColumns: 1 };
        if (event.startTime >= clusterEnd && cluster.length > 0) {
            processCluster(cluster);
            results.push(...cluster);
            cluster = [];
            clusterEnd = -1;
        }
        cluster.push(eventWithLayout);
        clusterEnd = Math.max(clusterEnd, event.endTime);
    });

    if (cluster.length > 0) {
        processCluster(cluster);
        results.push(...cluster);
    }

    return results;
};

// 获取文本颜色
export const getTextColor = (bgColor: string) => {
    if (!bgColor) return 'text-gray-900 dark:text-white';
    if (bgColor.startsWith('#')) {
        const r = parseInt(bgColor.slice(1, 3), 16);
        const g = parseInt(bgColor.slice(3, 5), 16);
        const b = parseInt(bgColor.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128 ? 'text-white/90' : 'text-black/90';
    }
    return 'text-gray-900 dark:text-white';
};

// 格式化时间范围
export const formatTimeRange = (event: any) => {
    const start = event.isSegment && !event.isFirstSegment ? event.originalStartTime : event.startTime;
    const end = event.isSegment && !event.isLastSegment ? event.originalEndTime : event.endTime;

    const formatTime = (mins: number) => {
        if (mins === 1440) return "24:00";
        if (mins > 1440) return `${minutesToTime(mins - 1440)}+1`;
        return minutesToTime(mins);
    };

    return `${formatTime(start)} - ${formatTime(end)}`;
};

// 计算位置
export const calculatePosition = (minutes: number) => minutes;

// 计算高度
export const calculateHeight = (start: number, end: number) => Math.max(end - start, 40);
