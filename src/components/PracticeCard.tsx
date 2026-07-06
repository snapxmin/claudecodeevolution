import { Practice } from '@/data/practices';

const difficultyColors = {
  beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  advanced: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
};

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

interface PracticeCardProps {
  practice: Practice;
  expanded?: boolean;
}

export default function PracticeCard({ practice, expanded = false }: PracticeCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white text-sm leading-snug flex-1">{practice.title}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${difficultyColors[practice.difficulty]}`}>
          {difficultyLabels[practice.difficulty]}
        </span>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
          {practice.category}
        </span>
        <span className="text-xs text-[var(--muted)]">{practice.source}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--muted)] leading-relaxed">{practice.description}</p>

      {/* Tips */}
      {expanded && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-white">实践要点：</p>
          {practice.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="text-violet-400 shrink-0 mt-0.5">→</span>
              <span className="text-[var(--muted)]">{tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* Code example */}
      {expanded && practice.example && (
        <div className="rounded-lg bg-black/30 border border-[var(--border)] p-3 overflow-x-auto">
          <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap">{practice.example}</pre>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <span>👍</span>
          <span>{practice.upvotes.toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {practice.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-[var(--muted)] border border-[var(--border)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
