import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostRow } from "@/lib/types";

export default function PostCard({
  post,
  showLink = true,
}: {
  post: PostRow;
  showLink?: boolean;
}) {
  const author = post.users?.nickname || "member";

  const content = (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:border-slate-300">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold uppercase tracking-wide">{author}</span>
        <time>{formatDate(post.created_at)}</time>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
        {post.content}
      </p>
    </div>
  );

  return showLink ? (
    <Link href={`/post/${post.id}`} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
