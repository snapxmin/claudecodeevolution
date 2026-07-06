'use client';
import { useState } from 'react';
import { practices, practiceCategories } from '@/data/practices';
import PracticeCard from '@/components/PracticeCard';

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const;
const difficultyLabels = { all: '全部', beginner: '入门', intermediate: '进阶', advanced: '高级' };

export default function PracticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = practices
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => selectedDifficulty === 'all' || p.difficulty === selectedDifficulty)
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>首页</span><span>/</span>
          <span className="text-violet-400">最佳实践</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">🎯 最佳实践</h1>
        <p className="text-[var(--muted)] text-base max-w-2xl">
          来自社区的高质量使用技巧，从项目配置到高级编排，帮你最大化 Claude Code 的生产力。
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-violet-500/20'
            }`}
          >
            全部分类
          </button>
          {practiceCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-violet-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === diff
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-white'
              }`}
            >
              {difficultyLabels[diff]}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--muted)] mb-6">
        共 <span className="text-white font-medium">{filtered.length}</span> 条实践
        {selectedCategory !== 'all' && ` · ${selectedCategory}`}
        {selectedDifficulty !== 'all' && ` · ${difficultyLabels[selectedDifficulty as keyof typeof difficultyLabels]}`}
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(practice => (
          <div
            key={practice.id}
            onClick={() => setExpandedId(expandedId === practice.id ? null : practice.id)}
            className="cursor-pointer"
          >
            <PracticeCard practice={practice} expanded={expandedId === practice.id} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--muted)]">
          <div className="text-4xl mb-3">🔍</div>
          <p>没有找到匹配的实践</p>
        </div>
      )}
    </div>
  );
}
