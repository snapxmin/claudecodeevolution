'use client';
import { useState } from 'react';
import { versions } from '@/data/versions';

const typeColors: Record<string, string> = {
  feature: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  improvement: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  fix: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  breaking: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const typeLabels: Record<string, string> = {
  feature: '新特性',
  improvement: '改进',
  fix: '修复',
  breaking: '破坏性',
};

export default function ComparePage() {
  const [leftId, setLeftId] = useState(versions[0].id);
  const [rightId, setRightId] = useState(versions[versions.length - 1].id);

  const leftVersion = versions.find(v => v.id === leftId)!;
  const rightVersion = versions.find(v => v.id === rightId)!;

  const timeSpanDays = Math.round(
    (new Date(rightVersion.releaseDate).getTime() - new Date(leftVersion.releaseDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const leftFeatures = new Set(leftVersion.changes.filter(c => c.type === 'feature').map(c => c.featureTag).filter(Boolean));
  const rightFeatures = new Set(rightVersion.changes.filter(c => c.type === 'feature').map(c => c.featureTag).filter(Boolean));
  const newFeatureTags = [...rightFeatures].filter(t => !leftFeatures.has(t));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>首页</span><span>/</span>
          <span className="text-violet-400">版本对比</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">⚖️ 大版本对比分析</h1>
        <p className="text-[var(--muted)] text-base max-w-2xl">
          选择任意两个版本，深度解析版本间的功能差异、架构演进与改进重点。
        </p>
      </div>

      {/* Version Selectors */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">基准版本</label>
          <select
            value={leftId}
            onChange={(e) => setLeftId(e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          >
            {versions.map(v => (
              <option key={v.id} value={v.id} disabled={v.id === rightId}>
                v{v.version} — {v.codename || ''}  ({v.releaseDate})
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <label className="block text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wider">对比版本</label>
          <select
            value={rightId}
            onChange={(e) => setRightId(e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          >
            {versions.map(v => (
              <option key={v.id} value={v.id} disabled={v.id === leftId}>
                v{v.version} — {v.codename || ''}  ({v.releaseDate})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delta Summary */}
      {leftVersion && rightVersion && (
        <>
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 mb-8">
            <h3 className="text-sm font-semibold text-violet-300 mb-3">📊 版本差异概览</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{timeSpanDays}</div>
                <div className="text-xs text-[var(--muted)]">相差天数</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${(rightVersion.metrics?.featuresAdded || 0) - (leftVersion.metrics?.featuresAdded || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(rightVersion.metrics?.featuresAdded || 0) >= (leftVersion.metrics?.featuresAdded || 0) ? '+' : ''}
                  {(rightVersion.metrics?.featuresAdded || 0) - (leftVersion.metrics?.featuresAdded || 0)}
                </div>
                <div className="text-xs text-[var(--muted)]">新特性差值</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {rightVersion.metrics?.bugsFixed || 0}
                </div>
                <div className="text-xs text-[var(--muted)]">右版本修复数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {newFeatureTags.length}
                </div>
                <div className="text-xs text-[var(--muted)]">新增能力域</div>
              </div>
            </div>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { version: leftVersion, label: '基准版本', accent: 'border-slate-500/30', badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
              { version: rightVersion, label: '对比版本', accent: 'border-violet-500/30', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
            ].map(({ version, label, accent, badge }) => (
              <div key={version.id} className={`rounded-xl border ${accent} bg-[var(--card)] overflow-hidden`}>
                {/* Version Header */}
                <div className="p-5 border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl font-bold text-white">v{version.version}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge}`}>{label}</span>
                  </div>
                  {version.codename && <p className="text-xs text-[var(--muted)] italic">&ldquo;{version.codename}&rdquo;</p>}
                  <p className="text-xs text-[var(--muted)] mt-1">{new Date(version.releaseDate).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Summary */}
                <div className="p-5 border-b border-[var(--border)]">
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{version.summary}</p>
                </div>

                {/* Highlights */}
                <div className="p-5 border-b border-[var(--border)]">
                  <h4 className="text-xs font-semibold text-white mb-2">核心亮点</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {version.highlights.map((h, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-[var(--border)] text-[var(--muted)]">{h}</span>
                    ))}
                  </div>
                </div>

                {/* Changes */}
                <div className="p-5 border-b border-[var(--border)]">
                  <h4 className="text-xs font-semibold text-white mb-3">变更列表</h4>
                  <div className="space-y-2">
                    {version.changes.map((change, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${typeColors[change.type]} shrink-0 mt-0.5`}>
                          {typeLabels[change.type]}
                        </span>
                        <span className="text-xs text-[var(--muted)] leading-relaxed">{change.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Models */}
                <div className="p-5 border-b border-[var(--border)]">
                  <h4 className="text-xs font-semibold text-white mb-2">支持模型</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {version.modelSupport.map((m, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                {version.metrics && (
                  <div className="p-5">
                    <h4 className="text-xs font-semibold text-white mb-3">版本指标</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center rounded-lg bg-white/5 p-2">
                        <div className="text-lg font-bold text-emerald-400">{version.metrics.featuresAdded}</div>
                        <div className="text-xs text-[var(--muted)]">新特性</div>
                      </div>
                      <div className="text-center rounded-lg bg-white/5 p-2">
                        <div className="text-lg font-bold text-amber-400">{version.metrics.bugsFixed}</div>
                        <div className="text-xs text-[var(--muted)]">修复数</div>
                      </div>
                      <div className="text-center rounded-lg bg-white/5 p-2">
                        <div className="text-lg font-bold text-blue-400">{version.metrics.performanceGain || 'N/A'}</div>
                        <div className="text-xs text-[var(--muted)]">性能提升</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analysis Section */}
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-base font-bold text-white mb-4">🔍 演进分析</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 mb-3">新增能力</h4>
                {newFeatureTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {newFeatureTags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        + {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--muted)]">两版本能力域基本重叠</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-violet-400 mb-3">模型支持演进</h4>
                {(() => {
                  const leftModels = new Set(leftVersion.modelSupport);
                  const rightModels = new Set(rightVersion.modelSupport);
                  const added = rightVersion.modelSupport.filter(m => !leftModels.has(m));
                  const removed = leftVersion.modelSupport.filter(m => !rightModels.has(m));
                  return (
                    <div className="space-y-2">
                      {added.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-400">+</span>
                          <span className="text-[var(--muted)]">{m}</span>
                        </div>
                      ))}
                      {removed.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="text-red-400">-</span>
                          <span className="text-[var(--muted)] line-through">{m}</span>
                        </div>
                      ))}
                      {added.length === 0 && removed.length === 0 && (
                        <p className="text-xs text-[var(--muted)]">模型支持无变化</p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
