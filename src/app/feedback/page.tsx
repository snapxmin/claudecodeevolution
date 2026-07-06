'use client';
import { useState } from 'react';
import { feedbackItems, feedbackCategories } from '@/data/feedback';
import FeedbackCard from '@/components/FeedbackCard';

type FeedbackType = 'all' | 'complaint' | 'suggestion' | 'praise';
type SortKey = 'upvotes' | 'comments' | 'date';

const typeFilters: { value: FeedbackType; label: string; icon: string; color: string }[] = [
  { value: 'all', label: '全部', icon: '📋', color: '' },
  { value: 'complaint', label: '吐槽', icon: '😤', color: 'text-red-400' },
  { value: 'suggestion', label: '建议', icon: '💡', color: 'text-blue-400' },
  { value: 'praise', label: '称赞', icon: '🙌', color: 'text-emerald-400' },
];

export default function FeedbackPage() {
  const [typeFilter, setTypeFilter] = useState<FeedbackType>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortKey>('upvotes');

  const filtered = feedbackItems
    .filter(f => typeFilter === 'all' || f.type === typeFilter)
    .filter(f => categoryFilter === 'all' || f.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      if (sortBy === 'comments') return b.comments - a.comments;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const totalUpvotes = feedbackItems.reduce((s, f) => s + f.upvotes, 0);
  const complaints = feedbackItems.filter(f => f.type === 'complaint').length;
  const suggestions = feedbackItems.filter(f => f.type === 'suggestion').length;
  const inProgress = feedbackItems.filter(f => f.status === 'in-progress').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>首页</span><span>/</span>
          <span className="text-violet-400">用户反馈</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">💬 用户反馈</h1>
        <p className="text-[var(--muted)] text-base max-w-2xl">
          真实用户的声音 —— 吐槽点、改进建议与使用称赞，了解 Claude Code 在实际使用中的口碑与期望。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: '总反馈量', value: feedbackItems.length, color: 'text-white', icon: '📊' },
          { label: '用户吐槽', value: complaints, color: 'text-red-400', icon: '😤' },
          { label: '功能建议', value: suggestions, color: 'text-blue-400', icon: '💡' },
          { label: '处理中', value: inProgress, color: 'text-amber-400', icon: '⚙️' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-[var(--muted)] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hottest complaint banner */}
      {(() => {
        const top = feedbackItems.filter(f => f.type === 'complaint').sort((a, b) => b.upvotes - a.upvotes)[0];
        if (!top) return null;
        return (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">🔥 最热吐槽</span>
              <span className="text-xs text-[var(--muted)]">· {top.upvotes.toLocaleString()} 人赞同</span>
            </div>
            <p className="text-sm text-white font-medium">{top.title}</p>
          </div>
        );
      })()}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Type filters */}
        <div className="flex gap-2 flex-wrap">
          {typeFilters.map(tf => (
            <button
              key={tf.value}
              onClick={() => setTypeFilter(tf.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                typeFilter === tf.value
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-white'
              }`}
            >
              <span>{tf.icon}</span>
              <span>{tf.label}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2 ml-auto">
          {([['upvotes', '最多赞'], ['comments', '最多评论'], ['date', '最新']] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                sortBy === key
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'border border-[var(--border)] text-[var(--muted)] hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-2.5 py-1 rounded-md text-xs transition-all ${
            categoryFilter === 'all'
              ? 'bg-white/10 text-white'
              : 'text-[var(--muted)] hover:text-white'
          }`}
        >
          全部分类
        </button>
        {feedbackCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2.5 py-1 rounded-md text-xs transition-all ${
              categoryFilter === cat
                ? 'bg-white/10 text-white'
                : 'text-[var(--muted)] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--muted)] mb-6">
        显示 <span className="text-white font-medium">{filtered.length}</span> 条反馈
        · 累计 <span className="text-white font-medium">{totalUpvotes.toLocaleString()}</span> 次赞同
      </p>

      {/* Feedback Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(item => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--muted)]">
          <div className="text-4xl mb-3">🔍</div>
          <p>没有找到匹配的反馈</p>
        </div>
      )}
    </div>
  );
}
