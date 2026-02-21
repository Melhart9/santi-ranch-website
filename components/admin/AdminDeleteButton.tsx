"use client";

interface Props {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}

export default function AdminDeleteButton({ id, action, label }: Props) {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-primary hover:text-primary transition-all">
        Editar
      </button>
      <button
        onClick={async () => {
          if (confirm(`¿Estás seguro de eliminar esta ${label}?`)) {
            await action(id);
          }
        }}
        className="px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-white hover:border-red-500 hover:text-red-500 transition-all"
      >
        Eliminar
      </button>
    </div>
  );
}
