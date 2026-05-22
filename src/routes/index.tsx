import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <Navbar />

      {/* Hero — centered with floating cards */}
      <section className="relative px-6 md:px-10 pt-8 pb-24">
        <div className="relative mx-auto max-w-6xl rounded-3xl bg-white overflow-hidden" style={{
          backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}>
          {/* Floating card — top left (note) */}
          <div className="hidden md:block absolute top-8 left-6 z-20 rotate-[-6deg]">
            <div className="relative">
              <div className="bg-yellow-200 w-56 h-44 p-4 shadow-md">
                <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-red-500" />
                <p className="text-[13px] leading-snug text-black/80 italic font-medium">
                  Hall 3B — 42 seats. Reshuffle before 9am. Don't forget invigilator slips.
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white w-12 h-12 shadow-md flex items-center justify-center">
                <div className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center font-bold">✓</div>
              </div>
            </div>
          </div>

          {/* Floating card — top right (deadline) */}
          <div className="hidden md:block absolute top-8 right-6 z-20 rotate-[4deg]">
            <div className="bg-white border border-gray-200 w-60 p-4 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 border-2 border-black rounded-full" />
                <span className="text-sm font-semibold">Deadlines</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold">Mid-Sem Schedule</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Publish to portal</p>
                <p className="text-[11px] text-black font-medium mt-2">⏱ 09:00 — 12:45</p>
              </div>
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-28 md:py-36">
            <div className="w-14 h-14 bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-8">
              <span className="font-extrabold text-xl tracking-tight">C</span>
            </div>
            <h1 className="font-bold leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Assign, attend, and grade
              <br />
              <span className="text-gray-400">every single exam</span>
            </h1>
            <p className="mt-6 text-[15px] text-gray-500 max-w-md">
              Coexist handles hall assignment, live attendance, marks entry, and results — all in one place, nothing on paper.
            </p>
            <Link
              to="/login"
              className="mt-8 bg-black text-white px-7 py-3 text-sm font-medium hover:opacity-90 rounded-sm"
            >
              Get started
            </Link>
          </div>

          {/* Floating card — bottom left (exams) */}
          <div className="hidden md:block absolute bottom-8 left-6 z-20 rotate-[-3deg]">
            <div className="bg-white border border-gray-200 w-72 p-4 shadow-md">
              <p className="text-sm font-semibold mb-3">Active Exams</p>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">D</div>
                    <span className="text-xs font-medium">Data Structures</span>
                  </div>
                  <div className="h-1 bg-gray-100"><div className="h-1 bg-black w-2/3" /></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">O</div>
                    <span className="text-xs font-medium">Operating Systems</span>
                  </div>
                  <div className="h-1 bg-gray-100"><div className="h-1 bg-red-400 w-1/3" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card — bottom right (roles) */}
          <div className="hidden md:block absolute bottom-8 right-6 z-20 rotate-[3deg]">
            <div className="bg-white border border-gray-200 w-60 p-4 shadow-md">
              <p className="text-sm font-semibold mb-3">One Platform</p>
              <div className="flex gap-2">
                <div className="flex-1 aspect-square border border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold">Admin</div>
                <div className="flex-1 aspect-square border border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold bg-black text-white">Fac</div>
                <div className="flex-1 aspect-square border border-gray-200 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold">Stu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-10 py-10 flex justify-center">
        <span className="text-xs uppercase tracking-widest text-gray-400">© COEXIST 2026</span>
      </footer>
    </div>
  );
}
