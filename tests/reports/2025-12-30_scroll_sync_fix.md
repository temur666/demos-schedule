# 测试报告：滚动同步与日期检测优化

## 📅 测试日期
2025-12-30

## 🔍 测试场景
模拟用户在 Agenda (清单) 视图中进行长距离滚动，并验证其位置状态是否正确同步到全局 Store。

## 🛠 测试步骤 (API/Store 调用)
1. **初始状态**：`useCalendarPageStore.activeDate` 为当前日期。
2. **模拟滚动**：调用 `useCalendarAgendaStore.loadMore('down')` 模拟用户向下翻页。
3. **位置检测**：触发 `useAgendaScroll.handleScroll`。
4. **状态验证**：检查 `activeDate` 是否随滚动位置实时更新。

## ⚠️ 发现的问题
- **检测点偏移**：原逻辑使用屏幕中心点检测日期，在快速滚动或存在 Sticky Header 时，`activeDate` 更新有明显的滞后感。
- **视图跳变**：从 Agenda 滚动到新月份后切换回 Grid 视图，页面会跳回旧日期，因为全局 `activeDate` 未能及时同步。

## ✅ 解决方案与修复
- **算法优化**：将日期检测点从 `centerY` 移至 `detectY` (顶部下方 100-150px)，避开标题遮挡，提高灵敏度。
- **双向绑定**：确保 `onActiveDateChange` 在滚动过程中被精准触发。
- **代码修改**：
    - 修改 `src/View/CalendarAgendaView/stores/useAgendaScroll.ts`
    - 修改 `src/View/CalendarGridView/stores/useScrollAction.ts`

## 📊 测试结果
- **数据流闭环**：成功同步。
- **用户体验**：切换视图时位置保持一致，无跳变。
- **状态**：✅ 通过

---
**提交记录**: `3567eac`
