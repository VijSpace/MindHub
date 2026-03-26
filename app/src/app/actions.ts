"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";
import { type FormActionState } from "@/lib/types";

function errorState(message: string): FormActionState {
  return {
    status: "error",
    message,
  };
}

function successState(message: string): FormActionState {
  return {
    status: "success",
    message,
  };
}

export async function createPost(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const content = String(formData.get("content") || "").trim();

  if (!content) {
    return errorState("Post content cannot be empty.");
  }

  let supabase;
  try {
    supabase = await getServerClient();
  } catch {
    return errorState("Supabase is not configured yet.");
  }

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) {
    return errorState("Please log in before posting.");
  }

  const { error: profileError } = await supabase.from("users").upsert({ id: user.id });
  if (profileError) {
    return errorState("Unable to prepare your profile. Please try again.");
  }

  const { error } = await supabase.from("posts").insert({
    content,
    user_id: user.id,
  });

  if (error) {
    return errorState("Failed to create post. Please retry.");
  }

  revalidatePath("/");
  return successState("Post published.");
}

export async function createComment(
  postId: string,
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const content = String(formData.get("content") || "").trim();

  if (!content) {
    return errorState("Comment cannot be empty.");
  }

  let supabase;
  try {
    supabase = await getServerClient();
  } catch {
    return errorState("Supabase is not configured yet.");
  }

  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user) {
    return errorState("Please log in before commenting.");
  }

  const { error: profileError } = await supabase.from("users").upsert({ id: user.id });
  if (profileError) {
    return errorState("Unable to prepare your profile. Please try again.");
  }

  const { error } = await supabase.from("comments").insert({
    content,
    post_id: postId,
    user_id: user.id,
  });

  if (error) {
    return errorState("Failed to post comment. Please retry.");
  }

  revalidatePath(`/post/${postId}`);
  return successState("Comment posted.");
}
