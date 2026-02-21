import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

// NextAuth + Prisma should run in the Node.js runtime.
export const runtime = "nodejs";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.user?.name || session.user?.email || "Admin"} />
      <main className="flex-1 ml-0 lg:ml-[260px] bg-cream p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}
