# Mindhub

Mindhub 是一个帮助用户在 AI 时代保持清醒感与内在稳定感的 calm、minimal 产品。
它不是通用论坛。长期产品由 4 个模块组成：

- Community
- Practice
- Journal
- Check-in

## 当前范围

项目目前处于 MVP 阶段，当前实现仅限 **Phase 1: Community**。
已实现：

- Supabase 邮箱 magic link 登录
- 昵称编辑
- 发帖
- 帖子详情页
- 评论

尚未实现：

- Practice
- Journal
- Check-in
- streak 逻辑

## 产品边界

当前阶段不要引入：

- 推荐算法
- 成瘾式增长机制
- 社交图谱能力
- 高频打扰型通知
- 由 AI 替代用户表达
- 不必要的复杂度

## 文档分层

根目录文档（`D:\Mindhub`）负责产品上下文与协作规则：

- [README.md](/D:/Mindhub/README.md)：英文简版
- [README.zh.md](/D:/Mindhub/README.zh.md)：中文产品说明
- [PROJECT_CONTEXT.md](/D:/Mindhub/PROJECT_CONTEXT.md)：产品定位与原则
- [ROADMAP.md](/D:/Mindhub/ROADMAP.md)：阶段边界与范围
- [AGENTS.md](/D:/Mindhub/AGENTS.md)：顶层协作规则

`app` 目录（`D:\Mindhub\app`）负责实际应用实现与运行说明：

- [README.md](/D:/Mindhub/app/README.md)：安装、环境变量、运行方式
- [AGENTS.md](/D:/Mindhub/app/AGENTS.md)：Next.js 16 技术约束

## 开发入口

实际 git 仓库和可运行的 Next.js 应用位于 [app](/D:/Mindhub/app)。
