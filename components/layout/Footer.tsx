import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/70 pt-20 pb-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        <div>
          <Link href="/" className="font-serif text-2xl font-semibold text-white mb-4 inline-block">
            Dos<span className="text-accent-light">Arroyos</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Un rancho diversificado dedicado a la agricultura sustentable, ganadería de calidad y productos artesanales del campo.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-white mb-5">Explorar</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
            <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
            <li><Link href="/galeria" className="hover:text-white transition-colors">Galería</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-white mb-5">Productos</h4>
          <ul className="space-y-3 text-sm">
            <li>Ganado</li>
            <li>Caballos</li>
            <li>Productos Orgánicos</li>
            <li>Lácteos</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[1.5px] text-white mb-5">Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li>Km 42, Carretera Nacional</li>
            <li>Sonora, México</li>
            <li>+52 (662) 555-0123</li>
            <li>info@dosarroyos.mx</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-white/10 text-xs flex flex-wrap justify-between gap-3">
        <span>© 2025 Dos Arroyos. Todos los derechos reservados.</span>
        <span>Aviso de Privacidad · Términos de Servicio</span>
      </div>
    </footer>
  );
}
