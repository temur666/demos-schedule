# Calendar Grid View 重构总结

## 🎯 重构目标

将 `CalendarGridView` 从"先按周 → 再在 render 前把周重新按月份分组"的方式，重构为**数据层直接输出月份结构**的最佳实践。

---

## ✅ 核心改进

### 1. **数据结构正确化** (最重要)

#### 之前 ❌
```ts
// Store 输出
weeks: Date[][]

// UI 层需要做 O(n³) 的反向分组
weeks.forEach(weekDays => {
  weekDays.forEach(date => {
    // 找 month
    // 再反查 fullWeek
    // 再去重
  })
})
```

#### 现在 ✅
```ts
// Store 直接输出正确的结构
interface MonthGroup {
    monthKey: string;      // 2025-01
    monthDate: Date;       // 用于计算
    weeks: Date[][];
}

monthGroups: MonthGroup[]
```

**性能提升**：O(n³) → O(n)

---

### 2. **职责分离**

| 层级 | 之前 | 现在 |
|------|------|------|
| **Store** | 只管 weeks | 管理完整的 Month → Week 结构 |
| **UI** | 复杂的分组逻辑 + 显示 | 只负责渲染 |
| **显示格式** | 在 Store 中硬编码 `monthDisplay` | 在 UI 层用 `dayjs().format()` |

---

### 3. **移除脆弱的逻辑**

#### 移除了 `currentMonthKey` 条件 padding
```tsx
// 之前 ❌
<div className={`... ${monthGroup.monthKey < currentMonthKey ? 'pt-12' : 'pt-64'}`}>

// 现在 ✅
<div className="... pt-12">
```

**问题**：
- 和滚动位置无关
- 和 activeDate 无关
- 在无限滚动场景下是隐藏 bug

---

### 4. **代码可读性**

#### 之前的 monthGroups 计算
```ts
const monthGroups = useMemo(() => {
  const groups: { [key: string]: Date[][] } = {};
  
  weeks.forEach(weekDays => {
    weekDays.forEach(date => {
      const monthKey = dayjs(date).format('YYYY-MM');
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      const existingWeek = groups[monthKey].find(week =>
        week.some(d => formatDate(d) === formatDate(date))
      );
      if (!existingWeek) {
        const fullWeek = weeks.find(w =>
          w.some(d => formatDate(d) === formatDate(date))
        );
        if (fullWeek && !groups[monthKey].some(w =>
          w[0] && fullWeek[0] && formatDate(w[0]) === formatDate(fullWeek[0])
        )) {
          groups[monthKey].push(fullWeek);
        }
      }
    });
  });
  
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, weeks]) => ({
      monthKey,
      monthDisplay: dayjs(monthKey + '-01').format('MMMM YYYY'),
      weeks
    }));
}, [weeks]);
```

#### 现在的 monthGroups 计算（在 Store 中）
```ts
const monthGroups = useMemo<MonthGroup[]>(() => {
  return months.map(month => {
    const range = CalendarEngine.getVisibleRange(month, 'month');
    const weeks = CalendarEngine.getWeeksInRange(range);
    
    return {
      monthKey: dayjs(month).format('YYYY-MM'),
      monthDate: month,
      weeks,
    };
  });
}, [months, weekStart]);
```

**改进**：
- 从 40+ 行 → 10 行
- 逻辑清晰，易于理解
- 没有嵌套循环和反查

---

## 📊 架构对比

### 之前的架构
```
Store (useCalendarGridStore)
  └─ weeks: Date[][]
       ↓
UI (CalendarGridView)
  └─ useMemo: 复杂的月份分组逻辑 (O(n³))
       ↓
  └─ monthGroups (派生状态)
       ↓
  └─ JSX 渲染
```

### 现在的架构 ✅
```
Store (useCalendarGridStore)
  └─ monthGroups: MonthGroup[] (O(n))
       ↓
UI (CalendarGridView)
  └─ 直接使用 monthGroups
       ↓
  └─ JSX 渲染
```

---

## 🎨 UI 层改进

### 月份标题渲染

#### 之前
```tsx
<h2>{monthGroup.monthDisplay}</h2>
```
- `monthDisplay` 在 Store 中硬编码
- 无法灵活调整格式
- i18n 需要改 Store

#### 现在 ✅
```tsx
<h2>{dayjs(monthGroup.monthDate).format('MMMM YYYY')}</h2>
```
- 格式化在 UI 层
- 易于 i18n
- 可以根据不同场景调整格式

---

## 🚀 未来可优化方向（可选）

### 1. 使用 IntersectionObserver 替代 querySelectorAll
```tsx
// 当前
const elements = containerRef.current.querySelectorAll('[data-date]');

// 未来可以改为
useIntersectionObserver({
  onIntersect: (date) => onActiveDateChange?.(date)
})
```

### 2. 创建独立的 MonthSection 组件
```tsx
const MonthSection = React.memo(({ monthGroup, ... }) => {
  // 渲染单个月份
});
```

### 3. 虚拟滚动优化
对于超长的月份列表，可以考虑使用 `react-window` 或 `react-virtual`。

---

## 📝 文件变更清单

### 修改的文件
1. `src/stores/useCalendarGridStore.ts`
   - 新增 `MonthGroup` 接口
   - 将 `weeks` 改为 `monthGroups`
   - 移除未使用的 `formatDate` 导入

2. `src/pages/CalendarGridView.tsx`
   - 移除复杂的 `monthGroups` 计算逻辑
   - 移除 `currentMonthKey` 相关代码
   - 简化月份标题渲染
   - 移除未使用的变量

---

## ✨ 总结

| 维度 | 重构前 | 重构后 |
|------|--------|--------|
| 功能正确性 | ✅ | ✅ |
| 性能 | ⚠️ O(n³) | ✅ O(n) |
| 可维护性 | ❌ 复杂 | ✅ 清晰 |
| 是否最佳实践 | ❌ | ✅ |
| 代码行数 | ~170 行 | ~130 行 |

**核心原则**：
> 数据结构应该反映 UI 结构，而不是让 UI 去反向推导数据结构。

---

## 🎓 学到的教训

1. **数据建模是关键**：正确的数据结构可以让代码简化 10 倍
2. **职责分离**：Store 管数据，UI 管显示
3. **避免过早优化**：先保证结构正确，再考虑性能
4. **可读性 > 聪明**：简单直接的代码比"聪明"的代码更有价值
