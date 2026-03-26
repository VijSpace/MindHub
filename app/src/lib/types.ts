export type UserProfile = {
  id: string;
  nickname: string | null;
};

export type UserProfileRelation = UserProfile | UserProfile[] | null;

export type PostRow = {
  id: string;
  content: string;
  created_at: string;
  users: UserProfile | null;
};

export type CommentRow = {
  id: string;
  content: string;
  created_at: string;
  users: UserProfile | null;
};

export type SupabasePostRow = Omit<PostRow, "users"> & {
  users: UserProfileRelation;
};

export type SupabaseCommentRow = Omit<CommentRow, "users"> & {
  users: UserProfileRelation;
};

export function normalizeUserProfile(users: UserProfileRelation): UserProfile | null {
  if (Array.isArray(users)) {
    return users[0] ?? null;
  }

  return users;
}

export function normalizePostRow(post: SupabasePostRow): PostRow {
  return {
    ...post,
    users: normalizeUserProfile(post.users),
  };
}

export function normalizeCommentRow(comment: SupabaseCommentRow): CommentRow {
  return {
    ...comment,
    users: normalizeUserProfile(comment.users),
  };
}

export type FormActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const INITIAL_FORM_ACTION_STATE: FormActionState = {
  status: "idle",
  message: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseUserProfile(value: unknown): UserProfile | null {
  if (Array.isArray(value)) {
    return parseUserProfile(value[0]);
  }

  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  if (!id) {
    return null;
  }

  const rawNickname = value.nickname;
  return {
    id,
    nickname: typeof rawNickname === "string" ? rawNickname : null,
  };
}

export function parsePostRow(value: unknown): PostRow | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const content = readString(value.content);
  const createdAt = readString(value.created_at);

  if (!id || !content || !createdAt) {
    return null;
  }

  return {
    id,
    content,
    created_at: createdAt,
    users: parseUserProfile(value.users),
  };
}

export function parseCommentRow(value: unknown): CommentRow | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const content = readString(value.content);
  const createdAt = readString(value.created_at);

  if (!id || !content || !createdAt) {
    return null;
  }

  return {
    id,
    content,
    created_at: createdAt,
    users: parseUserProfile(value.users),
  };
}

export function parsePostRows(value: unknown): PostRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((row) => {
    const parsed = parsePostRow(row);
    return parsed ? [parsed] : [];
  });
}

export function parseCommentRows(value: unknown): CommentRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((row) => {
    const parsed = parseCommentRow(row);
    return parsed ? [parsed] : [];
  });
}
