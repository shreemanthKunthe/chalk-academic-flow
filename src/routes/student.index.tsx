import { createFileRoute, Link } from "@tanstack/react-router";
import ProtectedRoute from "@/components/ProtectedRoute";

export const Route = createFileRoute("/student/")({
  component: StudentPortal,
});

function StudentPortal() {
  return (
    <ProtectedRoute allow={["student", "admin"]}>
      <div className="min-h-screen bg-white text-black p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-12">
          Hello, Arjun
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Link to="/admin/seating/$examId" params={{ examId: "1" }} className="bg-black text-white p-10 hover:opacity-90 block">
            <div className="text-xs uppercase tracking-widest opacity-60">View</div>
            <div className="mt-3 text-3xl font-extrabold uppercase">My Seating</div>
          </Link>
          <Link to="/student/results" className="bg-black text-white p-10 hover:opacity-90 block">
            <div className="text-xs uppercase tracking-widest opacity-60">View</div>
            <div className="mt-3 text-3xl font-extrabold uppercase">My Results</div>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
