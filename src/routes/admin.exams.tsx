import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { mockExams } from "@/data/mockData";

export const Route = createFileRoute("/admin/exams")({
  component: ExamsPage,
});

function ExamsPage() {
  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Exams</h1>
        <button className="bg-black text-white px-6 py-3 uppercase tracking-wider text-xs hover:opacity-90">
          New Exam
        </button>
      </div>

      <div className="border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Total Marks</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockExams.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-5 font-medium">{e.title}</td>
                <td className="px-6 py-5 text-gray-500">{e.subject}</td>
                <td className="px-6 py-5 text-gray-500">{e.date}</td>
                <td className="px-6 py-5 text-gray-500">{e.duration} min</td>
                <td className="px-6 py-5 text-gray-500">{e.totalMarks}</td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest ${
                      e.status === "upcoming" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
