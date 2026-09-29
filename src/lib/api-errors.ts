export function formatApiError(err: unknown, fallback = "Something went wrong."): string {
  if (err && typeof err === "object") {
    const rz = err as {
      error?: { description?: string; reason?: string };
      description?: string;
      message?: string;
    };
    if (rz.error?.description) return rz.error.description;
    if (rz.error?.reason) return rz.error.reason;
    if (rz.description) return rz.description;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}
