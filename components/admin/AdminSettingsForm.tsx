"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettings } from "@/lib/actions/settings";

interface SiteSettings {
  id: string;
  siteName: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  mapsUrl: string | null;
  primaryColor: string;
  accentColor: string;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
}

export default function AdminSettingsForm({ settings }: { settings: SiteSettings }) {
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [accentColor, setAccentColor] = useState(settings.accentColor);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("primaryColor", primaryColor);
      formData.set("accentColor", accentColor);
      await updateSiteSettings(formData);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Info */}
        <div className="bg-white border border-border rounded-xl p-8">
          <h3 className="font-serif text-xl mb-6">General</h3>

          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nombre del Sitio</label>
            <input name="siteName" defaultValue={settings.siteName} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Descripción</label>
            <textarea name="description" defaultValue={settings.description || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-y" style={{ minHeight: "80px" }} />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Email de Contacto</label>
            <input name="email" type="email" defaultValue={settings.email || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Teléfono</label>
            <input name="phone" defaultValue={settings.phone || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="+52 (XXX) XXX-XXXX" />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Dirección</label>
            <input name="address" defaultValue={settings.address || ""} className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">URL del Mapa (Waze / Google Maps)</label>
            <input name="mapsUrl" defaultValue={settings.mapsUrl || ""} placeholder="https://waze.com/ul/..." className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            <p className="text-xs text-[var(--text-muted)] mt-1">Se mostrará en la página de contacto. Puedes usar enlaces de Waze o Google Maps.</p>
          </div>
        </div>

        {/* Theme & Social */}
        <div className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="font-serif text-xl mb-6">Tema</h3>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Color Primario</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer p-1"
                />
                <input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Color de Acento</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer p-1"
                />
                <input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 rounded-lg border border-border bg-cream/50">
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">Vista Previa</div>
              <div className="flex gap-3 items-center">
                <div className="px-4 py-2 rounded-md text-white text-sm font-semibold" style={{ background: primaryColor }}>Primario</div>
                <div className="px-4 py-2 rounded-md text-white text-sm font-semibold" style={{ background: accentColor }}>Acento</div>
                <div className="font-serif text-xl" style={{ color: primaryColor }}>
                  Dos<span style={{ color: accentColor }}>Arroyos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="font-serif text-xl mb-6">Redes Sociales</h3>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Facebook</label>
              <input name="facebook" defaultValue={settings.facebook || ""} placeholder="https://facebook.com/..." className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Instagram</label>
              <input name="instagram" defaultValue={settings.instagram || ""} placeholder="https://instagram.com/..." className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">YouTube</label>
              <input name="youtube" defaultValue={settings.youtube || ""} placeholder="https://youtube.com/..." className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium animate-[fadeUp_0.3s_ease_both]">
            ✓ Cambios guardados correctamente
          </span>
        )}
      </div>
    </form>
  );
}
