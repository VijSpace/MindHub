import { formatDate } from "@/lib/format";
import type { CommentRow } from "@/lib/types";

export default function CommentList({ comments }: { comments: CommentRow[] }) {
  if (!comments.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-4 text-sm text-slate-500">
        No comments yet. Be the first to reply.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wide">
              {comment.users?.nickname || "member"}
            </span>
            <time>{formatDate(comment.created_at)}</time>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
