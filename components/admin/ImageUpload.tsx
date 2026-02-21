"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  /** Called with the uploaded image URL */
  onUpload: (url: string) => void;
  /** Current image URL (for showing existing image) */
  currentUrl?: string | null;
  /** Label text */
  label?: string;
  /** Additional class on wrapper */
  className?: string;
  /** Allow clearing the image */
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
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Client-side validation
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten imágenes (JPG, PNG, WebP, GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo es muy grande. Máximo 5MB.");
        return;
      }

      // Show local preview immediately
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Upload
      setUploading(true);
      setProgress(10);

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Simulate progress (actual upload progress requires XHR)
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 15, 85));
        }, 200);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        setProgress(95);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error al subir la imagen.");
        }

        setProgress(100);
        setPreview(data.url);
        onUpload(data.url);
      } catch (err: any) {
        console.error("Upload error:", err);
        setError(err.message || "Error al subir la imagen.");
        // Keep preview but show error
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 500);
      }
    },
    [onUpload]
  );

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
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

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileInput}
        className="hidden"
      />

      {preview ? (
        /* Image Preview */
        <div className="relative rounded-xl overflow-hidden border border-border bg-cream-warm group">
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-48 object-cover"
            onError={() => {
              // If the preview URL fails to load, show fallback
              setPreview(null);
              setError("No se pudo cargar la imagen.");
            }}
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-2 bg-white rounded-lg text-xs font-semibold shadow-lg hover:bg-cream transition-all"
            >
              Cambiar
            </button>
            {clearable && (
              <button
                type="button"
                onClick={handleClear}
                disabled={uploading}
                className="px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold shadow-lg hover:bg-red-600 transition-all"
              >
                Quitar
              </button>
            )}
          </div>

          {/* Upload progress bar */}
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        /* Drop Zone */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-accent bg-accent/5 scale-[1.01]"
              : "border-border hover:border-primary hover:bg-cream-warm/50"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="text-accent animate-spin" />
              <span className="text-sm text-[var(--text-muted)]">
                Subiendo... {progress}%
              </span>
              <div className="w-48 h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isDragOver ? (
                <Upload size={28} className="text-accent" />
              ) : (
                <ImageIcon size={28} className="text-[var(--text-muted)]" />
              )}
              <span className="text-sm font-medium">
                {isDragOver
                  ? "Suelta la imagen aquí"
                  : "Haz clic o arrastra una imagen"}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                JPG, PNG, WebP o GIF · Máximo 5MB
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <X size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
