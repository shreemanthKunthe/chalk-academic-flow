import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { invigilatorDuties, mockAttendance } from "@/data/mockData";

export const Route = createFileRoute("/invigilator")({
  component: InvigilatorDashboard,
});

type Status = "PRESENT" | "ABSENT" | "NOT_MARKED";

const ROWS = 5;
const COLS = 6;

function InvigilatorDashboard() {
  const [activeDuty, setActiveDuty] = useState(invigilatorDuties[0].id);
  const [attendance, setAttendance] = useState<Record<string, Status>>({});
  const [swapOpen, setSwapOpen] = useState(false);

  const duty = invigilatorDuties.find((d) => d.id === activeDuty)!;

  // Build seat grid from mockAttendance (repeat to fill grid for demo)
  const seats = Array.from({ length: ROWS * COLS }, (_, i) => {
    const s = mockAttendance[i % mockAttendance.length];
    return {
      key: `${duty.id}-${i}`,
      row: Math.floor(i / COLS) + 1,
      col: (i % COLS) + 1,
      rollNo: s.rollNo,
      name: s.studentName,
    };
  });

  const cycle = (key: string) => {
    setAttendance((a) => {
      const cur = a[key] ?? "NOT_MARKED";
      const next: Status =
        cur === "NOT_MARKED" ? "PRESENT" : cur === "PRESENT" ? "ABSENT" : "NOT_MARKED";
      return { ...a, [key]: next };
    });
  };

  const present = seats.filter((s) => attendance[s.key] === "PRESENT").length;
  const absent = seats.filter((s) => attendance[s.key] === "ABSENT").length;

  return (
    <ProtectedRoute allow={["invigilator", "admin"]}>
      <div className="min-h-screen bg-white text-black px-5 md:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
              Live Duty Control
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]">
              On-Duty
              <br />
              Today
            </h1>
          </div>
          <button
            onClick={() => setSwapOpen((v) => !v)}
            className="self-start border border-black px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Request Duty Swap
          </button>
        </div>

        {/* Duty timeline */}
        <section className="mb-14">
          <h2 className="text-[11px] uppercase tracking-widest text-gray-400 mb-4">
            01 — Your Assigned Duties
          </h2>
          <div className="space-y-3">
            {invigilatorDuties.map((d) => {
              const active = d.id === activeDuty;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDuty(d.id)}
                  className={`w-full text-left border transition-colors p-5 md:p-6 grid grid-cols-2 md:grid-cols-[100px_180px_1fr_120px] gap-4 items-center ${
                    active ? "bg-black text-white border-black" : "bg-white border-gray-100 hover:border-black"
                  }`}
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">{d.day}</div>
                    <div className="text-2xl font-extrabold">{d.date}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Slot</div>
                    <div className="text-sm font-semibold mt-1">{d.slot}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Room · Course</div>
                    <div className="text-sm font-semibold mt-1">{d.room}</div>
                    <div className="text-xs opacity-70 mt-0.5">{d.course}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Students</div>
                    <div className="text-2xl font-extrabold">{d.students}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Swap panel */}
        {swapOpen && (
          <section className="mb-14 border border-gray-200 p-6 md:p-8 bg-gray-50">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Swap Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">From</div>
                <div className="border border-gray-300 bg-white p-3 text-sm">{duty.date} · {duty.slot}</div>
              </div>
              <input
                placeholder="Faculty to swap with"
                className="border border-gray-300 bg-white p-3 text-sm focus:border-black outline-none"
              />
              <input
                placeholder="Reason (optional)"
                className="border border-gray-300 bg-white p-3 text-sm focus:border-black outline-none"
              />
            </div>
            <button className="mt-5 bg-black text-white px-8 py-3 uppercase tracking-widest text-[11px] font-bold">
              Send Request
            </button>
          </section>
        )}

        {/* Seating Layout Matrix */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-[11px] uppercase tracking-widest text-gray-400">
                02 — Seating Layout · {duty.room}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Tap a seat to mark Present → Absent → Reset</p>
            </div>
            <div className="flex gap-6 text-[11px] uppercase tracking-widest">
              <span>Present <strong className="text-black">{present}</strong></span>
              <span>Absent <strong className="text-black">{absent}</strong></span>
              <span>Pending <strong className="text-black">{seats.length - present - absent}</strong></span>
            </div>
          </div>

          <div className="border border-gray-100 p-4 md:p-6 overflow-x-auto">
            <div className="text-center text-[10px] uppercase tracking-widest text-gray-400 mb-4 py-2 border-y border-dashed border-gray-200">
              Invigilator Desk · Front of Hall
            </div>
            <div
              className="grid gap-3 min-w-[560px]"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {seats.map((s) => {
                const st = attendance[s.key] ?? "NOT_MARKED";
                const cls =
                  st === "PRESENT"
                    ? "bg-black text-white border-black"
                    : st === "ABSENT"
                      ? "bg-red-50 text-red-700 border-red-300"
                      : "bg-white text-gray-700 border-gray-200 hover:border-black";
                return (
                  <button
                    key={s.key}
                    onClick={() => cycle(s.key)}
                    className={`border p-3 text-left transition-colors ${cls}`}
                  >
                    <div className="text-[9px] uppercase tracking-widest opacity-60">
                      R{s.row}·S{s.col}
                    </div>
                    <div className="text-xs font-bold mt-1">{s.rollNo}</div>
                    <div className="text-[10px] opacity-70 truncate">{s.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
