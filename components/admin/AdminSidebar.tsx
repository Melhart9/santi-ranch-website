"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Package, FolderOpen, Image, FileText,
  Mail, Settings, LogOut
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Panel Principal", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: FolderOpen },
  { href: "/admin/galeria", label: "Galería", icon: Image },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/consultas", label: "Consultas", icon: Mail },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-[260px] bg-[#1a1a1a] text-white fixed top-0 bottom-0 z-50 overflow-y-auto">
      <div className="px-6 pt-8 mb-10">
        <Link href="/" className="font-serif text-[22px]">
          Terra<span className="text-accent-light">Verde</span>
        </Link>
      </div>

      <nav>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-all ${
                    isActive
                      ? "text-white bg-white/10 border-r-[3px] border-accent"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 border-t border-white/10 pt-4">
        <div className="px-6 py-2 text-xs text-white/40 mb-2">
          Sesión: {userName}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 w-full transition-all"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
