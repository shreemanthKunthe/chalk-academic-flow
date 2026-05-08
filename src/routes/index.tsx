import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative px-10 pt-10 pb-24">
        {/* concentric circles bg */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          width="1600"
          height="1600"
          viewBox="0 0 1600 1600"
          fill="none"
        >
          {[760, 640, 520, 400, 280].map((r) => (
            <circle key={r} cx="800" cy="800" r={r} stroke="#F3F4F6" strokeWidth="1" />
          ))}
        </svg>

        <div className="relative z-10">
          <h1
            className="font-extrabold leading-[0.85] text-black"
            style={{ fontSize: "clamp(5rem, 12vw, 10rem)", letterSpacing: "-4px" }}
          >
            RUN EXAMS
          </h1>

          <div className="mt-10 grid md:grid-cols-2 gap-10 items-start">
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-gray-400 uppercase tracking-widest text-sm">
              <span>ASSIGN</span>
              <span>ATTEND</span>
              <span>GRADE</span>
              <span>PUBLISH</span>
            </div>
            <p className="text-[15px] leading-[1.6] text-gray-500 max-w-[320px] md:justify-self-end">
              Chalk handles everything your exam cell dreads — hall assignment, live attendance,
              marks entry, and results. All in one place, nothing on paper.
            </p>
          </div>
        </div>
      </section>

      {/* Staggered cards */}
      <section className="px-10 pb-24">
        <div className="flex gap-6 items-start flex-wrap md:flex-nowrap">
          <div className="bg-gray-200 rounded-2xl w-full md:w-[18%] shadow-sm" style={{ height: 200 }} />
          <div className="bg-gray-200 rounded-2xl w-full md:w-[22%] shadow-sm md:-mt-10" style={{ height: 260 }} />
          <div className="bg-gray-200 rounded-2xl w-full md:w-[36%] shadow-sm" style={{ height: 220 }} />
          <div className="bg-gray-200 rounded-2xl w-full md:w-[20%] shadow-sm md:mt-6" style={{ height: 240 }} />
        </div>
      </section>

      {/* Black bar */}
      <section className="bg-black text-white py-10 px-10 text-center">
        <p className="uppercase tracking-widest text-sm md:text-base">
          The complete exam platform for modern colleges
        </p>
      </section>

      {/* CTA */}
      <section className="px-10 py-20 flex flex-col items-center gap-6">
        <Link
          to="/login"
          className="bg-black text-white px-10 py-4 uppercase tracking-wider text-sm font-medium hover:opacity-90"
        >
          Get Started
        </Link>
        <span className="text-xs uppercase tracking-widest text-gray-400">© CHALK 2026</span>
      </section>
    </div>
  );
}
