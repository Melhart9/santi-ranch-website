"use client";

import { useState } from "react";

interface GalleryImage {
  id: string;
  title: string | null;
  url: string;
  category: string | null;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const categories = ["Todos", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[]];
  const filtered = filter === "Todos" ? images : images.filter((i) => i.category === filter);

  const placeholderColors = ["#8B7355", "#6B8E6B", "#CD853F", "#A0522D", "#556B2F", "#8FBC8F", "#DEB887", "#BC8F8F"];

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              filter === c ? "bg-primary text-white border-primary" : "bg-white border-border text-text hover:border-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setLightbox(item)}
            className="rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform relative group"
          >
            <div className="aspect-square relative overflow-hidden">
              {item.url ? (
                <ImageWithFallback
                  src={item.url}
                  alt={item.title || "Galería"}
                  fallbackColor={placeholderColors[i % placeholderColors.length]}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-3xl"
                  style={{ background: placeholderColors[i % placeholderColors.length] }}
                >
                  📷
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">⤢</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No hay imágenes en esta categoría.
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center cursor-pointer p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full text-white text-2xl flex items-center justify-center hover:bg-white/20 z-10" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <div className="max-w-[90vw] max-h-[85vh] relative">
            {lightbox.url ? (
              <img
                src={lightbox.url}
                alt={lightbox.title || "Galería"}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="w-[80vw] h-[80vh] rounded-2xl flex items-center justify-center" style={{ background: placeholderColors[0] }}>
                <div className="text-white text-center">
                  <div className="text-7xl mb-4">📷</div>
                  <div className="text-lg opacity-80">{lightbox.title || lightbox.category}</div>
                </div>
              </div>
            )}
            {lightbox.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg" onClick={(e) => e.stopPropagation()}>
                <div className="text-white font-medium">{lightbox.title}</div>
                {lightbox.category && <div className="text-white/60 text-sm">{lightbox.category}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** Image component that falls back to a color placeholder if URL fails */
function ImageWithFallback({ src, alt, fallbackColor }: { src: string; alt: string; fallbackColor: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl" style={{ background: fallbackColor }}>
        📷
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
