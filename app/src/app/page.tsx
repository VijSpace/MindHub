import AuthPanel from "@/components/AuthPanel";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { createPost } from "@/app/actions";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { getServerClient } from "@/lib/supabase/server";
import { parsePostRows } from "@/lib/types";

export default async function HomePage() {
  const isConfigured = hasSupabaseEnv();
  let isAuthenticated = false;
  let normalizedPosts = parsePostRows([]);

  if (isConfigured) {
    const supabase = await getServerClient();
    const { data: auth } = await supabase.auth.getUser();
    isAuthenticated = Boolean(auth.user);

    const { data: posts } = await supabase
      .from("posts")
      .select("id, content, created_at, users ( id, nickname )")
      .order("created_at", { ascending: false });

    normalizedPosts = parsePostRows(posts);
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 pb-16 pt-10">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.7fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Community
            </p>
            <h1 className="mt-3 font-display text-3xl text-slate-900 sm:text-4xl">
              Quiet conversations, shared softly.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              A calm space for thoughtful updates and quick notes.
            </p>
          </div>

          {!isConfigured ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900 shadow-sm">
              Supabase is not configured yet. Add `NEXT_PUBLIC_SUPABASE_URL` and
              `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, then run `db/schema.sql` before
              using community features.
            </div>
          ) : null}

          <CreatePost
            action={createPost}
            disabled={!isConfigured || !isAuthenticated}
            disabledReason={
              !isConfigured
                ? "Supabase is not configured yet."
                : !isAuthenticated
                  ? "Log in to create a post."
                  : undefined
            }
          />

          <div className="space-y-4">
            {normalizedPosts.length ? (
              normalizedPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                {isConfigured
                  ? "No posts yet. Be the first to start a thread."
                  : "Posts will appear here once Supabase is connected."}
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <AuthPanel />
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-500 shadow-sm">
            <p className="font-semibold text-xs uppercase tracking-wide text-slate-400">
              Guidelines
            </p>
            <ul className="mt-3 list-none space-y-2">
              <li>Share concise updates and questions.</li>
              <li>Keep the tone supportive and calm.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
