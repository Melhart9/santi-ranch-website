import ContactForm from "@/components/public/ContactForm";

export default function ContactPage() {
  const contactInfo = [
    { icon: "📍", label: "Dirección", value: "Km 42, Carretera Nacional, Sonora, México" },
    { icon: "📞", label: "Teléfono", value: "+52 (662) 555-0123" },
    { icon: "✉", label: "Email", value: "info@terraverde.mx" },
    { icon: "🕐", label: "Horario", value: "Lun–Sáb: 7:00 AM – 6:00 PM" },
  ];

  return (
    <div className="page-enter">
      <div className="bg-primary text-white text-center pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label !text-accent-light">Contacto</p>
          <h1 className="font-serif text-[clamp(36px,5vw,60px)] font-normal mb-4">Contáctanos</h1>
          <p className="text-lg text-white/75 font-light">
            Nos encantaría saber de ti. Escríbenos para consultas, pedidos o para agendar una visita.
          </p>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="section-title mb-10">Envíanos un Mensaje</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="section-title mb-10">Información de Contacto</h2>
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4 items-start p-6 bg-white border border-border rounded-xl mb-4">
                <div className="w-12 h-12 bg-cream-warm rounded-lg flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">{item.label}</div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="w-full h-72 bg-cream-warm rounded-xl border border-border flex items-center justify-center text-[var(--text-muted)] mt-8">
              🗺️ Integración de Mapa (Google Maps / Leaflet)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
