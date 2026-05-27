import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import AdminShell from "@/components/AdminShell";
import {
  constraintRules,
  initialSchedule,
  slotLabels,
  dayLabels,
  ScheduledExam,
} from "@/data/mockData";
import { emptyIngestion, parseAndValidate, IngestionRecord, SourceId } from "@/lib/ingest";

export const Route = createFileRoute("/admin/")({
  component: EngineControl,
});

function EngineControl() {
  const [rules, setRules] = useState(constraintRules);
  const [schedule, setSchedule] = useState<ScheduledExam[]>(initialSchedule);
  const [dragId, setDragId] = useState<number | null>(null);
  const [hover, setHover] = useState<{ d: number; s: number } | null>(null);
  const [generated, setGenerated] = useState(false);
  const [sources, setSources] = useState<Record<SourceId, IngestionRecord>>(emptyIngestion);
  const [busy, setBusy] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    setBusy(true);
    const arr = Array.from(files);
    for (const f of arr) {
      const rec = await parseAndValidate(f);
      setSources((prev) => ({ ...prev, [rec.id]: rec }));
    }
    setBusy(false);
  };

  const toggleRule = (id: string) =>
    setRules((r) => r.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));

  const ready = useMemo(
    () => Object.values(sources).filter((s) => s.status === "ready").length,
    [sources]
  );

  const findAt = (d: number, s: number) =>
    schedule.find((e) => e.day === d && e.slot === s);

  const isConflict = (d: number, s: number, exceptId?: number) =>
    schedule.some((e) => e.day === d && e.slot === s && e.id !== exceptId);

  const onDrop = (d: number, s: number) => {
    if (dragId === null) return;
    if (isConflict(d, s, dragId)) {
      setDragId(null);
      setHover(null);
      return;
    }
    setSchedule((arr) =>
      arr.map((e) => (e.id === dragId ? { ...e, day: d, slot: s } : e))
    );
    setDragId(null);
    setHover(null);
  };

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
            Coexist Engine Control
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
            The Architect's
            <br />
            Console
          </h1>
        </div>
        <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-widest text-gray-400">
          <div>
            <div className="text-2xl font-extrabold text-black">{ready}/4</div>
            Datasets Ready
          </div>
          <div>
            <div className="text-2xl font-extrabold text-black">
              {rules.filter((r) => r.on).length}
            </div>
            Rules Active
          </div>
          <div>
            <div className="text-2xl font-extrabold text-black">{schedule.length}</div>
            Exams Scheduled
          </div>
        </div>
      </div>

      {/* Ingestion */}
      <section className="mb-14">
        <h2 className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
          01 — Data Ingestion
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="border-2 border-dashed border-gray-200 p-8 md:p-10 flex flex-col items-center justify-center text-center hover:border-black transition-colors">
            <div className="text-4xl font-extrabold mb-3">⬆</div>
            <div className="text-sm font-semibold uppercase tracking-wider">
              Drop CSV / XLSX
            </div>
            <div className="text-xs text-gray-500 mt-2 max-w-xs">
              Drag institutional sheets here — students, rooms, courses, faculty
              availability.
            </div>
            <button className="mt-6 text-[11px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
              Browse Files
            </button>
          </div>
          <div className="border border-gray-100 divide-y divide-gray-100">
            {ingestionSources.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{s.label}</div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1 truncate">
                    {s.file} {s.rows ? `· ${s.rows} rows` : ""}
                  </div>
                </div>
                <span
                  className={`shrink-0 ml-4 px-3 py-1 text-[10px] uppercase tracking-widest ${
                    s.status === "ready"
                      ? "bg-black text-white"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Constraints */}
      <section className="mb-14">
        <h2 className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
          02 — Constraint Mapping
        </h2>
        <div className="border border-gray-100 divide-y divide-gray-100">
          {rules.map((r) => (
            <button
              key={r.id}
              onClick={() => toggleRule(r.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border ${
                    r.type === "Hard"
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {r.type}
                </span>
                <span className="text-sm font-medium truncate">{r.label}</span>
              </div>
              <span
                aria-hidden
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  r.on ? "bg-black" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                    r.on ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Generate */}
      <section className="mb-14">
        <h2 className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
          03 — Execute
        </h2>
        <button
          onClick={() => setGenerated(true)}
          className="group w-full md:w-auto bg-black text-white px-10 py-6 uppercase tracking-widest text-sm font-bold hover:bg-gray-900 transition-all flex items-center gap-4"
        >
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          {generated ? "Regenerate Timetable" : "Generate Timetable"}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        {generated && (
          <div className="mt-3 text-[11px] uppercase tracking-widest text-gray-500">
            Solved in 1.84s · 0 hard conflicts · 2 soft preferences relaxed
          </div>
        )}
      </section>

      {/* Conflict Matrix Calendar */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] uppercase tracking-widest text-gray-400">
            04 — Conflict Matrix
          </h2>
          <span className="text-[11px] uppercase tracking-widest text-gray-400">
            Drag exams between slots
          </span>
        </div>

        <div className="border border-gray-100 overflow-x-auto">
          <div className="min-w-[720px] grid grid-cols-[120px_repeat(5,1fr)]">
            <div className="bg-gray-50 border-b border-r border-gray-100" />
            {dayLabels.map((d) => (
              <div
                key={d}
                className="bg-gray-50 border-b border-gray-100 px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500"
              >
                {d}
              </div>
            ))}

            {slotLabels.map((label, s) => (
              <div key={s} className="contents">
                <div className="border-r border-b border-gray-100 px-4 py-6 text-[10px] uppercase tracking-widest text-gray-400">
                  {label}
                </div>
                {dayLabels.map((_, d) => {
                  const exam = findAt(d, s);
                  const conflict =
                    hover?.d === d &&
                    hover?.s === s &&
                    dragId !== null &&
                    isConflict(d, s, dragId);
                  const target =
                    hover?.d === d &&
                    hover?.s === s &&
                    dragId !== null &&
                    !isConflict(d, s, dragId);
                  return (
                    <div
                      key={d}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setHover({ d, s });
                      }}
                      onDragLeave={() => setHover(null)}
                      onDrop={() => onDrop(d, s)}
                      className={`border-b border-r border-gray-100 p-2 min-h-[88px] transition-colors ${
                        conflict
                          ? "bg-red-50"
                          : target
                            ? "bg-green-50"
                            : "bg-white"
                      }`}
                    >
                      {exam && (
                        <div
                          draggable
                          onDragStart={() => setDragId(exam.id)}
                          onDragEnd={() => {
                            setDragId(null);
                            setHover(null);
                          }}
                          className="cursor-grab active:cursor-grabbing bg-black text-white p-3 h-full select-none"
                        >
                          <div className="text-[10px] uppercase tracking-widest opacity-60">
                            {exam.code}
                          </div>
                          <div className="text-sm font-bold mt-1 leading-tight">
                            {exam.title}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest opacity-60 mt-2">
                            {exam.hall}
                          </div>
                        </div>
                      )}
                      {conflict && (
                        <div className="text-[10px] uppercase tracking-widest text-red-700 font-bold">
                          Blocked · Slot Occupied
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
