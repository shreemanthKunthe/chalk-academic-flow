import * as XLSX from "xlsx";
import Papa from "papaparse";

export type SourceId = "students" | "rooms" | "courses" | "faculty";

export type IngestionRecord = {
  id: SourceId;
  label: string;
  file: string;
  rows: number;
  status: "ready" | "missing" | "error";
  errors: string[];
  sample: Record<string, unknown>[];
  data?: Record<string, unknown>[];
};

// Required columns per source (mock validation schema)
const SCHEMA: Record<SourceId, { label: string; required: string[]; keywords: string[] }> = {
  students: {
    label: "Student Roster",
    required: ["usn", "name"],
    keywords: ["student", "roster", "usn", "roll"],
  },
  rooms: {
    label: "Rooms & Halls",
    required: ["room", "capacity"],
    keywords: ["room", "hall", "venue"],
  },
  courses: {
    label: "Course Catalog",
    required: ["code", "title"],
    keywords: ["course", "subject", "catalog", "paper"],
  },
  faculty: {
    label: "Faculty Availability",
    required: ["name", "available"],
    keywords: ["faculty", "professor", "teacher", "availability"],
  },
};

export const emptyIngestion: Record<SourceId, IngestionRecord> = {
  students: { id: "students", label: SCHEMA.students.label, file: "—", rows: 0, status: "missing", errors: [], sample: [] },
  rooms: { id: "rooms", label: SCHEMA.rooms.label, file: "—", rows: 0, status: "missing", errors: [], sample: [] },
  courses: { id: "courses", label: SCHEMA.courses.label, file: "—", rows: 0, status: "missing", errors: [], sample: [] },
  faculty: { id: "faculty", label: SCHEMA.faculty.label, file: "—", rows: 0, status: "missing", errors: [], sample: [] },
};

function detectSource(filename: string, headers: string[]): SourceId | null {
  const fn = filename.toLowerCase();
  const hdr = headers.map((h) => h.toLowerCase());
  let bestId: SourceId | null = null;
  let bestScore = 0;
  (Object.keys(SCHEMA) as SourceId[]).forEach((id) => {
    const { keywords, required } = SCHEMA[id];
    let score = 0;
    keywords.forEach((k) => { if (fn.includes(k)) score += 2; });
    required.forEach((r) => { if (hdr.some((h) => h.includes(r))) score += 3; });
    if (score > bestScore) { bestScore = score; bestId = id; }
  });
  return bestId;
}

async function readFile(file: File): Promise<{ headers: string[]; rows: Record<string, unknown>[] }> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) {
    const text = await file.text();
    const parsed = Papa.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: true });
    const headers = parsed.meta.fields ?? [];
    return { headers, rows: parsed.data };
  }
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
    const headers = rows.length ? Object.keys(rows[0]) : [];
    return { headers, rows };
  }
  throw new Error("Unsupported file type. Use .csv, .xlsx, or .xls");
}

export async function parseAndValidate(file: File): Promise<IngestionRecord> {
  try {
    const { headers, rows } = await readFile(file);
    const sourceId = detectSource(file.name, headers);
    if (!sourceId) {
      return {
        id: "students",
        label: "Unrecognized",
        file: file.name,
        rows: rows.length,
        status: "error",
        errors: ["Could not detect dataset type from filename or headers."],
        sample: rows.slice(0, 3),
      };
    }
    const schema = SCHEMA[sourceId];
    const hdrLower = headers.map((h) => h.toLowerCase());
    const missingCols = schema.required.filter((r) => !hdrLower.some((h) => h.includes(r)));
    const errors: string[] = [];
    if (missingCols.length) errors.push(`Missing columns: ${missingCols.join(", ")}`);
    if (rows.length === 0) errors.push("File contains no data rows.");
    // mock row-level validation: empty required cells
    let badRows = 0;
    rows.forEach((row) => {
      const keys = Object.keys(row).map((k) => k.toLowerCase());
      const hasAllReq = schema.required.every((r) => keys.some((k) => k.includes(r)));
      if (hasAllReq) {
        const empty = schema.required.some((r) => {
          const key = Object.keys(row).find((k) => k.toLowerCase().includes(r));
          return !key || String(row[key] ?? "").trim() === "";
        });
        if (empty) badRows += 1;
      }
    });
    if (badRows) errors.push(`${badRows} row(s) missing required values.`);

    return {
      id: sourceId,
      label: schema.label,
      file: file.name,
      rows: rows.length,
      status: errors.length ? "error" : "ready",
      errors,
      sample: rows.slice(0, 3),
      data: rows,
    };
  } catch (e) {
    return {
      id: "students",
      label: "Parse failed",
      file: file.name,
      rows: 0,
      status: "error",
      errors: [(e as Error).message],
      sample: [],
    };
  }
}

export function downloadTemplate(id: SourceId, format: "csv" | "xlsx") {
  const schema = SCHEMA[id];
  if (!schema) return;

  const data: Record<string, string>[] = [];
  if (id === "students") {
    data.push({ usn: "CS2101", name: "Arjun Sharma" });
    data.push({ usn: "CS2102", name: "Priya Nair" });
    data.push({ usn: "CS2103", name: "Rohit Verma" });
  } else if (id === "rooms") {
    data.push({ room: "Hall A", capacity: "30" });
    data.push({ room: "Hall B", capacity: "25" });
    data.push({ room: "Hall C", capacity: "40" });
  } else if (id === "courses") {
    data.push({ code: "CS301", title: "Data Structures" });
    data.push({ code: "CS302", title: "Operating Systems" });
    data.push({ code: "CS303", title: "DBMS" });
  } else if (id === "faculty") {
    data.push({ name: "Dr. Ramesh Kumar", available: "Mon, Wed, Fri" });
    data.push({ name: "Dr. Sunita Rao", available: "Tue, Thu" });
    data.push({ name: "Prof. Anil Mehta", available: "Mon, Tue, Wed, Thu, Fri" });
  }

  if (format === "csv") {
    const headers = schema.required;
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => `"${row[h] ?? ""}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${id}_template.csv`);
    link.click();
    URL.revokeObjectURL(url);
  } else if (format === "xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, schema.label);
    
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${id}_template.xlsx`);
    link.click();
    URL.revokeObjectURL(url);
  }
}

