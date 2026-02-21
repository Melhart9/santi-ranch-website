import Link from "next/link";
import { getFeaturedProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { getBlogPosts } from "@/lib/actions/blog";
import { formatPrice, formatDate } from "@/lib/utils";
import ProductCard from "@/components/public/ProductCard";

export default async function HomePage() {
  const [featured, categories, posts] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getBlogPosts(true),
  ]);

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22%23fff%22%20fill-opacity=%220.4%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="text-center text-white relative z-10 max-w-4xl px-6">
          <div className="inline-block text-xs font-semibold tracking-[3px] uppercase border border-white/30 px-5 py-2 rounded-full mb-8 text-white/85 animate-[fadeUp_0.8s_ease_both]">
            Est. 1987 · Sonora, México
          </div>
          <h1 className="font-serif text-[clamp(42px,7vw,88px)] font-normal leading-[1.05] mb-6 tracking-tight animate-[fadeUp_0.8s_ease_0.15s_both]">
            Donde la Tradición se Encuentra con el <em className="italic text-accent-light">Mañana</em>
          </h1>
          <p className="text-[clamp(16px,2vw,20px)] leading-relaxed text-white/80 max-w-xl mx-auto mb-10 font-light animate-[fadeUp_0.8s_ease_0.3s_both]">
            Ganadería premium, productos orgánicos y artesanales del campo — criados con dedicación en más de 800 hectáreas de tierra sonorense.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_0.8s_ease_0.45s_both]">
            <Link href="/productos" className="btn-primary">Explorar Productos</Link>
            <Link href="/nosotros" className="btn-outline">Nuestra Historia</Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-14">
          <div>
            <p className="section-label">Lo Que Ofrecemos</p>
            <h2 className="section-title">Un Rancho de Muchas Cosechas</h2>
          </div>
          <Link href="/productos" className="text-sm font-semibold text-accent uppercase tracking-wider hover:text-primary transition-colors">
            Ver Todos los Productos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/productos?categoria=${cat.slug}`}
              className="bg-white border border-border rounded-xl p-8 text-center hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <div className="font-semibold text-sm mb-1">{cat.name}</div>
              <div className="text-xs text-[var(--text-muted)]">{(cat as any)._count?.products || 0} productos</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="mb-14">
          <p className="section-label">Destacados</p>
          <h2 className="section-title">Selecciones del Rancho</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="bg-primary text-white py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label !text-accent-light">Nuestra Herencia</p>
            <h2 className="section-title !text-white">
              Tres Generaciones de<br />Tierra y Sustento
            </h2>
            <p className="text-white/80 text-lg leading-relaxed font-light">
              Fundado en 1987 por la familia Mendoza, el Rancho Dos Arroyos ha crecido de una pequeña operación ganadera a uno de los negocios agrícolas más diversificados de la región. Creemos en trabajar con la tierra, no en contra de ella.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-10">
              {[
                { num: "800+", label: "Hectáreas" },
                { num: "37", label: "Años" },
                { num: "200+", label: "Animales" },
                { num: "50+", label: "Productos" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-5xl font-normal text-accent-light">{s.num}</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl row-span-2 flex items-center justify-center text-6xl">🏔️</div>
            <div className="bg-white/5 rounded-xl aspect-square flex items-center justify-center text-4xl">🌅</div>
            <div className="bg-white/5 rounded-xl aspect-square flex items-center justify-center text-4xl">🐂</div>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-14">
          <div>
            <p className="section-label">Desde el Campo</p>
            <h2 className="section-title">Últimas Historias</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-accent uppercase tracking-wider hover:text-primary transition-colors">
            Todos los Artículos →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card group cursor-pointer">
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
                <h3 className="font-serif text-xl font-medium leading-snug mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream-warm py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label">Contáctanos</p>
          <h2 className="section-title">¿Listo para Trabajar con Nosotros?</h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8">
            Ya sea que busques ganado de registro, productos orgánicos o artesanales del campo, nos encantaría saber de ti.
          </p>
          <Link href="/contacto" className="btn-primary inline-block">Contactar</Link>
        </div>
      </section>
    </div>
  );
}
