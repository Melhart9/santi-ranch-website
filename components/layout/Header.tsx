"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/galeria", label: "Galería" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cream/95 backdrop-blur-xl shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-[28px] font-semibold text-primary tracking-tight">
            Terra<span className="text-accent">Verde</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium uppercase tracking-wider relative transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${
                  pathname === href
                    ? "text-accent after:w-full"
                    : "text-text hover:text-accent after:w-0 hover:after:w-full"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="bg-primary text-white px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-primary-light transition-all hover:-translate-y-0.5"
            >
              Admin
            </Link>
          </nav>

          <button className="lg:hidden z-[101]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-cream z-[99] pt-24 px-6 flex flex-col gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-2xl font-serif font-medium text-text hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="text-2xl font-serif font-medium text-accent"
            onClick={() => setMobileOpen(false)}
          >
            Panel Admin
          </Link>
        </div>
      )}
    </>
  );
}
