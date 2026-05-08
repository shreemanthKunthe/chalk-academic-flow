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
