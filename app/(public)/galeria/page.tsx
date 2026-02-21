import { getGalleryImages } from "@/lib/actions/gallery";
import GalleryGrid from "@/components/public/GalleryGrid";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="page-enter">
      <div className="bg-primary text-white text-center pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="section-label !text-accent-light">Galería</p>
          <h1 className="font-serif text-[clamp(36px,5vw,60px)] font-normal mb-4">La Vida en Dos Arroyos</h1>
          <p className="text-lg text-white/75 font-light">
            Un recorrido visual por nuestra tierra, nuestros animales y los productos que creamos con orgullo.
          </p>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <GalleryGrid images={images} />
      </section>
    </div>
  );
}
