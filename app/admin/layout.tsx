// IMPORTANT:
// This layout wraps *all* /admin routes (including /admin/login).
// Keep it unprotected so the login page can render.
// Protected admin pages live under /app/admin/(protected) and are guarded there.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
