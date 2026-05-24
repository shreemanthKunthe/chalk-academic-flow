export const mockExams = [
  { id: 1, title: "Data Structures", subject: "CS301", date: "2026-05-10", duration: 180, totalMarks: 100, status: "upcoming" },
  { id: 2, title: "Operating Systems", subject: "CS302", date: "2026-05-12", duration: 180, totalMarks: 100, status: "upcoming" },
  { id: 3, title: "DBMS", subject: "CS303", date: "2026-04-28", duration: 120, totalMarks: 50, status: "completed" },
];

export const mockHalls = [
  { id: 1, name: "Hall A", capacity: 30 },
  { id: 2, name: "Hall B", capacity: 25 },
];

export const mockStudents = [
  { id: 1, name: "Arjun Sharma", rollNo: "CS2101" },
  { id: 2, name: "Priya Nair", rollNo: "CS2102" },
  { id: 3, name: "Rohit Verma", rollNo: "CS2103" },
  { id: 4, name: "Sneha Patel", rollNo: "CS2104" },
  { id: 5, name: "Karan Mehta", rollNo: "CS2105" },
  { id: 6, name: "Divya Iyer", rollNo: "CS2106" },
  { id: 7, name: "Aditya Kumar", rollNo: "CS2107" },
  { id: 8, name: "Pooja Singh", rollNo: "CS2108" },
];

export type SeatingHall = {
  hallName: string;
  seats: { row: number; seat: number; studentName: string; rollNo: string }[];
};

export const mockSeating: Record<number, SeatingHall[]> = {
  1: [
    {
      hallName: "Hall A",
      seats: [
        { row: 1, seat: 1, studentName: "Arjun Sharma", rollNo: "CS2101" },
        { row: 1, seat: 2, studentName: "Priya Nair", rollNo: "CS2102" },
        { row: 1, seat: 3, studentName: "Rohit Verma", rollNo: "CS2103" },
        { row: 1, seat: 4, studentName: "Sneha Patel", rollNo: "CS2104" },
        { row: 2, seat: 1, studentName: "Karan Mehta", rollNo: "CS2105" },
        { row: 2, seat: 2, studentName: "Divya Iyer", rollNo: "CS2106" },
      ],
    },
    {
      hallName: "Hall B",
      seats: [
        { row: 1, seat: 1, studentName: "Aditya Kumar", rollNo: "CS2107" },
        { row: 1, seat: 2, studentName: "Pooja Singh", rollNo: "CS2108" },
      ],
    },
  ],
};

export const mockAttendance = [
  { id: 1, studentName: "Arjun Sharma", rollNo: "CS2101", status: "NOT_MARKED" as const },
  { id: 2, studentName: "Priya Nair", rollNo: "CS2102", status: "NOT_MARKED" as const },
  { id: 3, studentName: "Rohit Verma", rollNo: "CS2103", status: "NOT_MARKED" as const },
  { id: 4, studentName: "Sneha Patel", rollNo: "CS2104", status: "NOT_MARKED" as const },
  { id: 5, studentName: "Karan Mehta", rollNo: "CS2105", status: "NOT_MARKED" as const },
  { id: 6, studentName: "Divya Iyer", rollNo: "CS2106", status: "NOT_MARKED" as const },
  { id: 7, studentName: "Aditya Kumar", rollNo: "CS2107", status: "NOT_MARKED" as const },
  { id: 8, studentName: "Pooja Singh", rollNo: "CS2108", status: "NOT_MARKED" as const },
];

export const mockMarks = [
  { id: 1, studentName: "Arjun Sharma", rollNo: "CS2101", subject: "Data Structures", marks: 88, maxMarks: 100, grade: "A" },
  { id: 2, studentName: "Priya Nair", rollNo: "CS2102", subject: "Data Structures", marks: 92, maxMarks: 100, grade: "O" },
  { id: 3, studentName: "Rohit Verma", rollNo: "CS2103", subject: "Data Structures", marks: 61, maxMarks: 100, grade: "B" },
  { id: 4, studentName: "Sneha Patel", rollNo: "CS2104", subject: "Data Structures", marks: 45, maxMarks: 100, grade: "F" },
];

export function calcGrade(m: number): string {
  if (m >= 90) return "O";
  if (m >= 75) return "A";
  if (m >= 60) return "B";
  if (m >= 50) return "C";
  return "F";
}

// ───── Admin Engine ─────
export type ScheduledExam = {
  id: number;
  code: string;
  title: string;
  day: number; // 0..4 (Mon-Fri)
  slot: number; // 0..2 (Morning/Afternoon/Evening)
  hall: string;
};

