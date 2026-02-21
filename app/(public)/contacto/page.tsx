import ContactForm from "@/components/public/ContactForm";
import { getSiteSettings } from "@/lib/actions/settings";

// Force dynamic rendering to access database at request time
export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const settings = await getSiteSettings();
  
  const contactInfo = [
    { icon: "📍", label: "Dirección", value: settings?.address || "PUE-101 / Lázaro Cárdenas - Mecapalapa" },
    { icon: "📞", label: "Teléfono", value: settings?.phone || "+52 (662) 555-0123" },
    { icon: "✉", label: "Email", value: settings?.email || "info@terraverde.mx" },
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
            
            {/* Waze Map Integration */}
            <div className="mt-8">
              <h3 className="font-serif text-xl mb-4">Cómo Llegar</h3>
              {settings?.mapsUrl ? (
                <a 
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-72 bg-cream-warm rounded-xl border border-border overflow-hidden relative group hover:border-primary transition-all"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-sm font-medium text-primary">Ver en Waze</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{settings.address}</div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Abrir Waze →
                  </div>
                </a>
              ) : (
                <div className="w-full h-72 bg-cream-warm rounded-xl border border-border flex items-center justify-center text-[var(--text-muted)]">
                  🗺️ Mapa no configurado
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
