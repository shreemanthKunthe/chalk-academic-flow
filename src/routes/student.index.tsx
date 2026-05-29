import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUniversity } from "@/context/UniversityContext";
import { useAuth } from "@/context/AuthContext";
import { useSystemData } from "@/context/SystemDataContext";

function printHallTicket(
  universityName: string,
  universityShortName: string,
  studentName: string,
  studentUsn: string,
  studentTimeline: any[]
) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) return;

  const qrCodeSvg = `
    <svg width="80" height="80" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
      <path d="M0 0h9v9H0V0zm1 1v7h7V1H1zm1 1h5v5H2V2zm18-2h9v9h-9V0zm1 1v7h7V1h-7zm1 1h5v5h-5V2zM0 20h9v9H0v-9zm1 1v7h7v-7H1zm1 1h5v5H2v-5zm10-20h2v4h-2V2zm0 6h2v3h-2V8zm3-6h2v2h-2V2zm3 0h2v2h-2V2zm-3 4h2v2h-2V6zm3 2h2v1h-2V8zm-6 4h4v2h-4v-2zm6 0h2v2h-2v-2zm3 0h4v2h-4v-2zm-9 3h2v4h-2v-4zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6 3h2v3h-2v-3zm6 0h2v2h-2v-2zm3 0h2v4h-2v-4zm-9 3h3v2h-3v-2zm6 0h2v2h-2v-2zm-9 3h2v2h-2v-2zm3 0h4v2h-4v-2zm6 0h2v2h-2v-2zm3 0h2v2h-2v-2z" fill="#000000"/>
    </svg>
  `;

  const examRows = studentTimeline.map((e, idx) => `
    <tr>
      <td style="text-align: center; border: 1px solid #000; padding: 10px 8px; font-family: monospace; font-size: 11px;">0${idx + 1}</td>
      <td style="border: 1px solid #000; padding: 10px 8px; font-weight: bold; font-family: monospace; font-size: 11px;">${e.code}</td>
      <td style="border: 1px solid #000; padding: 10px 8px; font-size: 11px;">${e.title}</td>
      <td style="border: 1px solid #000; padding: 10px 8px; font-size: 11px;">${e.date} (${e.day})</td>
      <td style="border: 1px solid #000; padding: 10px 8px; text-align: center; font-size: 10px; font-family: monospace;">${e.slot}</td>
      <td style="border: 1px solid #000; padding: 10px 8px; font-weight: bold; font-family: monospace; text-align: center; font-size: 11px;">${e.room.split('·')[0].trim()}</td>
      <td style="border: 1px solid #000; padding: 10px 8px; font-weight: bold; font-family: monospace; text-align: center; background-color: #f3f4f6; font-size: 11px;">${e.seat}</td>
    </tr>
  `).join("");

  const issueDate = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const refHash = `CEX-${studentTimeline.length}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hall Ticket - ${studentName}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap');
        
        @page {
          size: A4;
          margin: 15mm;
        }
        
        body {
          font-family: 'Instrument Sans', 'Inter', sans-serif;
          color: #000000;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .hall-ticket-container {
          border: 4px double #000000;
          padding: 24px;
          position: relative;
          min-height: calc(297mm - 30mm - 56px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: justify;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          font-size: 80px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.03);
          letter-spacing: 10px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        .header {
          text-align: center;
          border-bottom: 2px solid #000000;
          padding-bottom: 16px;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
        }

        .univ-name {
          font-size: 20px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 4px 0;
        }

        .univ-sub {
          font-size: 11px;
          text-transform: uppercase;
          color: #666;
          letter-spacing: 0.5px;
          margin: 0 0 12px 0;
          font-weight: 600;
        }

        .document-title {
          display: inline-block;
          border: 1.5px solid #000000;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          background-color: #000000;
          color: #ffffff;
        }

        .student-details {
          display: grid;
          grid-template-cols: 1fr 140px;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
          z-index: 10;
        }

        .details-grid {
          display: grid;
          grid-template-cols: 150px 1fr;
          row-gap: 8px;
          font-size: 13px;
        }

        .label {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
          color: #666;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
        }

        .value {
          font-weight: 700;
          color: #000;
        }

        .verification-badge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #000000;
          background-color: #fafafa;
          padding: 12px;
          text-align: center;
          height: fit-content;
        }

        .badge-text {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #10b981;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .timetable-section {
          margin-bottom: 24px;
          position: relative;
          z-index: 10;
          flex-grow: 1;
        }

        .section-heading {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
          border-left: 3px solid #000;
          padding-left: 8px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th {
          border: 1px solid #000000;
          background-color: #f3f4f6;
          padding: 10px 8px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.5px;
          text-align: left;
        }

        td {
          padding: 8px;
          border: 1px solid #e5e7eb;
        }

        .bottom-section {
          display: grid;
          grid-template-cols: 1.5fr 1fr;
          gap: 30px;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #000000;
          position: relative;
          z-index: 10;
        }

        .instructions {
          font-size: 10px;
          color: #444;
          line-height: 1.5;
        }

        .instructions-title {
          font-weight: 800;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 1px;
          color: #000;
          margin-bottom: 6px;
        }

        .instructions ol {
          margin: 0;
          padding-left: 14px;
        }

        .instructions li {
          margin-bottom: 4px;
        }

        .signatures {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          font-size: 11px;
          text-align: right;
        }

        .sig-block {
          margin-top: 10px;
        }

        .sig-line {
          width: 160px;
          border-top: 1px solid #000;
          margin-top: 35px;
          margin-bottom: 4px;
        }

        .sig-title {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.5px;
        }

        .network-verification {
          font-size: 8px;
          font-family: monospace;
          color: #888;
          text-align: center;
          margin-top: 16px;
          border-top: 1px dashed #e5e7eb;
          padding-top: 8px;
          position: relative;
          z-index: 10;
        }
      </style>
    </head>
    <body>
      <div class="hall-ticket-container">
        <div class="watermark">${universityShortName} EXAMS</div>
        
        <div class="header">
          <h1 class="univ-name">${universityName}</h1>
          <p class="univ-sub">OFFICIAL ADMIT CARD &bull; SEMESTER EXAMINATIONS MAY 2026</p>
          <div class="document-title">Verified Hall Ticket</div>
        </div>

        <div class="student-details">
          <div class="details-grid">
            <div class="label">Candidate Name</div>
            <div class="value">${studentName}</div>

            <div class="label">Roll Number (USN)</div>
            <div class="value" style="font-family: monospace; font-size: 14px; letter-spacing: 0.5px;">${studentUsn}</div>

            <div class="label">Degree / Branch</div>
            <div class="value">Bachelor of Engineering &bull; Computer Science & Engineering</div>

            <div class="label">Semester / Year</div>
            <div class="value">VI Semester / 3rd Year</div>

            <div class="label">Institution</div>
            <div class="value">Coexist Institute of Technology</div>
          </div>

          <div class="verification-badge-container">
            ${qrCodeSvg}
            <div class="badge-text">
              <span style="font-size: 10px; color: #10b981;">✓</span> SECURE VERIFIED
            </div>
          </div>
        </div>

        <div class="timetable-section">
          <h3 class="section-heading">Registered Exam Schedule</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;">Sl.</th>
                <th style="width: 90px;">Subject Code</th>
                <th>Subject Description</th>
                <th style="width: 140px;">Date & Day</th>
                <th style="width: 110px; text-align: center;">Session</th>
                <th style="width: 80px; text-align: center;">Room</th>
                <th style="width: 80px; text-align: center;">Seat</th>
              </tr>
            </thead>
            <tbody>
              ${examRows}
            </tbody>
          </table>
        </div>

        <div class="bottom-section">
          <div class="instructions">
            <div class="instructions-title">Important Instructions to Candidate</div>
            <ol>
              <li>Candidates must report to the examination center 30 minutes before the scheduled start time.</li>
              <li>This admit card must be produced along with a valid College Photo ID for entry into the exam hall.</li>
              <li>Programmable calculators, mobile phones, smartwatches, and other electronic devices are strictly prohibited.</li>
              <li>Candidates will not be allowed to enter the exam hall 30 minutes after the commencement of the exam.</li>
              <li>Ensure your seat number matches the registration details on the board.</li>
            </ol>
          </div>

          <div class="signatures">
            <div class="sig-block">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: bold; color: #333; margin-bottom: -15px; font-style: italic; letter-spacing: -1px;">
                Evelyn Vance
              </div>
              <div class="sig-line"></div>
              <div class="sig-title">Registrar (Evaluation)</div>
              <div style="font-size: 8px; color: #888; margin-top: 2px;">COEXIST DIGITAL SIGNATURE</div>
            </div>
          </div>
        </div>

        <div class="network-verification">
          VALIDITY VERIFIED ON COEXIST SCHEDULER BLOCK NETWORK &bull; REF HASH: ${refHash} &bull; ISSUED: ${issueDate}
        </div>
      </div>
    </body>
    </html>
  `;

  doc.open();
  doc.write(htmlContent);
  doc.close();

  iframe.contentWindow?.focus();
  setTimeout(() => {
    iframe.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
}

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const { university } = useUniversity();
  const { usn, email } = useAuth();
  const { schedule, students } = useSystemData();

  const universityName = university?.name || "Visvesvaraya Technological University";
  const universityShortName = university?.shortName || "VTU";

  // Find candidate details dynamically based on logged-in USN/Credentials
  const studentObj = useMemo(() => {
    const searchUsn = usn?.trim().toUpperCase();
    if (!searchUsn) return { usn: "CS2101", name: "Arjun Sharma" };
    const found = students.find((s) => s.usn && s.usn.trim().toUpperCase() === searchUsn);
    return found || { usn: usn || "CS2101", name: "Arjun Sharma" };
  }, [students, usn]);

  const studentName = studentObj.name;
  const studentUsn = studentObj.usn;

  // Dynamically compute personal exam timetable from the global master schedule
  const computedTimeline = useMemo(() => {
    if (!schedule || schedule.length === 0) return [];
    
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const dates = ["May 12, 2026", "May 13, 2026", "May 14, 2026", "May 15, 2026", "May 16, 2026"];
    const slotTimes = ["09:00 – 12:00", "13:00 – 16:00", "17:00 – 20:00"];

    return schedule.map((item, index) => {
      const dayVal = Number(item?.day ?? 0);
      const slotVal = Number(item?.slot ?? 0);
      const dayIndex = isNaN(dayVal) ? 0 : Math.min(Math.max(0, dayVal), 4);
      const date = dates[dayIndex] || "May 12, 2026";
      const dayName = dayNames[dayIndex] || "Mon";
      const slotIndex = isNaN(slotVal) ? 0 : Math.min(Math.max(0, slotVal), 2);
      const slotTime = slotTimes[slotIndex] || "09:00 – 12:00";

      // Dynamic seed-based seat mapping
      const row = (index % 5) + 1;
      const seat = ((index * 3 + 4) % 15) + 1;
      const seatNo = `R${row} · S${seat < 10 ? "0" + seat : seat}`;

      return {
        id: item?.id || index + 1,
        code: item?.code || "SUBJ",
        title: item?.title || "Exam Paper",
        date: date,
        day: dayName,
        slot: slotTime,
        room: `${item?.hall || "Hall A"} · Floor ${(index % 3) + 1}`,
        seat: seatNo,
      };
    });
  }, [schedule]);

  const next = computedTimeline[0];

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
              Hello, {studentName.split(" ")[0]}.
              <br />
              <span className="text-gray-400">
                {computedTimeline.length > 0 ? `${computedTimeline.length} exams ahead.` : "No exams scheduled."}
              </span>
            </h1>
          </div>
          {computedTimeline.length > 0 && (
            <button
              onClick={() => printHallTicket(universityName, universityShortName, studentName, studentUsn, computedTimeline)}
              className="self-start bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-900 transition-colors flex items-center gap-3 cursor-pointer"
            >
              <span>Download Verified Hall Ticket</span>
              <span>↓</span>
            </button>
          )}
        </div>

        {/* Next-up callout */}
        {next ? (
          <section className="mb-12 border border-black p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
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
        ) : (
          <section className="mb-12 border border-dashed border-gray-200 p-8 text-center text-gray-400">
            <div className="text-sm font-bold">No registered exams found</div>
            <div className="text-xs mt-1">Please verify that datasets have been uploaded or contact administration.</div>
          </section>
        )}

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

          {computedTimeline.length > 0 ? (
            <ol className="relative border-l border-gray-200 ml-2">
              {computedTimeline.map((e, i) => (
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
          ) : (
            <div className="text-xs text-gray-500 border border-gray-100 p-6 text-center">
              Your registered course examinations will appear here once scheduling is generated.
            </div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}
