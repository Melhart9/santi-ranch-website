import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null, currency = "MXN") {
  if (price === null) return "Consultar";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const statusLabels: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVADO: "Reservado",
  VENDIDO: "Vendido",
  AGOTADO: "Agotado",
  NUEVO: "Nuevo",
  EN_PROCESO: "En Proceso",
  RESPONDIDO: "Respondido",
  CERRADO: "Cerrado",
};

export const statusColors: Record<string, string> = {
  DISPONIBLE: "bg-green-100 text-green-800",
  RESERVADO: "bg-yellow-100 text-yellow-800",
  VENDIDO: "bg-red-100 text-red-800",
  AGOTADO: "bg-gray-100 text-gray-800",
  NUEVO: "bg-green-100 text-green-800",
  EN_PROCESO: "bg-yellow-100 text-yellow-800",
  RESPONDIDO: "bg-blue-100 text-blue-800",
  CERRADO: "bg-gray-100 text-gray-800",
};
