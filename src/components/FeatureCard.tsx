import { Feature } from '@/data/features';
import Link from 'next/link';

const statusColors = {
  active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  beta: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  deprecated: 'bg-red-500/20 text-red-300 border-red-500/30',
  planned: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const statusLabels = {
  active: '活跃',
  beta: '测试中',
  deprecated: '已弃用',
  planned: '规划中',
};

const impactColors = {
  low: 'bg-slate-500/20 text-slate-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-violet-500/20 text-violet-400',
  critical: 'bg-rose-500/20 text-rose-400',
};

interface FeatureCardProps {
  feature: Feature;
  compact?: boolean;
}

export default function FeatureCard({ feature, compact = false }: FeatureCardProps) {
  const latestMilestone = feature.milestones[feature.milestones.length - 1];

  return (
    <Link href={`/features/${feature.id}`}>
      <div className="h-full rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{feature.icon}</span>
            <div>
              <h3 className="font-semibold text-white text-sm">{feature.name}</h3>
              <span className="text-xs text-[var(--muted)]">{feature.category}</span>
            </div>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${statusColors[feature.currentStatus]}`}>
            {statusLabels[feature.currentStatus]}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-[var(--muted)] leading-relaxed">{feature.tagline}</p>

        {!compact && (
          <>
            {/* Milestones timeline mini */}
            <div className="flex items-center gap-1">
              {feature.milestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${impactColors[m.impact]}`}
                  title={`v${m.version}: ${m.title}`}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{feature.milestones.length} 次迭代</span>
              <span>最新: v{latestMilestone.version}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
