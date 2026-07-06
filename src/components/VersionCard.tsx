import { Version } from '@/data/versions';

const typeColors = {
  major: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  minor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  patch: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  beta: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
};

const typeLabels = {
  major: '主版本',
  minor: '次版本',
  patch: '补丁',
  beta: '测试版',
};

const changeTypeColors = {
  feature: 'text-emerald-400',
  improvement: 'text-blue-400',
  fix: 'text-amber-400',
  breaking: 'text-red-400',
};

const changeTypeIcons = {
  feature: '✦',
  improvement: '↑',
  fix: '⚡',
  breaking: '⚠',
};

interface VersionCardProps {
  version: Version;
  compact?: boolean;
  showChanges?: boolean;
}

export default function VersionCard({ version, compact = false, showChanges = true }: VersionCardProps) {
  const date = new Date(version.releaseDate).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 ${compact ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">v{version.version}</span>
              {version.codename && (
                <span className="text-xs text-[var(--muted)] font-mono">&ldquo;{version.codename}&rdquo;</span>
              )}
            </div>
            <span className="text-xs text-[var(--muted)] mt-0.5">{date}</span>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${typeColors[version.type]}`}>
          {typeLabels[version.type]}
        </span>
      </div>

      {/* Summary */}
      <p className={`text-[var(--muted)] leading-relaxed ${compact ? 'text-xs line-clamp-2' : 'text-sm'}`}>
        {version.summary}
      </p>

      {/* Highlights */}
      {!compact && version.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {version.highlights.map((h, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-[var(--muted)] border border-[var(--border)]">
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Changes */}
      {showChanges && !compact && (
        <div className="mt-4 space-y-1.5">
          {version.changes.slice(0, 5).map((change, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={`${changeTypeColors[change.type]} shrink-0 mt-0.5 font-bold`}>
                {changeTypeIcons[change.type]}
              </span>
              <span className="text-[var(--muted)]">{change.description}</span>
            </div>
          ))}
          {version.changes.length > 5 && (
            <p className="text-xs text-[var(--muted)] pl-4">还有 {version.changes.length - 5} 项变更...</p>
          )}
        </div>
      )}

      {/* Metrics */}
      {!compact && version.metrics && (
        <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 text-xs">✦</span>
            <span className="text-xs text-[var(--muted)]">{version.metrics.featuresAdded} 新特性</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 text-xs">⚡</span>
            <span className="text-xs text-[var(--muted)]">{version.metrics.bugsFixed} 修复</span>
          </div>
          {version.metrics.performanceGain && (
            <div className="flex items-center gap-1.5">
              <span className="text-blue-400 text-xs">↑</span>
              <span className="text-xs text-[var(--muted)]">{version.metrics.performanceGain} 性能提升</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
