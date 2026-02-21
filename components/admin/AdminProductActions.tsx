"use client";

import { deleteProduct } from "@/lib/actions/products";

export default function AdminProductActions({ productId }: { productId: string }) {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-primary hover:text-primary transition-all">
        Editar
      </button>
      <button
        onClick={async () => {
          if (confirm("¿Estás seguro de eliminar este producto?")) {
            await deleteProduct(productId);
          }
        }}
        className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-red-500 hover:text-red-500 transition-all"
      >
        Eliminar
      </button>
    </div>
  );
}
