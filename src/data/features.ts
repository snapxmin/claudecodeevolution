export interface FeatureMilestone {
  version: string;
  date: string;
  title: string;
  description: string;
  status: 'introduced' | 'improved' | 'stabilized' | 'deprecated';
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface Feature {
  id: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  currentStatus: 'active' | 'beta' | 'deprecated' | 'planned';
  milestones: FeatureMilestone[];
  relatedFeatures: string[];
}

export const features: Feature[] = [
  {
    id: 'code-editing',
    name: '代码编辑',
    category: '核心能力',
    icon: '✏️',
    tagline: '智能代码生成与精准多文件编辑',
    description: '从单文件生成到跨仓库重构，代码编辑能力随版本持续深化，已成为 Claude Code 最核心的生产力引擎。',
    currentStatus: 'active',
    milestones: [
      { version: '0.1.0', date: '2025-02-24', title: '基础代码生成', description: '支持单文件创建与编辑，理解自然语言指令生成代码片段。', status: 'introduced', impact: 'critical' },
      { version: '0.2.0', date: '2025-03-15', title: '多文件同步编辑', description: '引入跨文件原子编辑操作，确保重构时文件间一致性。', status: 'improved', impact: 'high' },
      { version: '0.3.0', date: '2025-04-03', title: '语义搜索集成', description: '结合 ripgrep 语义搜索定位代码引用，减少幻觉式修改。', status: 'improved', impact: 'high' },
      { version: '1.0.0', date: '2025-05-22', title: '大规模重构能力', description: 'Claude Sonnet 4 加持下支持万行级代码库重构，配合差异预览精准确认变更。', status: 'improved', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: 'Rust/Go/Swift 深度支持', description: '扩展语言模型，为系统编程语言提供编译器级别的错误理解。', status: 'improved', impact: 'medium' },
      { version: '1.3.0', date: '2025-07-05', title: '交互式 Diff 审查', description: '引入可视化 Diff 界面，开发者可逐 hunk 确认修改，提升安全性。', status: 'stabilized', impact: 'high' },
    ],
    relatedFeatures: ['terminal', 'memory', 'search'],
  },
  {
    id: 'terminal',
    name: '终端集成',
    category: '核心能力',
    icon: '⌨️',
    tagline: '原生 Shell 执行与智能命令生成',
    description: '直接在 AI 对话中执行终端命令、运行测试、管理进程，实现"说到做到"的全流程自动化。',
    currentStatus: 'active',
    milestones: [
      { version: '0.1.0', date: '2025-02-24', title: '终端命令执行', description: '初步支持 bash/zsh 命令执行，可运行构建脚本与测试。', status: 'introduced', impact: 'critical' },
      { version: '0.2.0', date: '2025-03-15', title: '命令输出理解', description: '对命令输出（stderr/stdout）进行语义分析并自动修复错误。', status: 'improved', impact: 'high' },
      { version: '1.0.0', date: '2025-05-22', title: '权限沙箱控制', description: '引入命令白名单机制，用户可精细控制允许执行的命令范围。', status: 'improved', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: 'Windows 兼容', description: '修复 PowerShell 兼容性，支持 Windows 开发环境。', status: 'stabilized', impact: 'medium' },
    ],
    relatedFeatures: ['security', 'agents'],
  },
  {
    id: 'mcp',
    name: 'MCP 协议',
    category: '扩展能力',
    icon: '🔌',
    tagline: '开放的工具生态与服务集成标准',
    description: 'Model Context Protocol 让 Claude Code 成为可扩展平台，任何服务都可以通过标准接口接入，构建无限扩展的 AI 工具链。',
    currentStatus: 'active',
    milestones: [
      { version: '0.3.0', date: '2025-04-03', title: 'MCP 协议初步支持', description: '实现 stdio 模式 MCP 服务器，提供 GitHub、文件系统等内置工具。', status: 'introduced', impact: 'critical' },
      { version: '0.4.0', date: '2025-04-28', title: 'HTTP MCP 服务器', description: '支持 HTTP/SSE 模式的 MCP 服务器，实现远程工具调用。', status: 'improved', impact: 'high' },
      { version: '1.0.0', date: '2025-05-22', title: 'MCP 规范正式化', description: '迁移至 MCP 1.0 规范，废弃旧版 tool_use 格式，生态兼容性大幅提升。', status: 'stabilized', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: '调用性能优化', description: 'MCP 工具调用延迟降低 40%，支持工具并发调用。', status: 'improved', impact: 'high' },
      { version: '1.3.0', date: '2025-07-05', title: '长连接稳定性', description: '修复断线重连问题，MCP 连接在长任务中保持稳定。', status: 'stabilized', impact: 'medium' },
    ],
    relatedFeatures: ['github', 'web-search', 'sdk'],
  },
  {
    id: 'agents',
    name: '多智能体',
    category: '协作能力',
    icon: '🤖',
    tagline: '并行 Sub-agent 与后台任务执行',
    description: '从单一对话到多 Agent 编排，Claude Code 可以将复杂任务分解为并行子任务，由多个专业 Agent 协同完成，效率呈数量级提升。',
    currentStatus: 'active',
    milestones: [
      { version: '0.4.0', date: '2025-04-28', title: 'Sub-agent 框架发布', description: '引入子代理架构，支持并行代码生成、测试、文档任务。', status: 'introduced', impact: 'critical' },
      { version: '1.0.0', date: '2025-05-22', title: 'Background Agent', description: '支持后台异步长任务，Claude Code 关闭后任务继续运行。', status: 'improved', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: 'Agent SDK 正式版', description: 'TypeScript/Python SDK 稳定版，支持自定义 Agent 编排逻辑。', status: 'stabilized', impact: 'high' },
      { version: '1.2.0', date: '2025-06-28', title: '72h 长任务支持', description: '后台代理可运行最长 72 小时，适合大型迁移项目。', status: 'improved', impact: 'high' },
      { version: '1.3.0', date: '2025-07-05', title: '资源调度优化', description: '改进多 Agent 并发下的 CPU/内存调度，减少资源争用。', status: 'improved', impact: 'medium' },
    ],
    relatedFeatures: ['hooks', 'sdk', 'github'],
  },
  {
    id: 'memory',
    name: '记忆系统',
    category: '上下文管理',
    icon: '🧠',
    tagline: '跨会话持久化上下文与项目记忆',
    description: '通过 CLAUDE.md 项目记忆文件与跨会话持久化机制，Claude Code 能够记住项目约定、个人偏好与历史决策，越用越懂你的团队。',
    currentStatus: 'active',
    milestones: [
      { version: '0.1.0', date: '2025-02-24', title: 'CLAUDE.md 项目记忆', description: '支持在项目根目录创建 CLAUDE.md，存储项目级别的上下文信息。', status: 'introduced', impact: 'high' },
      { version: '0.2.0', date: '2025-03-15', title: '长上下文优化', description: '上下文窗口扩展到 200K tokens，智能压缩历史对话。', status: 'improved', impact: 'high' },
      { version: '1.0.0', date: '2025-05-22', title: '跨会话持久化记忆', description: '持久化记忆系统发布，用户偏好与决策记录跨会话保留。', status: 'improved', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: '500K 上下文窗口', description: '支持 500K tokens 的超长上下文，适合大型代码库分析。', status: 'improved', impact: 'high' },
      { version: '1.2.0', date: '2025-06-28', title: 'Token 缓存优化', description: '改进 Token 缓存机制，重复内容复用减少 API 调用成本约 30%。', status: 'improved', impact: 'medium' },
    ],
    relatedFeatures: ['context', 'code-editing'],
  },
  {
    id: 'hooks',
    name: 'Hooks 系统',
    category: '自动化',
    icon: '🪝',
    tagline: '可编程的 AI 操作拦截与自动化',
    description: 'Hooks 机制允许在 AI 操作的各个阶段注入自定义逻辑，实现代码格式化、安全检查、通知推送等自动化工作流。',
    currentStatus: 'active',
    milestones: [
      { version: '1.0.0', date: '2025-05-22', title: 'Hooks 系统发布', description: '提供 PreTool、PostTool、Stop、Notification 四种 Hook 事件。', status: 'introduced', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: 'Hook 性能优化', description: '异步 Hook 执行不再阻塞主流程，响应速度提升 3x。', status: 'improved', impact: 'high' },
      { version: '1.2.0', date: '2025-06-28', title: '修复并发问题', description: '修复多 Agent 并发时 Hooks 产生的竞争条件，保证执行顺序。', status: 'stabilized', impact: 'high' },
    ],
    relatedFeatures: ['agents', 'security', 'sdk'],
  },
  {
    id: 'github',
    name: 'GitHub 集成',
    category: '版本控制',
    icon: '🐙',
    tagline: '从 PR 到 Actions 的全流程 Git 自动化',
    description: '深度集成 GitHub 工作流，支持自动创建 PR、代码审查、GitHub Actions CI/CD 触发，让 AI 真正融入团队开发流程。',
    currentStatus: 'active',
    milestones: [
      { version: '0.1.0', date: '2025-02-24', title: '基础 Git 操作', description: '支持 commit、push、branch 等基础 Git 命令执行。', status: 'introduced', impact: 'high' },
      { version: '0.3.0', date: '2025-04-03', title: 'GitHub MCP 集成', description: 'GitHub MCP Server 内置，支持 Issue、PR、Code 全 API 操作。', status: 'improved', impact: 'critical' },
      { version: '0.4.0', date: '2025-04-28', title: 'GitHub Actions', description: '在 CI/CD 工作流中原生运行 Claude Code，自动化测试修复与部署。', status: 'improved', impact: 'critical' },
      { version: '1.1.0', date: '2025-06-10', title: '智能 PR Review', description: '自动分析 PR 变更，生成带上下文的代码审查意见。', status: 'improved', impact: 'high' },
    ],
    relatedFeatures: ['mcp', 'agents', 'code-editing'],
  },
  {
    id: 'security',
    name: '安全与权限',
    category: '安全',
    icon: '🔒',
    tagline: '细粒度沙箱控制与企业合规支持',
    description: '从命令白名单到企业级审计日志，Claude Code 提供多层次安全机制，确保 AI 操作在可控边界内执行。',
    currentStatus: 'active',
    milestones: [
      { version: '0.2.0', date: '2025-03-15', title: '文件权限检查', description: '编辑操作前进行文件权限验证，防止意外修改敏感文件。', status: 'introduced', impact: 'high' },
      { version: '1.0.0', date: '2025-05-22', title: '交互式权限管理', description: '细粒度沙箱控制系统，用户可为每个工具类型设置访问策略。', status: 'improved', impact: 'critical' },
      { version: '1.2.0', date: '2025-06-28', title: '企业审计日志', description: '完整的操作追踪与审计日志，满足企业合规要求。', status: 'improved', impact: 'high' },
      { version: '1.2.0', date: '2025-06-28', title: 'Policy as Code', description: '支持通过代码定义安全策略，集成到 CI/CD 流程。', status: 'introduced', impact: 'high' },
    ],
    relatedFeatures: ['terminal', 'hooks', 'github'],
  },
];

export const featureCategories = [...new Set(features.map(f => f.category))];
export const getFeatureById = (id: string) => features.find(f => f.id === id);
export const getFeaturesByCategory = (category: string) => features.filter(f => f.category === category);
