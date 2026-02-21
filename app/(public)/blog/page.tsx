import Link from "next/link";
import { getBlogPosts } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await getBlogPosts(true);

  return (
    <div className="page-enter">
      <div className="bg-primary text-white text-center pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label !text-accent-light">Blog</p>
          <h1 className="font-serif text-[clamp(36px,5vw,60px)] font-normal mb-4">Desde el Campo</h1>
          <p className="text-lg text-white/75 font-light">
            Historias, ideas y novedades de la vida en el Rancho TerraVerde.
          </p>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        {/* Featured post */}
        {posts[0] && (
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-16 bg-white border border-border rounded-2xl overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <span className="text-6xl text-white/30">📝</span>
            </div>
            <div className="p-10">
              <span className="inline-block bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded mb-4">
                {posts[0].tag}
              </span>
              <h2 className="font-serif text-3xl font-medium mb-3">{posts[0].title}</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">{posts[0].excerpt}</p>
              <div className="text-xs text-[var(--text-muted)] flex gap-3">
                <span>{formatDate(posts[0].createdAt)}</span>
                <span>·</span>
                <span>{posts[0].readTime} de lectura</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="card">
              <div className="h-48 bg-gradient-to-br from-primary to-primary-light relative flex items-end p-5">
                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded">
                  {post.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-[var(--text-muted)] mb-2 flex gap-3">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>·</span>
                  <span>{post.readTime} de lectura</span>
                </div>
                <h3 className="font-serif text-xl font-medium leading-snug mb-2">{post.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-cream-warm rounded-2xl p-12 text-center mt-16">
          <p className="section-label">Mantente Informado</p>
          <h3 className="font-serif text-2xl mb-2">Suscríbete a Nuestro Boletín</h3>
          <p className="text-[var(--text-muted)] text-sm mb-6">Recibe las últimas noticias, novedades de productos e historias del rancho.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input className="flex-1 px-4 py-3 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary" placeholder="Tu correo electrónico" />
            <button className="btn-primary whitespace-nowrap !py-3">Suscribir</button>
          </div>
        </div>
      </section>
    </div>
  );
}
