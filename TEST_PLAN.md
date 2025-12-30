# 📅 Demos Schedule - 自动化测试与闭环验证计划
user: 当你看见这份文档的时候你要根据下面的需求来做出一些反应但是我你先去分析代码然后得出一些结论在询问用户是否要修改不要直接就修改代码!!!

## 🎯 测试目标
通过直接调用 **Store** 和 **API** 模拟真实用户操作，验证产品逻辑的完整性，确保实现业务闭环。

## 🛠 测试方法论 (给 AI 的指令)
1. **代码驱动测试**：不依赖 UI 自动化工具，直接通过分析和调用项目的 Store (Zustand/Context) 和 Action 来模拟用户行为。
2. **闭环分析**：每个测试场景必须涵盖：操作触发 -> 状态变更 -> 数据持久化 -> 多视图同步。
3. **上下文维护**：
    - 所有的测试目标和进度记录在 `TEST_PLAN.md`。
    - 每次测试成功后，在 `tests/reports/` 目录下创建独立的 `.md` 报告。
    - 每次修改代码不超过 50 行。
    - 关键节点成功后执行 `git add . | commit | push`。

## 🚀 核心闭环目标
- [x] **场景一：数据增删改闭环 (Data Loop)**
    - 验证：添加/删除日程 -> Store 更新 -> LocalStorage 持久化 -> 视图刷新。
- [x] **场景二：跨视图日期同步 (Navigation Loop)**
    - 验证：全局 `activeDate` 变更 -> Grid/Agenda/Day 视图同步跳转。
- [x] **场景三：滚动状态反向同步 (Scroll Sync Loop)**
    - 验证：Agenda 视图滚动 -> 实时更新全局 `activeDate` -> 切换视图不丢失位置。
- [x] **场景四：搜索与过滤闭环 (Search Loop)**
    - 验证：输入搜索词 -> 全局搜索状态变更 -> 结果列表展示 -> 点击跳转。
- [x] **场景五：设置与偏好闭环 (Settings Loop)**
    - 验证：修改设置（如周起始日、暗黑模式）-> 全局 Store 响应 -> 持久化 -> UI 实时重绘。

## 📈 测试进度摘要
| 测试日期 | 测试名称 | 状态 | 报告链接 |
| :--- | :--- | :--- | :--- |
| 2025-12-30 | 滚动同步与日期检测优化 | ✅ 已完成 | [2025-12-30_scroll_sync_fix.md](./tests/reports/2025-12-30_scroll_sync_fix.md) |
| 2025-12-30 | 搜索与过滤闭环验证 | ✅ 已完成 | [2025-12-30_search_loop_test.md](./tests/reports/2025-12-30_search_loop_test.md) |
| 2025-12-30 | 设置与偏好闭环验证 | ✅ 已完成 | [2025-12-30_settings_loop_test.md](./tests/reports/2025-12-30_settings_loop_test.md) |

---
*最后更新时间：2025-12-30 13:45*


## 备注
通过维护一份动态的测试计划和详细的实验报告，我们不仅能清晰地掌握当前的开发进度，还能为后续的 AI 协作提供完美的上下文。
我已经完成了以下工作：
1. 创建主计划文件：[TEST_PLAN.md](/home/linuxtiemuer/demos-schedule/TEST_PLAN.md)。
    - 包含了测试目标、给 AI 的指令规则、核心闭环目标以及进度摘要。
    - 您可以直接将此文件扔给任何 AI，它将立即理解当前的测试状态和行为准则。
2. 建立报告体系：创建了 tests/reports/ 目录。
3. 记录首份报告：[2025-12-30_scroll_sync_fix.md](/home/linuxtiemuer/demos-schedule/tests/reports/2025-12-30_scroll_sync_fix.md)。
    - 详细记录了刚才对“滚动同步闭环”的测试过程、发现的问题及修复方案。
4. 同步至仓库：已执行 git push，确保云端同步。