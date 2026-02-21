import { getSiteSettings, updateSiteSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Configuración del Sitio</h1>
      </div>

      <form action={updateSiteSettings}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="font-serif text-xl mb-6">General</h3>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre del Sitio</label>
              <input name="siteName" defaultValue={settings.siteName} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
              <textarea name="description" defaultValue={settings.description || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y min-h-[80px]" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Email de Contacto</label>
              <input name="email" defaultValue={settings.email || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Teléfono</label>
              <input name="phone" defaultValue={settings.phone || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Dirección</label>
              <input name="address" defaultValue={settings.address || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="font-serif text-xl mb-6">Tema y Redes Sociales</h3>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Color Primario</label>
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-lg border border-border" style={{ background: settings.primaryColor }} />
                <input name="primaryColor" defaultValue={settings.primaryColor} className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Color de Acento</label>
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-lg border border-border" style={{ background: settings.accentColor }} />
                <input name="accentColor" defaultValue={settings.accentColor} className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Facebook</label>
              <input name="facebook" defaultValue={settings.facebook || ""} placeholder="URL de Facebook" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Instagram</label>
              <input name="instagram" defaultValue={settings.instagram || ""} placeholder="URL de Instagram" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">YouTube</label>
              <input name="youtube" defaultValue={settings.youtube || ""} placeholder="URL de YouTube" className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        <button type="submit" className="mt-6 px-8 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all">
          Guardar Cambios
        </button>
      </form>
    </>
  );
}
