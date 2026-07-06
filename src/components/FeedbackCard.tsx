import { FeedbackItem } from '@/data/feedback';

const typeConfig = {
  complaint: {
    icon: '😤',
    label: '吐槽',
    color: 'bg-red-500/20 text-red-300 border-red-500/30',
    borderAccent: 'border-l-red-500/60',
  },
  suggestion: {
    icon: '💡',
    label: '建议',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    borderAccent: 'border-l-blue-500/60',
  },
  praise: {
    icon: '🙌',
    label: '称赞',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderAccent: 'border-l-emerald-500/60',
  },
};

const statusConfig = {
  open: { label: '待处理', color: 'text-amber-400' },
  'in-progress': { label: '处理中', color: 'text-blue-400' },
  resolved: { label: '已解决', color: 'text-emerald-400' },
  'wont-fix': { label: '不修复', color: 'text-[var(--muted)]' },
};

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const type = typeConfig[feedback.type];
  const status = statusConfig[feedback.status];
  const date = new Date(feedback.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`rounded-xl border border-[var(--border)] border-l-4 ${type.borderAccent} bg-[var(--card)] hover:bg-[var(--card-hover)] hover:shadow-lg transition-all duration-300 p-5`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-white text-sm leading-snug flex-1">{feedback.title}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${type.color}`}>
          {type.icon} {type.label}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3 text-xs text-[var(--muted)]">
        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-[var(--border)]">{feedback.category}</span>
        <span className={`font-medium ${status.color}`}>{status.label}</span>
        {feedback.relatedVersion && (
          <span className="text-violet-400">v{feedback.relatedVersion}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 line-clamp-3">
        {feedback.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {feedback.tags.map((tag, i) => (
          <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--muted)] border border-[var(--border)]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>👍</span>
            <span>{feedback.upvotes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{feedback.comments}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>{feedback.author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
