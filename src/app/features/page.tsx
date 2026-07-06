import { features, featureCategories } from '@/data/features';
import FeatureCard from '@/components/FeatureCard';

export const metadata = {
  title: '特性演进 - Claude Code 演进门户',
};

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>首页</span>
          <span>/</span>
          <span className="text-violet-400">特性演进</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          ✨ 特性演进追踪
        </h1>
        <p className="text-[var(--muted)] text-base leading-relaxed max-w-2xl">
          选择任意特性，深入了解它从初次引入到持续迭代的完整演进历程，掌握每个能力的发展脉络。
        </p>
      </div>

      {/* Features by category */}
      {featureCategories.map((category) => {
        const categoryFeatures = features.filter(f => f.category === category);
        return (
          <div key={category} className="mb-10">
            <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span>{category}</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
