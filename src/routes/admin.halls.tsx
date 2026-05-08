import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { mockHalls } from "@/data/mockData";

export const Route = createFileRoute("/admin/halls")({
  component: HallsPage,
});

function HallsPage() {
  return (
    <AdminShell>
      <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-12">Halls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {mockHalls.map((h) => (
          <div key={h.id} className="border border-gray-100 p-8 shadow-sm">
            <div className="text-2xl font-extrabold uppercase">{h.name}</div>
            <div className="mt-4 text-[11px] uppercase tracking-widest text-gray-400">Capacity</div>
            <div className="text-3xl font-extrabold">{h.capacity}</div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
