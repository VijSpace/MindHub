import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  browserClient = createBrowserClient(url, anonKey);
  return browserClient;
}
