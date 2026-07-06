import { versions } from '@/data/versions';
import VersionCard from '@/components/VersionCard';

export const metadata = {
  title: '版本历史 - Claude Code 演进门户',
};

const typeLabels: Record<string, string> = {
  major: '主版本',
  minor: '次版本',
  patch: '补丁',
  beta: '测试版',
};

const typeColors: Record<string, string> = {
  major: 'text-violet-400',
  minor: 'text-blue-400',
  patch: 'text-emerald-400',
  beta: 'text-amber-400',
};

export default function HistoryPage() {
  const sortedVersions = [...versions].reverse();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>首页</span>
          <span>/</span>
          <span className="text-violet-400">版本历史</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          📜 版本演进历史
        </h1>
        <p className="text-[var(--muted)] text-base leading-relaxed max-w-2xl">
          从 2025 年 2 月首次测试版到今日，追踪 Claude Code 每一个版本的发展历程、功能变更与技术演进。
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <span className="text-xs text-[var(--muted)] font-medium mr-2">版本类型：</span>
        {Object.entries(typeLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full bg-current ${typeColors[key]}`} />
            <span className={`text-xs ${typeColors[key]}`}>{label}</span>
          </div>
        ))}
        <div className="ml-auto flex gap-4 text-xs text-[var(--muted)]">
          <span>✦ 新特性</span>
          <span>↑ 改进</span>
          <span>⚡ 修复</span>
          <span>⚠ 破坏性变更</span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: '总版本数', value: versions.length, color: 'text-white' },
          { label: '新增特性', value: versions.reduce((s, v) => s + (v.metrics?.featuresAdded || 0), 0), color: 'text-emerald-400' },
          { label: '修复问题', value: versions.reduce((s, v) => s + (v.metrics?.bugsFixed || 0), 0), color: 'text-amber-400' },
          { label: '跨度（月）', value: Math.round((new Date(versions[versions.length - 1].releaseDate).getTime() - new Date(versions[0].releaseDate).getTime()) / (1000 * 60 * 60 * 24 * 30)), color: 'text-blue-400' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
            <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-xs text-[var(--muted)] mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/30 to-transparent hidden sm:block" />

        <div className="space-y-6">
          {sortedVersions.map((version, index) => (
            <div key={version.id} className="relative sm:pl-16">
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-violet-500 bg-[var(--background)] hidden sm:flex items-center justify-center z-10">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  version.type === 'major' ? 'bg-violet-400' :
                  version.type === 'minor' ? 'bg-blue-400' :
                  version.type === 'beta' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
              </div>

              {/* Year marker */}
              {(index === 0 || new Date(version.releaseDate).getFullYear() !== new Date(sortedVersions[index - 1].releaseDate).getFullYear()) && (
                <div className="hidden sm:flex absolute left-0 -top-2 items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="w-3 h-px bg-[var(--border)]" />
                </div>
              )}

              <VersionCard version={version} showChanges={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
