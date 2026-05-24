import { createFileRoute, Link } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { mockExams, mockStudents, mockHalls } from "@/data/mockData";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const examsToday = mockExams.filter((e) => e.date === today).length;

  const stats = [
    { label: "Total Students", value: mockStudents.length },
    { label: "Total Exams", value: mockExams.length },
    { label: "Halls Available", value: mockHalls.length },
    { label: "Exams Today", value: examsToday },
  ];

  return (
    <AdminShell>
      <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-8 md:mb-12">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
        {stats.map((s) => (
          <div key={s.label} className="border border-gray-100 p-4 md:p-6 shadow-sm">
            <div className="text-3xl md:text-4xl font-extrabold">{s.value}</div>
            <div className="mt-2 text-[11px] uppercase tracking-widest text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Recent Exams</h2>
      <div className="border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
              <th className="px-6 py-4">Exam</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockExams.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-5 font-medium">{e.title}</td>
                <td className="px-6 py-5 text-gray-500">{e.subject}</td>
                <td className="px-6 py-5 text-gray-500">{e.date}</td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest ${
                      e.status === "upcoming" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-5 space-x-6">
                  <Link to="/admin/seating/$examId" params={{ examId: String(e.id) }} className="text-[11px] uppercase tracking-widest hover:opacity-60">
                    View Seating
                  </Link>
                  <Link to="/invigilator" className="text-[11px] uppercase tracking-widest hover:opacity-60">
                    View Attendance
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
