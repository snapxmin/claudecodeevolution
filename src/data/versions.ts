export interface VersionChange {
  type: 'feature' | 'improvement' | 'fix' | 'breaking';
  description: string;
  featureTag?: string;
}

export interface Version {
  id: string;
  version: string;
  codename?: string;
  releaseDate: string;
  type: 'major' | 'minor' | 'patch' | 'beta';
  summary: string;
  changes: VersionChange[];
  highlights: string[];
  metrics?: {
    featuresAdded: number;
    bugsFixed: number;
    performanceGain?: string;
  };
  modelSupport: string[];
}

export const versions: Version[] = [
  {
    id: 'v0-1-0',
    version: '0.1.0',
    codename: 'Genesis',
    releaseDate: '2025-02-24',
    type: 'beta',
    summary: 'Claude Code 首次以研究预览形式发布，提供命令行 AI 编程助手能力，支持代码编辑、终端操作与文件系统访问。',
    highlights: ['首次公开测试版', '命令行原生体验', '文件读写能力'],
    changes: [
      { type: 'feature', description: '基础代码编辑与生成能力', featureTag: 'code-editing' },
      { type: 'feature', description: '终端命令执行支持', featureTag: 'terminal' },
      { type: 'feature', description: '文件系统读写访问', featureTag: 'filesystem' },
      { type: 'feature', description: '项目级上下文理解（CLAUDE.md）', featureTag: 'memory' },
      { type: 'feature', description: '基础 Git 操作集成', featureTag: 'git' },
    ],
    metrics: { featuresAdded: 5, bugsFixed: 0 },
    modelSupport: ['Claude 3.5 Sonnet'],
  },
  {
    id: 'v0-2-0',
    version: '0.2.0',
    codename: 'Toolsmith',
    releaseDate: '2025-03-15',
    type: 'minor',
    summary: '引入工具调用系统升级，增强多文件编辑能力，并提升代码搜索与引用准确性。',
    highlights: ['多文件同时编辑', '改进代码搜索', '工具调用稳定性提升'],
    changes: [
      { type: 'feature', description: '支持跨文件批量编辑操作', featureTag: 'code-editing' },
      { type: 'feature', description: '语义级代码搜索（grep/ripgrep 集成）', featureTag: 'search' },
      { type: 'improvement', description: '工具调用重试机制与错误恢复', featureTag: 'reliability' },
      { type: 'improvement', description: '长上下文窗口优化（200K tokens）', featureTag: 'context' },
      { type: 'fix', description: '修复文件权限检查缺失问题' },
    ],
    metrics: { featuresAdded: 2, bugsFixed: 8, performanceGain: '15%' },
    modelSupport: ['Claude 3.5 Sonnet', 'Claude 3 Opus'],
  },
  {
    id: 'v0-3-0',
    version: '0.3.0',
    codename: 'Connector',
    releaseDate: '2025-04-03',
    type: 'minor',
    summary: '加入 MCP（Model Context Protocol）支持，实现与外部服务的深度集成，标志着 Claude Code 向可扩展平台演进。',
    highlights: ['MCP 协议支持', '外部服务集成', 'GitHub 深度集成'],
    changes: [
      { type: 'feature', description: 'MCP 服务器协议支持（stdio & HTTP）', featureTag: 'mcp' },
      { type: 'feature', description: 'GitHub MCP Server 内置支持', featureTag: 'github' },
      { type: 'feature', description: 'Web 搜索工具集成', featureTag: 'web-search' },
      { type: 'feature', description: '自定义工具注册 API', featureTag: 'mcp' },
      { type: 'improvement', description: '提升上下文压缩算法效率', featureTag: 'context' },
      { type: 'fix', description: '修复大型 monorepo 下路径解析问题' },
    ],
    metrics: { featuresAdded: 4, bugsFixed: 12, performanceGain: '20%' },
    modelSupport: ['Claude 3.5 Sonnet', 'Claude 3 Opus'],
  },
  {
    id: 'v0-4-0',
    version: '0.4.0',
    codename: 'Orchestrator',
    releaseDate: '2025-04-28',
    type: 'minor',
    summary: '引入 Sub-agent 子代理架构，Claude Code 可以协调多个并行任务，显著提升复杂项目的处理效率。',
    highlights: ['Sub-agent 子代理', '并行任务执行', 'GitHub Actions 集成'],
    changes: [
      { type: 'feature', description: 'Sub-agent 多智能体协作框架', featureTag: 'agents' },
      { type: 'feature', description: 'GitHub Actions CI/CD 原生集成', featureTag: 'github' },
      { type: 'feature', description: '任务并行执行引擎', featureTag: 'agents' },
      { type: 'feature', description: 'Agent SDK 公测版（TypeScript/Python）', featureTag: 'sdk' },
      { type: 'improvement', description: '增强 Diff 可视化与确认机制', featureTag: 'ux' },
      { type: 'improvement', description: '优化 Token 使用统计与计费提示', featureTag: 'ux' },
    ],
    metrics: { featuresAdded: 4, bugsFixed: 15 },
    modelSupport: ['Claude 3.5 Sonnet', 'Claude 3 Opus', 'Claude 3.5 Haiku'],
  },
  {
    id: 'v1-0-0',
    version: '1.0.0',
    codename: 'Ascent',
    releaseDate: '2025-05-22',
    type: 'major',
    summary: 'Claude Code 正式版（GA）发布，全面升级至 Claude Sonnet 4，引入记忆系统、Hooks 机制与 Background Agent，标志产品从工具向平台的重大跃迁。',
    highlights: ['正式版发布', 'Claude Sonnet 4 支持', 'Hooks 系统', '背景代理'],
    changes: [
      { type: 'feature', description: 'Claude Sonnet 4 & Claude Opus 4 模型接入', featureTag: 'models' },
      { type: 'feature', description: 'Background Agent 后台异步任务执行', featureTag: 'agents' },
      { type: 'feature', description: 'Hooks 系统（PreTool/PostTool/Stop/Notification）', featureTag: 'hooks' },
      { type: 'feature', description: '持久化记忆系统（跨会话上下文保持）', featureTag: 'memory' },
      { type: 'feature', description: '交互式权限管理（细粒度沙箱控制）', featureTag: 'security' },
      { type: 'feature', description: 'Claude Code SDK 正式版（完整 API）', featureTag: 'sdk' },
      { type: 'improvement', description: '终端 UI 全面重设计，支持富文本渲染', featureTag: 'ux' },
      { type: 'improvement', description: '错误处理与重试策略优化', featureTag: 'reliability' },
      { type: 'breaking', description: '废弃旧版 tool_use 格式，迁移至 MCP 规范' },
    ],
    metrics: { featuresAdded: 8, bugsFixed: 47, performanceGain: '35%' },
    modelSupport: ['Claude Sonnet 4', 'Claude Opus 4', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku'],
  },
  {
    id: 'v1-1-0',
    version: '1.1.0',
    codename: 'Momentum',
    releaseDate: '2025-06-10',
    type: 'minor',
    summary: '聚焦开发者体验优化，推出 IDE 深度集成、改进的代码审查能力与更强的多语言支持。',
    highlights: ['IDE 插件生态', '代码审查增强', '多语言支持扩展'],
    changes: [
      { type: 'feature', description: 'VS Code 原生扩展插件（预览版）', featureTag: 'ide' },
      { type: 'feature', description: 'JetBrains 系列 IDE 插件支持', featureTag: 'ide' },
      { type: 'feature', description: '智能 PR Review 与 Comment 生成', featureTag: 'github' },
      { type: 'feature', description: '扩展语言支持：Rust、Go、Swift 优化', featureTag: 'code-editing' },
      { type: 'improvement', description: '上下文窗口扩展至 500K tokens', featureTag: 'context' },
      { type: 'improvement', description: 'MCP 工具调用性能提升 40%', featureTag: 'mcp' },
      { type: 'fix', description: '修复 Windows PowerShell 兼容性问题' },
      { type: 'fix', description: '修复大文件（>10MB）处理超时问题' },
    ],
    metrics: { featuresAdded: 4, bugsFixed: 23, performanceGain: '40%' },
    modelSupport: ['Claude Sonnet 4', 'Claude Opus 4', 'Claude Sonnet 4.5', 'Claude 3.5 Haiku'],
  },
  {
    id: 'v1-2-0',
    version: '1.2.0',
    codename: 'Horizon',
    releaseDate: '2025-06-28',
    type: 'minor',
    summary: '推出企业级功能：团队协作、审计日志与合规控制，同时发布 Claude Code 云端工作区（测试版）。',
    highlights: ['企业级功能', '团队协作支持', '云端工作区'],
    changes: [
      { type: 'feature', description: '团队共享上下文与任务分配', featureTag: 'collaboration' },
      { type: 'feature', description: '企业审计日志与操作追踪', featureTag: 'security' },
      { type: 'feature', description: 'Claude Code Cloud Workspace（Beta）', featureTag: 'cloud' },
      { type: 'feature', description: '细粒度权限策略（Policy as Code）', featureTag: 'security' },
      { type: 'feature', description: 'Webhook 事件推送系统', featureTag: 'sdk' },
      { type: 'improvement', description: '后台代理稳定性提升，支持 72h 长任务', featureTag: 'agents' },
      { type: 'improvement', description: '改进 Token 缓存机制，降低 API 成本约 30%', featureTag: 'context' },
      { type: 'fix', description: '修复 Hooks 并发竞争条件问题', featureTag: 'hooks' },
    ],
    metrics: { featuresAdded: 5, bugsFixed: 31, performanceGain: '25%' },
    modelSupport: ['Claude Sonnet 4', 'Claude Opus 4', 'Claude Sonnet 4.5', 'Claude Haiku 4'],
  },
  {
    id: 'v1-3-0',
    version: '1.3.0',
    codename: 'Clarity',
    releaseDate: '2025-07-05',
    type: 'minor',
    summary: '聚焦可观测性与调试体验，引入内置 Agent 追踪、执行回放功能与全新的交互式差异对比界面。',
    highlights: ['Agent 追踪与回放', '交互式 Diff 界面', '可观测性增强'],
    changes: [
      { type: 'feature', description: 'Agent 执行链路追踪（Trace UI）', featureTag: 'observability' },
      { type: 'feature', description: '任务执行回放与调试器', featureTag: 'observability' },
      { type: 'feature', description: '交互式代码 Diff 审查界面', featureTag: 'ux' },
      { type: 'feature', description: 'Claude Sonnet 4.5 性能模式支持', featureTag: 'models' },
      { type: 'improvement', description: '优化 Background Agent 资源调度', featureTag: 'agents' },
      { type: 'improvement', description: 'SDK 流式响应 API 重构', featureTag: 'sdk' },
      { type: 'fix', description: '修复 MCP 长连接断线重连问题', featureTag: 'mcp' },
      { type: 'fix', description: '修复 macOS Sequoia 文件系统权限提示问题' },
    ],
    metrics: { featuresAdded: 4, bugsFixed: 19, performanceGain: '18%' },
    modelSupport: ['Claude Sonnet 4', 'Claude Opus 4', 'Claude Sonnet 4.5', 'Claude Haiku 4'],
  },
];

export const majorVersions = versions.filter(v => v.type === 'major' || v.type === 'minor');
export const getVersionById = (id: string) => versions.find(v => v.id === id);
export const getVersionByNumber = (version: string) => versions.find(v => v.version === version);
