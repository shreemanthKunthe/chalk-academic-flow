import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AdminShell from "@/components/AdminShell";
import { mockSeating, mockExams } from "@/data/mockData";

export const Route = createFileRoute("/admin/seating/$examId")({
  component: SeatingChart,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function SeatingChart() {
  const { examId } = Route.useParams();
  const exam = mockExams.find((e) => e.id === Number(examId));
  const initial = mockSeating[Number(examId)] || mockSeating[1];
  const [halls, setHalls] = useState(initial);

  const reshuffle = () => {
    setHalls(
      halls.map((h) => ({
        ...h,
        seats: shuffle(h.seats).map((s, i) => ({
          ...s,
          row: Math.floor(i / 4) + 1,
          seat: (i % 4) + 1,
        })),
      }))
    );
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
          Seating — {exam?.title || "Exam"}
        </h1>
        <button
          onClick={reshuffle}
          className="bg-black text-white px-6 py-3 uppercase tracking-wider text-xs hover:opacity-90"
        >
          Assign Halls
        </button>
      </div>

      <div className="space-y-12">
        {halls.map((h) => (
          <div key={h.hallName}>
            <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{h.hallName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {h.seats.map((s, i) => (
                <div key={i} className="border border-gray-200 p-3 w-full" style={{ minHeight: 80 }}>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400">
                    R{s.row} · S{s.seat}
                  </div>
                  <div className="mt-2 text-sm font-semibold">{s.rollNo}</div>
                  <div className="text-xs text-gray-500 truncate">{s.studentName}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
