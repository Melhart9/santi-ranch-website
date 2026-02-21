import { getBlogPosts, deleteBlogPost } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-medium">Blog</h1>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Título</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Etiqueta</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Fecha</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Estado</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-cream/50">
                <td className="px-6 py-4 text-sm font-medium">{post.title}</td>
                <td className="px-6 py-4 text-sm">{post.tag}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{formatDate(post.createdAt)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {post.published ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <AdminDeleteButton id={post.id} action={deleteBlogPost} label="artículo" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
