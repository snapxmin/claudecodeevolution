import { features, getFeatureById } from '@/data/features';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return features.map((f) => ({ slug: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeatureById(slug);
  return { title: feature ? `${feature.name} 演进 - Claude Code 演进门户` : '特性详情' };
}

const impactColors = {
  low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  medium: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  high: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  critical: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const impactLabels = { low: '低', medium: '中', high: '高', critical: '关键' };

const statusColors = {
  introduced: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  improved: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  stabilized: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  deprecated: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const statusLabels = { introduced: '首次引入', improved: '功能强化', stabilized: '趋于成熟', deprecated: '已弃用' };

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeatureById(slug);
  if (!feature) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-violet-400 transition-colors">首页</Link>
        <span>/</span>
        <Link href="/features" className="hover:text-violet-400 transition-colors">特性演进</Link>
        <span>/</span>
        <span className="text-violet-400">{feature.name}</span>
      </div>

      {/* Feature Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{feature.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{feature.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-[var(--border)] text-[var(--muted)]">
                {feature.category}
              </span>
            </div>
            <p className="text-violet-300 text-sm font-medium mb-3">{feature.tagline}</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{feature.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--border)]">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{feature.milestones.length}</div>
            <div className="text-xs text-[var(--muted)]">迭代次数</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">v{feature.milestones[0].version}</div>
            <div className="text-xs text-[var(--muted)]">首次引入</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">v{feature.milestones[feature.milestones.length - 1].version}</div>
            <div className="text-xs text-[var(--muted)]">最新版本</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <h2 className="text-lg font-bold text-white mb-6">演进时间线</h2>
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 to-transparent" />
        <div className="space-y-6">
          {feature.milestones.map((milestone, index) => {
            const date = new Date(milestone.date).toLocaleDateString('zh-CN', {
              year: 'numeric', month: 'long', day: 'numeric'
            });
            return (
              <div key={index} className="relative pl-14">
                {/* Dot */}
                <div className="absolute left-3 top-4 w-4 h-4 rounded-full border-2 border-violet-500 bg-[var(--background)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-violet-500/30 transition-all p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{milestone.title}</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{date}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[milestone.status]}`}>
                        {statusLabels[milestone.status]}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${impactColors[milestone.impact]}`}>
                        影响: {impactLabels[milestone.impact]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{milestone.description}</p>
                  <div className="mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      v{milestone.version}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Related Features */}
      {feature.relatedFeatures.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-white mb-4">相关特性</h2>
          <div className="flex flex-wrap gap-3">
            {feature.relatedFeatures.map((id) => {
              const rel = features.find(f => f.id === id);
              if (!rel) return null;
              return (
                <Link key={id} href={`/features/${id}`}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-violet-500/30 transition-all text-sm">
                    <span>{rel.icon}</span>
                    <span className="text-[var(--muted)] hover:text-white transition-colors">{rel.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
