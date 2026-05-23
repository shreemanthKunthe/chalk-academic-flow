import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import Logo from "@/components/Logo";
import { mockUniversities, University } from "@/data/universities";
import { useUniversity } from "@/context/UniversityContext";

export const Route = createFileRoute("/select-university")({
  head: () => ({
    meta: [
      { title: "Find your university — Coexist" },
      {
        name: "description",
        content:
          "Search for your university to access exams, halls, and results on Coexist.",
      },
    ],
  }),
  component: SelectUniversity,
});

function SelectUniversity() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { setUniversity } = useUniversity();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockUniversities;
    return mockUniversities.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.shortName.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.state.toLowerCase().includes(q),
    );
  }, [query]);

  const selected = useMemo(
    () => mockUniversities.find((u) => u.id === selectedId) || null,
    [selectedId],
  );

  const handleContinue = (u: University) => {
    setUniversity(u);
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-[420px_1fr] bg-white text-black">
      {/* Left panel — brand */}
      <aside className="hidden md:flex flex-col justify-between p-12 border-r border-gray-100">
        <span className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          <Logo size={22} className="text-black" />
          <span>COEXIST</span>
        </span>

        <div>
          <span className="text-[11px] uppercase tracking-widest text-gray-400">
            Step 01 / 02
          </span>
          <h1
            className="font-extrabold leading-[0.9] mt-6"
            style={{ fontSize: "clamp(2.75rem, 4.5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            Find your
            <br />
            university.
          </h1>
          <p className="text-gray-500 mt-5 max-w-[320px] text-[14px] leading-[1.65]">
            Coexist powers exams for colleges across the country. Pick your
            university to continue — every student, faculty and admin signs in
            under their own institution.
          </p>
        </div>

        <span className="text-xs uppercase tracking-widest text-gray-400">
          © 2026
        </span>
      </aside>

      {/* Right panel — search */}
      <main className="flex flex-col p-8 md:p-14">
        <div className="md:hidden mb-8 flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          <Logo size={22} className="text-black" />
          <span>COEXIST</span>
        </div>

        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-2">
            Search universities
          </h2>
          <p className="text-[13px] text-gray-500 mb-8">
            Type your university name, code, city or state.
          </p>

          {/* Search input */}
          <div className="relative mb-10">
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="e.g. VTU, Anna University, Mumbai"
              className="w-full border-0 border-b border-gray-300 focus:border-black outline-none py-3 pl-8 bg-transparent text-base placeholder:text-gray-400"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-widest text-gray-400">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Results list */}
          <div className="border-t border-gray-100">
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-500">
                  No universities match "{query}".
                </p>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-3">
                  Try a different name or code
                </p>
              </div>
            )}

            {filtered.map((u) => {
              const isSel = selectedId === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedId(u.id)}
                  onDoubleClick={() => handleContinue(u)}
                  className={`w-full text-left grid grid-cols-[1fr_auto] items-center gap-4 py-5 border-b border-gray-100 transition-colors ${
                    isSel ? "bg-black text-white px-4" : "hover:bg-gray-50 px-4"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] uppercase tracking-widest font-medium px-2 py-0.5 border ${
                          isSel
                            ? "border-white/40 text-white"
                            : "border-black text-black"
                        }`}
                      >
                        {u.shortName}
                      </span>
                      <span className="text-base font-semibold tracking-tight">
                        {u.name}
                      </span>
                    </div>
                    <div
                      className={`mt-2 text-[12px] uppercase tracking-widest ${
                        isSel ? "text-white/60" : "text-gray-400"
                      }`}
                    >
                      {u.city}, {u.state} · Est. {u.established} · USN&nbsp;
                      {u.usnPattern}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] uppercase tracking-widest ${
                      isSel ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {isSel ? "Selected" : "Select →"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Continue bar */}
          <div className="mt-12 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-400">
              {selected
                ? `Continuing as ${selected.shortName}`
                : "Select a university to continue"}
            </p>
            <button
              type="button"
              disabled={!selected}
              onClick={() => selected && handleContinue(selected)}
              className="bg-black text-white py-4 px-8 uppercase tracking-wider text-sm font-medium hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue to sign in
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
