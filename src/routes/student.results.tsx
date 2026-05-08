import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { mockMarks } from "@/data/mockData";

export const Route = createFileRoute("/student/results")({
  component: Results,
});

function gradeBadge(g: string) {
  if (g === "O" || g === "A") return "bg-black text-white";
  if (g === "F") return "bg-red-600 text-white";
  return "bg-gray-200 text-gray-700";
}

function Results() {
  const total = mockMarks.reduce((a, b) => a + b.marks, 0);
  const max = mockMarks.reduce((a, b) => a + b.maxMarks, 0);
  const pct = max ? Math.round((total / max) * 100) : 0;

  return (
    <ProtectedRoute allow={["student", "admin"]}>
      <div className="min-h-screen bg-white text-black p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-10">
          Your Results
        </h1>

        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-400">Overall</div>
          <div className="text-6xl md:text-7xl font-extrabold">{pct}%</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {mockMarks.map((m) => (
            <div key={m.id} className="border border-gray-100 p-6 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold uppercase">{m.subject}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {m.marks} / {m.maxMarks}
                </div>
              </div>
              <span className={`px-4 py-2 text-xs uppercase tracking-widest font-bold ${gradeBadge(m.grade)}`}>
                {m.grade}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
