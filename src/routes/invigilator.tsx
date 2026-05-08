import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { mockAttendance } from "@/data/mockData";

export const Route = createFileRoute("/invigilator")({
  component: LiveAttendance,
});

type Status = "PRESENT" | "ABSENT" | "NOT_MARKED";

function LiveAttendance() {
  const [list, setList] = useState<{ id: number; studentName: string; rollNo: string; status: Status }[]>(
    mockAttendance.map((s) => ({ ...s, status: s.status as Status }))
  );

  const counts = useMemo(() => {
    const c = { PRESENT: 0, ABSENT: 0, NOT_MARKED: 0 };
    list.forEach((s) => (c[s.status as Status] += 1));
    return c;
  }, [list]);

  const mark = (id: number, status: Status) => {
    setList((l) => l.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <ProtectedRoute allow={["invigilator", "admin"]}>
      <div className="min-h-screen bg-white text-black p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-10">
          Attendance — Hall A
        </h1>

        <div className="flex flex-wrap gap-8 mb-10 text-xs uppercase tracking-widest">
          <span>Present: <strong className="text-black">{counts.PRESENT}</strong></span>
          <span>Absent: <strong className="text-black">{counts.ABSENT}</strong></span>
          <span>Not Marked: <strong className="text-black">{counts.NOT_MARKED}</strong></span>
        </div>

        <div className="space-y-3 max-w-3xl">
          {list.map((s) => {
            const isP = s.status === "PRESENT";
            const isA = s.status === "ABSENT";
            return (
              <div
                key={s.id}
                className={`flex items-center justify-between border p-4 transition-colors ${
                  isP ? "bg-green-50 border-green-200" : isA ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
                }`}
              >
                <div>
                  <div className="font-semibold">{s.studentName}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">{s.rollNo}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => mark(s.id, "PRESENT")}
                    className="bg-black text-white px-4 py-2 text-[11px] uppercase tracking-wider hover:opacity-90"
                  >
                    Present
                  </button>
                  <button
                    onClick={() => mark(s.id, "ABSENT")}
                    className="bg-red-600 text-white px-4 py-2 text-[11px] uppercase tracking-wider hover:opacity-90"
                  >
                    Absent
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
