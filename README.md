# TerraVerde Ranch 🌿

Sitio web completo para rancho agrícola, construido con Next.js 15, React 19, Prisma, PostgreSQL y NextAuth.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Base de datos:** PostgreSQL + Prisma ORM
- **Autenticación:** NextAuth.js (Credentials)
- **Iconos:** Lucide React
- **Fuentes:** Cormorant Garamond + Outfit

## 📁 Estructura del Proyecto

```
ranch-website/
├── app/
│   ├── (public)/          # Páginas públicas (inicio, nosotros, etc.)
│   ├── admin/             # Dashboard de administración (protegido)
│   │   ├── productos/     # CRUD de productos
│   │   ├── categorias/    # CRUD de categorías
│   │   ├── consultas/     # Gestión de consultas
│   │   ├── galeria/       # Gestión de galería
│   │   ├── blog/          # Gestión de blog
│   │   ├── configuracion/ # Configuración del sitio
│   │   └── login/         # Página de inicio de sesión
│   └── api/auth/          # API de autenticación
├── components/
│   ├── admin/             # Componentes del admin
│   ├── layout/            # Header, Footer
│   ├── public/            # Componentes públicos
│   └── ui/                # Componentes UI reutilizables
├── lib/
│   ├── actions/           # Server Actions (CRUD)
│   ├── auth.ts            # Configuración de NextAuth
│   ├── db.ts              # Cliente Prisma
│   └── utils.ts           # Utilidades
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos iniciales
└── styles/
```

## 🚀 Instalación

### 1. Clonar e instalar dependencias

```bash
cd ranch-website
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tu configuración:
- `DATABASE_URL` — Tu conexión PostgreSQL
- `NEXTAUTH_SECRET` — Un secreto seguro (genera uno con `openssl rand -base64 32`)
- `NEXTAUTH_URL` — `http://localhost:3000` para desarrollo

### 3. Configurar la base de datos

```bash
# Generar el cliente Prisma
npx prisma generate

# Crear las tablas
npx prisma db push

# Poblar con datos iniciales
npm run db:seed
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🔐 Acceso al Admin

Después de ejecutar el seed:

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@terraverde.mx`
- **Contraseña:** `admin123`

## 📄 Páginas Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con hero, categorías, productos destacados, blog |
| `/nosotros` | Historia, equipo, timeline, valores |
| `/productos` | Catálogo con filtros por categoría |
| `/productos/[slug]` | Detalle de producto con especificaciones |
| `/galeria` | Galería con filtros y lightbox |
| `/blog` | Artículos del blog |
| `/contacto` | Formulario de contacto funcional |

## ⚙️ Panel de Administración

| Sección | Funcionalidad |
|---------|---------------|
| Panel Principal | Vista general con estadísticas |
| Productos | Crear, editar, eliminar productos |
| Categorías | Gestionar categorías |
| Consultas | Ver y gestionar consultas de contacto |
| Galería | Gestionar imágenes |
| Blog | Gestionar artículos |
| Configuración | Nombre del sitio, colores, redes sociales |

## 🗄️ Modelos de Base de Datos

- **User** — Usuarios con roles (USER/ADMIN)
- **Category** — Categorías de productos
- **Product** — Productos con precios, estados, especificaciones
- **GalleryImage** — Imágenes de galería
- **BlogPost** — Artículos del blog
- **ContactInquiry** — Consultas de contacto
- **SiteSettings** — Configuración general del sitio

## 🎨 Personalización

Los colores y fuentes se configuran en `tailwind.config.js` y `app/globals.css`.

Colores principales:
- **Primary:** `#1a3c1a` (Verde bosque)
- **Accent:** `#c4572a` (Terracota)
- **Background:** `#faf8f4` (Crema)

---

Desarrollado con 💚 para TerraVerde Ranch
