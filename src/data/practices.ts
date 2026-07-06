export interface Practice {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  description: string;
  tips: string[];
  example?: string;
  author: string;
  upvotes: number;
  source: string;
}

export const practices: Practice[] = [
  {
    id: 'p1',
    title: '善用 CLAUDE.md 建立项目记忆',
    category: '项目配置',
    difficulty: 'beginner',
    tags: ['CLAUDE.md', '上下文', '项目规范'],
    description: '在项目根目录创建 CLAUDE.md 文件，将项目架构、编码规范、常用命令写入其中，Claude Code 会在每次会话时自动读取并遵守这些约定，减少重复解释。',
    tips: [
      '描述项目的技术栈和主要依赖',
      '列出禁止修改的核心文件和目录',
      '记录常用测试/构建命令',
      '说明代码风格要求（如单引号、缩进规则）',
      '记录已知问题和临时 workaround',
    ],
    example: `# CLAUDE.md\n\n## 项目概述\n这是一个 Next.js 14 App Router 项目。\n\n## 技术栈\n- Next.js 14, TypeScript, Tailwind CSS\n- 状态管理: Zustand\n- 测试: Vitest + Testing Library\n\n## 重要规则\n- 不要修改 src/generated/ 目录（自动生成）\n- 提交前运行 npm run lint\n- 使用 pnpm 而非 npm\n\n## 常用命令\npnpm dev       # 启动开发服务器\npnpm test      # 运行测试\npnpm build     # 构建生产版本`,
    author: '@anthropic_docs',
    upvotes: 1247,
    source: 'Anthropic 官方文档',
  },
  {
    id: 'p2',
    title: '用 Hooks 自动化代码格式化',
    category: '工作流自动化',
    difficulty: 'intermediate',
    tags: ['Hooks', '格式化', 'PostTool'],
    description: '配置 PostTool Hook，在每次文件写入后自动运行 Prettier/ESLint，确保 AI 生成的代码符合团队规范，无需手动格式化。',
    tips: [
      '使用 PostTool Hook 在文件修改后触发格式化',
      '区分不同文件类型使用不同 linter',
      '将 Hook 配置纳入项目版本控制',
      '在 CI 中验证 Hook 结果',
    ],
    example: `// .claude/hooks.json\n{\n  "hooks": {\n    "PostTool": [\n      {\n        "matcher": "Write|Edit",\n        "hooks": [{\n          "type": "command",\n          "command": "npx prettier --write \\"$CLAUDE_FILE_PATHS\\""\n        }]\n      }\n    ]\n  }\n}`,
    author: '@devuser_chen',
    upvotes: 892,
    source: '社区分享',
  },
  {
    id: 'p3',
    title: '使用 /compact 控制上下文长度',
    category: '性能优化',
    difficulty: 'beginner',
    tags: ['上下文', '成本控制', '性能'],
    description: '在长对话中定期使用 /compact 命令压缩历史对话，保留关键信息的同时减少 Token 消耗，避免达到上下文限制时突然丢失重要内容。',
    tips: [
      '完成一个子任务后执行 /compact',
      '在切换到新功能模块前压缩上下文',
      '保存重要决策到 CLAUDE.md 后再压缩',
      '避免在关键操作中途压缩',
    ],
    author: '@token_saver',
    upvotes: 743,
    source: '社区最佳实践',
  },
  {
    id: 'p4',
    title: '为复杂任务编写详细的初始 Prompt',
    category: '提示工程',
    difficulty: 'intermediate',
    tags: ['提示工程', '任务分解', '准确性'],
    description: '在开始复杂任务（如大型重构、新功能开发）前，花时间写清楚目标、约束条件和验收标准。详细的初始 Prompt 比后续反复纠正更高效。',
    tips: [
      '描述期望的输入输出，提供示例',
      '明确说明不应该改动的内容',
      '提供相关文件路径作为参考',
      '列出验收标准（测试要通过等）',
      '说明技术约束（避免引入新依赖等）',
    ],
    author: '@prompt_master',
    upvotes: 1105,
    source: '高效使用指南',
  },
  {
    id: 'p5',
    title: '利用 Sub-agent 并行处理独立任务',
    category: '高级技巧',
    difficulty: 'advanced',
    tags: ['Sub-agent', '并行', '效率'],
    description: '对于相互独立的任务（如为多个模块编写测试、生成多语言翻译），使用 Sub-agent 并行执行可以将完成时间缩短 3-5 倍。',
    tips: [
      '确保子任务之间没有依赖关系',
      '为每个 Agent 提供独立的上下文',
      '汇总 Agent 结果时检查一致性',
      '监控并发 Agent 的 Token 消耗',
    ],
    example: `// 并行为 5 个模块生成测试\nclaudie task "为以下模块并行生成单元测试：\n- src/auth/\n- src/user/\n- src/payment/\n- src/notification/\n- src/analytics/\n使用 Vitest，每个模块独立运行"`,
    author: '@parallel_dev',
    upvotes: 678,
    source: '效率提升技巧',
  },
  {
    id: 'p6',
    title: '用 Background Agent 处理耗时迁移',
    category: '高级技巧',
    difficulty: 'advanced',
    tags: ['Background Agent', '迁移', '大规模'],
    description: '使用 Background Agent 执行大规模代码迁移（如从 JS 到 TS、框架升级），无需等待完成，Agent 在后台持续运行，完成后通知你审查结果。',
    tips: [
      '迁移前创建独立分支',
      '设置 Webhook 在完成时通知',
      '提供清晰的迁移规则文档给 Agent',
      '分批次迁移，每批 PR 独立审查',
    ],
    author: '@migration_expert',
    upvotes: 534,
    source: '大型项目实践',
  },
  {
    id: 'p7',
    title: 'MCP 工具扩展：连接私有 API',
    category: 'MCP 生态',
    difficulty: 'advanced',
    tags: ['MCP', '自定义工具', 'API'],
    description: '为公司内部 API 创建 MCP Server，让 Claude Code 能够直接查询数据库、调用内部服务，实现真正的企业级自动化。',
    tips: [
      '从简单的只读工具开始',
      '为工具添加详细描述，帮助模型正确使用',
      '实现完善的错误处理和超时机制',
      '遵守最小权限原则',
    ],
    author: '@mcp_builder',
    upvotes: 445,
    source: 'MCP 开发指南',
  },
  {
    id: 'p8',
    title: '版本控制：每步操作后 commit',
    category: '工作流自动化',
    difficulty: 'beginner',
    tags: ['Git', '安全', '回滚'],
    description: '在让 Claude Code 执行较大变更前，先 commit 当前状态。AI 操作失误时可以快速回滚，保证代码安全。',
    tips: [
      '每次会话开始前确认 git status 干净',
      '指令 Claude Code 每完成一个子任务即 commit',
      '使用语义化的 commit 信息',
      '在独立分支上操作，避免影响主分支',
    ],
    author: '@git_safety',
    upvotes: 923,
    source: '安全最佳实践',
  },
];

export const practiceCategories = [...new Set(practices.map(p => p.category))];
export const getPracticeById = (id: string) => practices.find(p => p.id === id);
export const getPracticesByCategory = (category: string) => practices.filter(p => p.category === category);