export const slotLabels = ["09:00 – 12:00", "13:00 – 16:00", "17:00 – 20:00"];
export const dayLabels = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];

export const initialSchedule: ScheduledExam[] = [
  { id: 1, code: "CS301", title: "Data Structures", day: 0, slot: 0, hall: "Hall A" },
  { id: 2, code: "CS302", title: "Operating Systems", day: 1, slot: 1, hall: "Hall B" },
  { id: 3, code: "CS303", title: "DBMS", day: 2, slot: 0, hall: "Hall A" },
  { id: 4, code: "MA201", title: "Linear Algebra", day: 3, slot: 2, hall: "Hall C" },
  { id: 5, code: "EC301", title: "Signals & Systems", day: 4, slot: 1, hall: "Hall A" },
];

export const ingestionSources = [
  { id: "students", label: "Student Roster", file: "students_2026.csv", rows: 1240, status: "ready" as const },
  { id: "rooms", label: "Rooms & Halls", file: "halls.xlsx", rows: 32, status: "ready" as const },
  { id: "courses", label: "Course Catalog", file: "courses_sem6.csv", rows: 86, status: "ready" as const },
  { id: "faculty", label: "Faculty Availability", file: "—", rows: 0, status: "missing" as const },
];

export const constraintRules = [
  { id: "maxPerDay", label: "Max 1 exam per student per day", type: "Hard", on: true },
  { id: "gap", label: "Minimum 24h gap between exams", type: "Hard", on: true },
  { id: "facultyBlock", label: "Respect faculty blockout windows", type: "Hard", on: true },
  { id: "roomCap", label: "Never exceed room capacity", type: "Hard", on: true },
  { id: "morning", label: "Prefer morning slots for core papers", type: "Soft", on: true },
  { id: "spread", label: "Spread same-branch exams across week", type: "Soft", on: false },
];

// ───── Faculty ─────
export type FacultyCourse = {
  id: number;
  code: string;
  title: string;
  semester: number;
  enrolled: number;
  papers: number;
};

export const facultyCourses: FacultyCourse[] = [
  { id: 1, code: "CS301", title: "Data Structures", semester: 3, enrolled: 124, papers: 124 },
  { id: 2, code: "CS401", title: "Advanced Algorithms", semester: 4, enrolled: 86, papers: 86 },
  { id: 3, code: "CS502", title: "Compiler Design", semester: 5, enrolled: 58, papers: 58 },
];

// ───── Invigilator ─────
export type Duty = {
  id: number;
  date: string;
  day: string;
  slot: string;
  room: string;
  course: string;
  students: number;
};

export const invigilatorDuties: Duty[] = [
  { id: 1, date: "May 12", day: "Tue", slot: "09:00 – 12:00", room: "Hall A · Floor 2", course: "CS301 — Data Structures", students: 42 },
  { id: 2, date: "May 14", day: "Thu", slot: "13:00 – 16:00", room: "Hall C · Floor 1", course: "MA201 — Linear Algebra", students: 38 },
  { id: 3, date: "May 16", day: "Sat", slot: "09:00 – 12:00", room: "Hall B · Floor 2", course: "EC301 — Signals & Systems", students: 40 },
];

// ───── Student ─────
export type StudentExam = {
  id: number;
  code: string;
  title: string;
  date: string;
  day: string;
  slot: string;
  room: string;
  seat: string;
};

export const studentTimeline: StudentExam[] = [
  { id: 1, code: "CS301", title: "Data Structures", date: "May 12, 2026", day: "Tue", slot: "09:00 – 12:00", room: "Hall A · Floor 2", seat: "R3 · S07" },
  { id: 2, code: "CS302", title: "Operating Systems", date: "May 14, 2026", day: "Thu", slot: "13:00 – 16:00", room: "Hall B · Floor 1", seat: "R1 · S12" },
  { id: 3, code: "MA201", title: "Linear Algebra", date: "May 16, 2026", day: "Sat", slot: "09:00 – 12:00", room: "Hall C · Floor 1", seat: "R5 · S04" },
  { id: 4, code: "EC301", title: "Signals & Systems", date: "May 19, 2026", day: "Tue", slot: "13:00 – 16:00", room: "Hall A · Floor 2", seat: "R2 · S09" },
  { id: 5, code: "HU101", title: "Technical Writing", date: "May 21, 2026", day: "Thu", slot: "09:00 – 12:00", room: "Hall D · Floor 3", seat: "R4 · S15" },
  { id: 6, code: "CS401", title: "Advanced Algorithms", date: "May 23, 2026", day: "Sat", slot: "13:00 – 16:00", room: "Hall B · Floor 2", seat: "R6 · S02" },
];
