import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ─── Admin User ───
  const adminPassword = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@terraverde.mx" },
    update: {},
    create: {
      email: "admin@terraverde.mx",
      name: "Carlos Mendoza",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // ─── Categorías ───
  const categories = [
    { name: "Ganado", slug: "ganado", emoji: "🐄", order: 1, description: "Ganado de registro y comercial de la más alta calidad genética." },
    { name: "Caballos", slug: "caballos", emoji: "🐎", order: 2, description: "Caballos de trabajo y recreación con excelente temperamento." },
    { name: "Productos Orgánicos", slug: "organicos", emoji: "🌾", order: 3, description: "Frutas, verduras y granos cultivados de manera orgánica y sustentable." },
    { name: "Lácteos", slug: "lacteos", emoji: "🧀", order: 4, description: "Productos lácteos artesanales elaborados con leche fresca del rancho." },
    { name: "Miel y Apicultura", slug: "miel", emoji: "🍯", order: 5, description: "Miel pura y productos apícolas de nuestros apiarios propios." },
    { name: "Servicios", slug: "servicios", emoji: "🔧", order: 6, description: "Consultoría en genética, reproducción y manejo sustentable." },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }

  // ─── Productos ───
  const products = [
    {
      name: "Toro Angus — El Capitán",
      slug: "toro-angus-el-capitan",
      categorySlug: "ganado",
      price: 85000,
      status: "DISPONIBLE" as const,
      featured: true,
      description: "Toro Angus negro de registro, 3 años de edad. Genética excepcional con linaje documentado de cinco generaciones. Ideal para mejoramiento de hato.",
      specs: { Raza: "Angus Negro", Edad: "3 años", Peso: "545 kg", Registro: "AAA-48291" },
    },
    {
      name: "Yegua Cuarto de Milla — Luna",
      slug: "yegua-cuarto-de-milla-luna",
      categorySlug: "caballos",
      price: 160000,
      status: "DISPONIBLE" as const,
      featured: true,
      description: "Yegua cuarto de milla bien entrenada, excelente temperamento. Ideal para trabajo de rancho y monta recreativa.",
      specs: { Raza: "Cuarto de Milla", Edad: "5 años", Color: "Palomino", Entrenamiento: "Avanzado" },
    },
    {
      name: "Caja de Tomates Heritage",
      slug: "caja-tomates-heritage",
      categorySlug: "organicos",
      price: 650,
      status: "DISPONIBLE" as const,
      featured: true,
      description: "5 kg de tomates heritage orgánicos, recién cosechados. Múltiples variedades incluyendo Cherokee Purple y Brandywine.",
      specs: { Peso: "5 kg", Orgánico: "Sí", Variedades: "Heritage Mixto", Temporada: "Verano" },
    },
    {
      name: "Miel Silvestre Cruda",
      slug: "miel-silvestre-cruda",
      categorySlug: "miel",
      price: 520,
      status: "DISPONIBLE" as const,
      featured: true,
      description: "Miel pura sin filtrar de flores silvestres, cosechada de nuestros propios apiarios. Perfil de sabor rico y complejo.",
      specs: { Volumen: "1 litro", Tipo: "Cruda Sin Filtrar", Origen: "Flores Silvestres", Cosecha: "Primavera 2025" },
    },
    {
      name: "Queso de Cabra Artesanal",
      slug: "queso-cabra-artesanal",
      categorySlug: "lacteos",
      price: 340,
      status: "DISPONIBLE" as const,
      featured: false,
      description: "Queso de cabra artesanal madurado, elaborado con leche de nuestras cabras criadas en pastoreo. Maduración de 6 meses.",
      specs: { Peso: "250 g", Tipo: "Chèvre Madurado", Maduración: "6 meses", Leche: "Cabra" },
    },
    {
      name: "Vaquilla Hereford — Rosalía",
      slug: "vaquilla-hereford-rosalia",
      categorySlug: "ganado",
      price: 60000,
      status: "RESERVADO" as const,
      featured: false,
      description: "Vaquilla Hereford joven, excelente línea materna. Lista para integración a programa de cría.",
      specs: { Raza: "Hereford", Edad: "18 meses", Peso: "385 kg", Estado: "Reservada" },
    },
    {
      name: "Consultoría de Reproducción",
      slug: "consultoria-reproduccion",
      categorySlug: "servicios",
      price: 3800,
      status: "DISPONIBLE" as const,
      featured: false,
      description: "Consultoría personalizada con nuestro equipo experto. Análisis genético y desarrollo de plan de cría.",
      specs: { Duración: "2 horas", Incluye: "Reporte Genético", Tipo: "En sitio", Reservación: "Requerida" },
    },
    {
      name: "Canasta de Huevos Frescos",
      slug: "canasta-huevos-frescos",
      categorySlug: "organicos",
      price: 220,
      status: "DISPONIBLE" as const,
      featured: false,
      description: "Dos docenas de huevos de gallinas de libre pastoreo de razas heritage. Yemas ricas, sabor increíble.",
      specs: { Cantidad: "24 huevos", Tipo: "Libre pastoreo", Razas: "Heritage Mixto", Frescura: "Del día" },
    },
  ];

  for (const p of products) {
    const { categorySlug, ...productData } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...productData, categoryId: createdCategories[categorySlug] },
      create: { ...productData, categoryId: createdCategories[categorySlug] },
    });
  }

  // ─── Blog Posts ───
  const posts = [
    {
      title: "Ganadería Sustentable en la Era Moderna",
      slug: "ganaderia-sustentable-era-moderna",
      excerpt: "Cómo combinamos métodos tradicionales con prácticas sustentables de vanguardia para preservar la tierra para las futuras generaciones.",
      content: "La ganadería sustentable no es solo una tendencia, es una necesidad...",
      tag: "Sustentabilidad",
      readTime: "5 min",
      published: true,
      authorName: "Carlos Mendoza",
    },
    {
      title: "Temporada de Pariciones: Qué Esperar",
      slug: "temporada-pariciones-que-esperar",
      excerpt: "Una mirada detrás de escenas a nuestra preparación y cuidado durante la época más ocupada del año en el rancho.",
      content: "La temporada de pariciones es el momento más crítico del año...",
      tag: "Vida del Rancho",
      readTime: "4 min",
      published: true,
      authorName: "María Fernández",
    },
    {
      title: "De la Colmena al Frasco: Nuestro Proceso",
      slug: "de-la-colmena-al-frasco",
      excerpt: "Sigue el viaje de nuestra miel de flores silvestres desde nuestros apiarios cuidadosamente manejados hasta tu mesa.",
      content: "El proceso de producción de miel artesanal comienza mucho antes de la cosecha...",
      tag: "Productos",
      readTime: "6 min",
      published: true,
      authorName: "Diego Rivera",
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  // ─── Galería ───
  const galleryItems = [
    { title: "Vista panorámica del rancho", url: "/images/gallery/rancho-1.jpg", category: "Rancho", order: 1 },
    { title: "Ganado Angus en pastoreo", url: "/images/gallery/animales-1.jpg", category: "Animales", order: 2 },
    { title: "Productos orgánicos frescos", url: "/images/gallery/productos-1.jpg", category: "Productos", order: 3 },
    { title: "Feria ganadera anual", url: "/images/gallery/eventos-1.jpg", category: "Eventos", order: 4 },
    { title: "Atardecer en el rancho", url: "/images/gallery/rancho-2.jpg", category: "Rancho", order: 5 },
    { title: "Potros en entrenamiento", url: "/images/gallery/animales-2.jpg", category: "Animales", order: 6 },
    { title: "Miel recién cosechada", url: "/images/gallery/productos-2.jpg", category: "Productos", order: 7 },
    { title: "Día de campo familiar", url: "/images/gallery/eventos-2.jpg", category: "Eventos", order: 8 },
  ];

  for (const item of galleryItems) {
    await prisma.galleryImage.create({ data: item });
  }

  // ─── Consultas de ejemplo ───
  const inquiries = [
    { name: "Roberto Guzmán", email: "roberto@email.com", phone: "+52 662 111 2233", subject: "Consulta de Ganado de Registro", message: "Estoy interesado en adquirir un toro Angus para mi programa de cría.", status: "NUEVO" as const },
    { name: "Ana López", email: "ana@email.com", phone: "+52 662 444 5566", subject: "Pedido de Miel al Mayoreo", message: "Me gustaría cotizar un pedido de 50 frascos de miel silvestre.", status: "EN_PROCESO" as const },
    { name: "Martín Herrera", email: "martin@email.com", phone: "+52 662 777 8899", subject: "Visita al Rancho", message: "Somos un grupo de estudiantes de agronomía y nos gustaría visitar sus instalaciones.", status: "RESPONDIDO" as const },
  ];

  for (const inq of inquiries) {
    await prisma.contactInquiry.create({ data: inq });
  }

  // ─── Configuración del sitio ───
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "TerraVerde Ranch",
      description: "Un rancho diversificado dedicado a la agricultura sustentable, ganadería de calidad y productos artesanales del campo.",
      email: "info@terraverde.mx",
      phone: "+52 (662) 555-0123",
      address: "Km 42, Carretera Nacional, Sonora, México",
      primaryColor: "#1a3c1a",
      accentColor: "#c4572a",
    },
  });

  console.log("✅ Base de datos poblada exitosamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
