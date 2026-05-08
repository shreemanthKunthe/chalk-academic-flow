import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { mockStudents, calcGrade } from "@/data/mockData";

export const Route = createFileRoute("/faculty")({
  component: MarksEntry,
});

function MarksEntry() {
  const [marks, setMarks] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState(false);

  const update = (id: number, v: string) => {
    setMarks({ ...marks, [id]: v });
    setSaved(false);
  };

  return (
    <ProtectedRoute allow={["faculty", "admin"]}>
      <div className="min-h-screen bg-white text-black p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-10">
          Marks Entry — Data Structures
        </h1>

        <div className="border border-gray-100 max-w-4xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Marks</th>
                <th className="px-6 py-4">Max</th>
                <th className="px-6 py-4">Grade</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((s) => {
                const v = marks[s.id] ?? "";
                const n = Number(v);
                const grade = v === "" || isNaN(n) ? "—" : calcGrade(n);
                return (
                  <tr key={s.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4 font-medium">{s.name}</td>
                    <td className="px-6 py-4 text-gray-500">{s.rollNo}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={v}
                        onChange={(e) => update(s.id, e.target.value)}
                        className="w-20 border-b border-gray-300 focus:border-black outline-none py-1 bg-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-500">100</td>
                    <td className="px-6 py-4">
                      <span className="bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => setSaved(true)}
          disabled={saved}
          className="mt-10 bg-black text-white px-10 py-4 uppercase tracking-wider text-sm font-medium hover:opacity-90 disabled:opacity-100"
        >
          {saved ? "Marks Saved" : "Submit All"}
        </button>
      </div>
    </ProtectedRoute>
  );
}
