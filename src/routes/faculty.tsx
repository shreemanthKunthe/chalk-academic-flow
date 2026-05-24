import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { facultyCourses } from "@/data/mockData";

export const Route = createFileRoute("/faculty")({
  component: FacultyDashboard,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const slots = ["Morning", "Afternoon", "Evening"];

type Status = "available" | "preferred-leave" | "blocked";
const cycle: Record<Status, Status> = {
  available: "preferred-leave",
  "preferred-leave": "blocked",
  blocked: "available",
};
const styles: Record<Status, string> = {
  available: "bg-white border-gray-200 text-gray-400",
  "preferred-leave": "bg-yellow-50 border-yellow-300 text-yellow-800",
  blocked: "bg-red-50 border-red-300 text-red-700",
};
const labels: Record<Status, string> = {
  available: "Available",
  "preferred-leave": "Prefer Off",
  blocked: "Blocked",
};

function FacultyDashboard() {
  const [grid, setGrid] = useState<Status[][]>(
    Array.from({ length: 3 }, () => Array(5).fill("available") as Status[])
  );
  const [saved, setSaved] = useState(false);

  const toggle = (s: number, d: number) => {
    setGrid((g) =>
      g.map((row, i) =>
        i === s ? row.map((c, j) => (j === d ? cycle[c] : c)) : row
      )
    );
    setSaved(false);
  };

  const totalStudents = facultyCourses.reduce((a, b) => a + b.enrolled, 0);

  return (
    <ProtectedRoute allow={["faculty", "admin"]}>
      <div className="min-h-screen bg-white text-black px-5 md:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
              Academic Boundary Controller
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
              Set Your
              <br />
              Availability
            </h1>
          </div>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest text-gray-400">
            <div>
              <div className="text-2xl font-extrabold text-black">
                {facultyCourses.length}
              </div>
              Course Papers
            </div>
            <div>
              <div className="text-2xl font-extrabold text-black">{totalStudents}</div>
              Enrolled
            </div>
          </div>
        </div>

        {/* Availability grid */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] uppercase tracking-widest text-gray-400">
              01 — Submit Before Generation
            </h2>
            <span className="text-[11px] uppercase tracking-widest text-gray-400">
              Tap to cycle
            </span>
          </div>

          <div className="border border-gray-100 overflow-x-auto">
            <div className="min-w-[640px] grid grid-cols-[120px_repeat(5,1fr)]">
              <div className="bg-gray-50 border-b border-r border-gray-100" />
              {days.map((d) => (
                <div
                  key={d}
                  className="bg-gray-50 border-b border-gray-100 px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500"
                >
                  {d}
                </div>
              ))}
              {slots.map((label, s) => (
                <div key={s} className="contents">
                  <div className="border-r border-b border-gray-100 px-4 py-5 text-[10px] uppercase tracking-widest text-gray-400">
                    {label}
                  </div>
                  {days.map((_, d) => {
                    const st = grid[s][d];
                    return (
                      <button
                        key={d}
                        onClick={() => toggle(s, d)}
                        className={`border-b border-r border-gray-100 p-2 min-h-[72px] text-left transition-colors hover:opacity-80`}
                      >
                        <div
                          className={`h-full w-full border p-2 flex flex-col justify-between ${styles[st]}`}
                        >
                          <span className="text-[10px] uppercase tracking-widest font-bold">
                            {labels[st]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-[10px] uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-2"><span className="h-2 w-2 bg-white border border-gray-300" /> Available</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 bg-yellow-300" /> Preferred Leave</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 bg-red-400" /> Blocked</span>
          </div>

          <button
            onClick={() => setSaved(true)}
            className="mt-8 bg-black text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-900"
          >
            {saved ? "✓ Submitted" : "Submit Availability"}
          </button>
        </section>

        {/* Courses Verification */}
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
            02 — Assigned Course Papers
          </h2>
          <div className="border border-gray-100 overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Semester</th>
                  <th className="px-6 py-4">Enrolled</th>
                  <th className="px-6 py-4">Papers</th>
                  <th className="px-6 py-4">Verify</th>
                </tr>
              </thead>
              <tbody>
                {facultyCourses.map((c) => {
                  const ok = c.enrolled === c.papers;
                  return (
                    <tr key={c.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-5 font-semibold">{c.code}</td>
                      <td className="px-6 py-5">{c.title}</td>
                      <td className="px-6 py-5 text-gray-500">Sem {c.semester}</td>
                      <td className="px-6 py-5 font-bold">{c.enrolled}</td>
                      <td className="px-6 py-5">{c.papers}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase tracking-widest ${
                            ok ? "bg-black text-white" : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {ok ? "Match" : "Mismatch"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
