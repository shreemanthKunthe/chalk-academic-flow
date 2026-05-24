import { createFileRoute, Link } from "@tanstack/react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { studentTimeline } from "@/data/mockData";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const next = studentTimeline[0];

  return (
    <ProtectedRoute allow={["student", "admin"]}>
      <div className="min-h-screen bg-white text-black px-5 md:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
              Your Personal Timeline
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
              Hello, Arjun.
              <br />
              <span className="text-gray-400">{studentTimeline.length} exams ahead.</span>
            </h1>
          </div>
          <button className="self-start bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-900 transition-colors flex items-center gap-3">
            <span>Download Verified Hall Ticket</span>
            <span>↓</span>
          </button>
        </div>

        {/* Next-up callout */}
        <section className="mb-12 border border-black p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="text-[10px] uppercase tracking-widest text-gray-400">Next Exam</div>
            <div className="text-2xl md:text-3xl font-extrabold uppercase mt-2 leading-tight">
              {next.title}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">{next.code}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400">When</div>
            <div className="text-sm font-bold mt-2">{next.date}</div>
            <div className="text-xs text-gray-500">{next.slot}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400">Where</div>
            <div className="text-sm font-bold mt-2">{next.room}</div>
            <div className="text-xs text-gray-500">Seat {next.seat}</div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[11px] uppercase tracking-widest text-gray-400">
              Your Registered Exams
            </h2>
            <Link
              to="/student/results"
              className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black"
            >
              View Results →
            </Link>
          </div>

          <ol className="relative border-l border-gray-200 ml-2">
            {studentTimeline.map((e, i) => (
              <li key={e.id} className="pl-6 md:pl-10 pb-8 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-black ring-4 ring-white" />
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_180px_140px] gap-4 md:gap-8 items-start">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">
                      {e.day}
                    </div>
                    <div className="text-lg font-extrabold leading-tight">{e.date}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{e.slot}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">
                      Course · 0{i + 1}
                    </div>
                    <div className="text-lg md:text-xl font-extrabold uppercase mt-1 leading-tight">
                      {e.title}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">
                      {e.code}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">Block / Room</div>
                    <div className="text-sm font-semibold mt-1">{e.room}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">Seat</div>
                    <div className="text-sm font-bold mt-1 inline-block bg-black text-white px-3 py-1.5 tracking-widest">
                      {e.seat}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </ProtectedRoute>
  );
}
