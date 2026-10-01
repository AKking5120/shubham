import type { AuthError } from "@supabase/supabase-js";

export function formatAuthError(error: AuthError | null | undefined): string {
  if (!error?.message) {
    return "Something went wrong. Please try again.";
  }

  const msg = error.message;

  if (msg.toLowerCase().includes("invalid login credentials")) {
    return (
      "Email or password is wrong, or your email is not confirmed yet. " +
      "If you just signed up, open the confirmation link from your inbox (check spam), " +
      "or use “Resend confirmation” below. You can also sign up again with the same email after confirming."
    );
  }

  if (msg.toLowerCase().includes("email not confirmed")) {
    return "Please confirm your email first — check your inbox and spam folder, then sign in again.";
  }

  if (msg.toLowerCase().includes("user already registered")) {
    return "This email is already registered. Sign in instead, or reset your password.";
  }

  if (msg.toLowerCase().includes("rate limit")) {
    return "Too many attempts. Wait a minute and try again.";
  }

  return msg;
}
