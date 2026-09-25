/** Admin API calls — always send session cookie and surface server errors. */
export async function adminFetch<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.headers ?? {}),
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
    },
  });

  let data: { error?: string; message?: string } = {};
  try {
    data = (await res.json()) as { error?: string; message?: string };
  } catch {
    /* non-JSON */
  }

  if (!res.ok) {
    const msg =
      data.error ||
      data.message ||
      (res.status === 401
        ? "Session expired — please log out and sign in again."
        : `Request failed (${res.status})`);
    throw new Error(msg);
  }

  return data as T;
}
