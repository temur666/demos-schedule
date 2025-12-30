// 颜色主题配置
export interface ColorTheme {
    bg: string;
    bar: string;
    text: string;
    darkBg: string;
    darkBar: string;
    darkText: string;
}

// 颜色映射函数：根据 event.color 映射到预定义的配色主题
export const getColorTheme = (color: string): ColorTheme => {
    const colorMap: Record<string, ColorTheme> = {
        '#F4B553': { bg: 'bg-[#FFF9EB]', bar: 'bg-[#F4B553]', text: 'text-[#8C6A28]', darkBg: 'dark:bg-yellow-500/10', darkBar: 'dark:bg-yellow-500', darkText: 'dark:text-yellow-100' },
        '#f9a20a': { bg: 'bg-[#FFF9EB]', bar: 'bg-[#F4B553]', text: 'text-[#8C6A28]', darkBg: 'dark:bg-yellow-500/10', darkBar: 'dark:bg-yellow-500', darkText: 'dark:text-yellow-100' },
        '#7ED348': { bg: 'bg-[#EBF9E6]', bar: 'bg-[#7ED348]', text: 'text-[#3F6C26]', darkBg: 'dark:bg-lime-500/10', darkBar: 'dark:bg-lime-500', darkText: 'dark:text-lime-100' },
        '#29402f': { bg: 'bg-[#EBF9E6]', bar: 'bg-[#7ED348]', text: 'text-[#3F6C26]', darkBg: 'dark:bg-lime-500/10', darkBar: 'dark:bg-lime-500', darkText: 'dark:text-lime-100' },
        '#5FA8EE': { bg: 'bg-[#EBF8FF]', bar: 'bg-[#5FA8EE]', text: 'text-[#264E75]', darkBg: 'dark:bg-sky-500/10', darkBar: 'dark:bg-sky-400', darkText: 'dark:text-sky-100' },
        '#14324d': { bg: 'bg-[#EBF8FF]', bar: 'bg-[#5FA8EE]', text: 'text-[#264E75]', darkBg: 'dark:bg-sky-500/10', darkBar: 'dark:bg-sky-400', darkText: 'dark:text-sky-100' },
        '#9F58D6': { bg: 'bg-[#F6EEFD]', bar: 'bg-[#9F58D6]', text: 'text-[#542078]', darkBg: 'dark:bg-purple-500/10', darkBar: 'dark:bg-purple-500', darkText: 'dark:text-purple-100' },
        '#6b46c1': { bg: 'bg-[#F6EEFD]', bar: 'bg-[#9F58D6]', text: 'text-[#542078]', darkBg: 'dark:bg-purple-500/10', darkBar: 'dark:bg-purple-500', darkText: 'dark:text-purple-100' },
        '#FF6B9C': { bg: 'bg-[#FFF0F5]', bar: 'bg-[#FF6B9C]', text: 'text-[#992E52]', darkBg: 'dark:bg-pink-500/10', darkBar: 'dark:bg-pink-500', darkText: 'dark:text-pink-100' },
        '#48202a': { bg: 'bg-[#FFF0F5]', bar: 'bg-[#FF6B9C]', text: 'text-[#992E52]', darkBg: 'dark:bg-pink-500/10', darkBar: 'dark:bg-pink-500', darkText: 'dark:text-pink-100' },
        '#38B2AC': { bg: 'bg-[#E6FFFA]', bar: 'bg-[#38B2AC]', text: 'text-[#236C68]', darkBg: 'dark:bg-teal-500/10', darkBar: 'dark:bg-teal-500', darkText: 'dark:text-teal-100' },
    };

    // 默认使用蓝色主题
    return colorMap[color] || colorMap['#5FA8EE'];
};
