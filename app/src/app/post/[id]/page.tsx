import Link from "next/link";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import PostCard from "@/components/PostCard";
import { createComment } from "@/app/actions";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getServerClient } from "@/lib/supabase/server";
import { parseCommentRows, parsePostRow } from "@/lib/types";

export default async function PostDetailPage({ params }: PageProps<"/post/[id]">) {
  const { id } = await params;

  if (!hasSupabaseEnv()) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 pb-16 pt-10">
        <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Back to feed
        </Link>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-sm text-amber-900 shadow-sm">
          Supabase is not configured yet. Add `NEXT_PUBLIC_SUPABASE_URL` and
          `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, then run `db/schema.sql` to enable
          post details and comments.
        </div>
      </main>
    );
  }

  const supabase = await getServerClient();
  const { data: auth } = await supabase.auth.getUser();

  const { data: post } = await supabase
    .from("posts")
    .select("id, content, created_at, users ( id, nickname )")
    .eq("id", id)
    .maybeSingle();

  if (!post) {
    notFound();
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at, users ( id, nickname )")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  const normalizedPost = parsePostRow(post);
  const normalizedComments = parseCommentRows(comments);

  if (!normalizedPost) {
    notFound();
  }

  const createCommentForPost = createComment.bind(null, id);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 pb-16 pt-10">
      <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Back to feed
      </Link>

      <PostCard post={normalizedPost} showLink={false} />

      <CommentForm
        action={createCommentForPost}
        disabled={!auth.user}
        disabledReason={!auth.user ? "Log in to join the discussion." : undefined}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Comments
          </h2>
          <span className="text-xs text-slate-400">{normalizedComments.length} total</span>
        </div>
        <CommentList comments={normalizedComments} />
      </section>
    </main>
  );
}
