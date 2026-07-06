import Link from 'next/link';
import { versions } from '@/data/versions';
import { features } from '@/data/features';
import { feedbackItems } from '@/data/feedback';

const stats = [
  { label: '版本迭代', value: versions.length.toString(), unit: '个', icon: '📦' },
  { label: '核心特性', value: features.length.toString(), unit: '项', icon: '✨' },
  { label: '社区反馈', value: feedbackItems.length.toString(), unit: '条', icon: '💬' },
  { label: '最新版本', value: `v${versions[versions.length - 1].version}`, unit: '', icon: '🚀' },
];

const navCards = [
  {
    href: '/history',
    icon: '📜',
    title: '版本演进历史',
    desc: '从 Beta 到今天的完整时间线，每个版本的变更细节一览无遗',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'hover:border-violet-500/40',
  },
  {
    href: '/features',
    icon: '✨',
    title: '特性演进追踪',
    desc: '选择任意特性，查看它从诞生到成熟的完整迭代历程',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'hover:border-blue-500/40',
  },
  {
    href: '/compare',
    icon: '⚖️',
    title: '大版本对比分析',
    desc: '并排对比任意两个版本的差异，深度解析架构演进',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-500/40',
  },
  {
    href: '/practices',
    icon: '🎯',
    title: '最佳实践',
    desc: '社区精选的高效使用技巧，从入门到高级全覆盖',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'hover:border-amber-500/40',
  },
  {
    href: '/feedback',
    icon: '💬',
    title: '用户反馈',
    desc: '真实用户的吐槽、建议与称赞，了解产品的真实口碑',
    color: 'from-rose-500/20 to-pink-500/10',
    border: 'hover:border-rose-500/40',
  },
];

const latestVersions = versions.slice(-3).reverse();

export default function HomePage() {
  return (
    <div className="grid-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-glow" />
            最新版本: v{versions[versions.length - 1].version} · {versions[versions.length - 1].codename}
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="gradient-text">Claude Code</span>
            <br />
            <span className="text-white">演进全景</span>
          </h1>

          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            追踪 AI 编程助手的每一步演进 · 洞察特性发展脉络 <br className="hidden sm:block" />
            深度版本对比 · 社区智慧沉淀
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/history"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
            >
              查看演进历史 →
            </Link>
            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-semibold text-sm hover:border-violet-500/40 hover:bg-[var(--card-hover)] transition-all"
            >
              版本对比分析
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">
                {stat.value}
                <span className="text-sm text-[var(--muted)] font-normal ml-1">{stat.unit}</span>
              </div>
              <div className="text-xs text-[var(--muted)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-white mb-6">探索门户</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <div className={`h-full rounded-xl border border-[var(--border)] ${card.border} bg-gradient-to-br ${card.color} p-5 transition-all duration-300 hover:shadow-lg cursor-pointer`}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-white mb-1.5">{card.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Versions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">最近更新</h2>
          <Link href="/history" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            查看全部 →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestVersions.map((v) => (
            <div key={v.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">v{v.version}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {new Date(v.releaseDate).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              {v.codename && <p className="text-xs text-[var(--muted)] italic mb-2">&ldquo;{v.codename}&rdquo;</p>}
              <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">{v.summary}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {v.highlights.slice(0, 2).map((h, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-[var(--border)] text-[var(--muted)]">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[var(--muted)]">
          <p>Claude Code 演进门户 · 数据来源于官方公告与社区贡献</p>
          <p className="mt-1">本站为非官方社区项目，与 Anthropic 无隶属关系</p>
        </div>
      </footer>
    </div>
  );
}
