import { getSiteSettings } from "@/lib/actions/settings";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Configuración del Sitio</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Administra la información general, tema y redes sociales.</p>
      </div>

      <AdminSettingsForm settings={settings} />
    </>
  );
}
