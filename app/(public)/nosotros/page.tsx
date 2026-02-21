export default function AboutPage() {
  const timeline = [
    { year: "1987", text: "Carlos Mendoza Sr. adquiere la propiedad original de 200 hectáreas y establece una pequeña operación de ganado Hereford." },
    { year: "1995", text: "Expansión a 500 hectáreas. Introducción de genética Angus y primer programa de cría de caballos cuarto de milla." },
    { year: "2005", text: "Lanzamiento del programa de producción orgánica. Primeras cosechas certificadas — tomates, calabazas y chiles." },
    { year: "2012", text: "Segunda generación toma el liderazgo. Establecimiento de apiarios para producción de miel. Inicio de operación láctea." },
    { year: "2020", text: "Alcance de 800+ hectáreas. Diversificación completa con seis categorías de productos y distribución nacional." },
    { year: "2025", text: "Lanzamiento de plataforma digital y servicios de consultoría en reproducción. Tercera generación se integra." },
  ];

  const team = [
    { name: "Carlos Mendoza", role: "Fundador y Director", bio: "Ganadero de tercera generación con más de 30 años de experiencia en agricultura sustentable." },
    { name: "María Fernández", role: "Gerente de Ganadería", bio: "Especialista veterinaria que supervisa todos los programas de cría y bienestar animal." },
    { name: "Diego Rivera", role: "Jefe de Producción Orgánica", bio: "Experto certificado en agricultura orgánica que gestiona todas las operaciones de cultivo." },
    { name: "Ana Sofía Torres", role: "Desarrollo de Negocios", bio: "Construyendo alianzas y llevando nuestros productos a mercados a nivel nacional." },
  ];

  const values = [
    { icon: "🌿", title: "Prácticas Sustentables", desc: "Instalaciones con energía solar, pastoreo rotativo y sistemas de conservación de agua." },
    { icon: "🏅", title: "Certificación Orgánica", desc: "Certificaciones SAGARPA y equivalencia orgánica para toda la producción agrícola." },
    { icon: "🤝", title: "Comunidad Primero", desc: "Alianzas con escuelas locales, mercados y cooperativas para fortalecer el sistema alimentario regional." },
    { icon: "🔬", title: "Innovación Constante", desc: "Pruebas genómicas, agricultura de precisión y programas de cría basados en datos." },
  ];

  return (
    <div className="page-enter">
      <div className="bg-primary text-white text-center pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label !text-accent-light">Nuestra Historia</p>
          <h1 className="font-serif text-[clamp(36px,5vw,60px)] font-normal mb-4">Sobre TerraVerde</h1>
          <p className="text-lg text-white/75 font-light">
            Tres generaciones de pasión, sustentabilidad e innovación en más de 800 hectáreas de tierra sonorense.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-label">Nuestra Misión</p>
            <h2 className="section-title">Cultivando la Tierra,<br />Alimentando el Futuro</h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6">
              En TerraVerde, creemos que la agricultura responsable es la base de un futuro sustentable. Cada animal que criamos, cada cultivo que sembramos y cada producto que creamos refleja nuestro compromiso con la calidad, la ética y la responsabilidad ambiental.
            </p>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              Desde nuestros inicios como un pequeño rancho ganadero, hemos crecido hasta convertirnos en una operación agrícola diversificada que produce desde ganado de registro hasta productos orgánicos, lácteos artesanales y miel cruda.
            </p>
          </div>
          <div className="bg-cream-warm rounded-2xl aspect-[4/3] flex items-center justify-center text-7xl">🏞️</div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="mb-14">
          <p className="section-label">Nuestro Camino</p>
          <h2 className="section-title">Historia y Logros</h2>
        </div>
        <div className="relative pl-10 border-l-2 border-border">
          {timeline.map((item) => (
            <div key={item.year} className="relative mb-12">
              <div className="absolute -left-[47px] top-1 w-3 h-3 rounded-full bg-accent border-[3px] border-cream" />
              <div className="font-serif text-3xl text-primary font-medium mb-2">{item.year}</div>
              <p className="text-[var(--text-muted)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="mb-14">
          <p className="section-label">El Equipo</p>
          <h2 className="section-title">Conoce a Nuestra Gente</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="card text-center">
              <div className="h-48 bg-gradient-to-br from-cream-warm to-border flex items-center justify-center text-5xl">👤</div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium mb-1">{m.name}</h3>
                <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-3">{m.role}</div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-border rounded-xl p-8">
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="font-serif text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
