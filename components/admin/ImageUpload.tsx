"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string | null;
  label?: string;
  className?: string;
  clearable?: boolean;
}

export default function ImageUpload({
  onUpload,
  currentUrl,
  label = "Imagen",
  className = "",
  clearable = true,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten imágenes (JPG, PNG, WebP).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo es muy grande. Máximo 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `Error ${res.status}`);
        }

        setPreview(data.url);
        onUpload(data.url);
      } catch (err: any) {
        console.error("Upload error:", err);
        setError(err.message || "Error al subir. Verifica la consola.");
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleClear() {
    setPreview(null);
    setError(null);
    onUpload("");
  }

  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInput}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-border bg-cream-warm">
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-2 bg-white rounded-lg text-xs font-semibold"
            >
              Cambiar
            </button>
            {clearable && (
              <button
                type="button"
                onClick={handleClear}
                disabled={uploading}
                className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
              >
                Quitar
              </button>
            )}
          </div>
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <div className="h-full bg-accent animate-pulse" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-cream-warm/50 transition-all"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="text-accent animate-spin" />
              <span className="text-sm text-[var(--text-muted)]">Subiendo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon size={28} className="text-[var(--text-muted)]" />
              <span className="text-sm font-medium">Haz clic para subir imagen</span>
              <span className="text-xs text-[var(--text-muted)]">JPG, PNG, WebP · Máx 5MB</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 text-red-600 text-xs font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
