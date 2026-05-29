import React, { createContext, useContext, useState, useEffect } from "react";
import {
  mockStudents as initialMockStudents,
  mockHalls as initialMockHalls,
  initialSchedule as initialMockSchedule,
} from "@/data/mockData";

export type IngestedStudent = {
  usn: string;
  name: string;
};

export type IngestedRoom = {
  room: string;
  capacity: number;
};

export type IngestedCourse = {
  code: string;
  title: string;
};

export type IngestedFaculty = {
  name: string;
  available: string;
};

export type ScheduledExam = {
  id: number;
  code: string;
  title: string;
  day: number;
  slot: number;
  hall: string;
};

type SystemDataCtx = {
  students: IngestedStudent[];
  rooms: IngestedRoom[];
  courses: IngestedCourse[];
  faculty: IngestedFaculty[];
  schedule: ScheduledExam[];
  
  // Dynamic update methods
  setIngestedData: (type: "students" | "rooms" | "courses" | "faculty", data: any[]) => void;
  updateSchedule: (newSchedule: ScheduledExam[]) => void;
  resetAllData: () => void;
  
  // Validation checks
  isStudentAccepted: (usn: string) => boolean;
  hasCustomRoster: boolean;
};

const DataContext = createContext<SystemDataCtx | null>(null);

export function SystemDataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<IngestedStudent[]>([]);
  const [rooms, setRooms] = useState<IngestedRoom[]>([]);
  const [courses, setCourses] = useState<IngestedCourse[]>([]);
  const [faculty, setFaculty] = useState<IngestedFaculty[]>([]);
  const [schedule, setSchedule] = useState<ScheduledExam[]>([]);
  const [hasCustomRoster, setHasCustomRoster] = useState(false);

  // Load from localStorage or initialize with standard mock data defensively
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedStudents = localStorage.getItem("coexist_store_students");
      if (storedStudents) {
        const parsed = JSON.parse(storedStudents);
        if (Array.isArray(parsed)) {
          setStudents(parsed.map(s => ({
            usn: String(s?.usn || s?.rollNo || "").trim().toUpperCase(),
            name: String(s?.name || "").trim()
          })).filter(s => s.usn));
        } else {
          throw new Error("Invalid student data");
        }
      } else {
        setStudents(initialMockStudents.map(s => ({ usn: s.rollNo, name: s.name })));
      }
    } catch (e) {
      setStudents(initialMockStudents.map(s => ({ usn: s.rollNo, name: s.name })));
    }

    try {
      const storedRooms = localStorage.getItem("coexist_store_rooms");
      if (storedRooms) {
        const parsed = JSON.parse(storedRooms);
        if (Array.isArray(parsed)) {
          setRooms(parsed.map(r => ({
            room: String(r?.room || r?.name || "").trim(),
            capacity: Number(r?.capacity || 0)
          })).filter(r => r.room));
        } else {
          throw new Error("Invalid room data");
        }
      } else {
        setRooms(initialMockHalls.map(h => ({ room: h.name, capacity: h.capacity })));
      }
    } catch (e) {
      setRooms(initialMockHalls.map(h => ({ room: h.name, capacity: h.capacity })));
    }

    try {
      const storedCourses = localStorage.getItem("coexist_store_courses");
      if (storedCourses) {
        const parsed = JSON.parse(storedCourses);
        if (Array.isArray(parsed)) {
          setCourses(parsed.map(c => ({
            code: String(c?.code || "").trim().toUpperCase(),
            title: String(c?.title || "").trim()
          })).filter(c => c.code));
        } else {
          throw new Error("Invalid course data");
        }
      } else {
        setCourses([
          { code: "CS301", title: "Data Structures" },
          { code: "CS302", title: "Operating Systems" },
          { code: "CS303", title: "DBMS" },
          { code: "MA201", title: "Linear Algebra" },
          { code: "EC301", title: "Signals & Systems" },
          { code: "HU101", title: "Technical Writing" },
          { code: "CS401", title: "Advanced Algorithms" },
        ]);
      }
    } catch (e) {
      setCourses([
        { code: "CS301", title: "Data Structures" },
        { code: "CS302", title: "Operating Systems" },
        { code: "CS303", title: "DBMS" },
        { code: "MA201", title: "Linear Algebra" },
        { code: "EC301", title: "Signals & Systems" },
        { code: "HU101", title: "Technical Writing" },
        { code: "CS401", title: "Advanced Algorithms" },
      ]);
    }

    try {
      const storedFaculty = localStorage.getItem("coexist_store_faculty");
      if (storedFaculty) {
        const parsed = JSON.parse(storedFaculty);
        if (Array.isArray(parsed)) {
          setFaculty(parsed.map(f => ({
            name: String(f?.name || "").trim(),
            available: String(f?.available || "").trim()
          })).filter(f => f.name));
        } else {
          throw new Error("Invalid faculty data");
        }
      } else {
        setFaculty([
          { name: "Dr. Ramesh Kumar", available: "Mon, Wed, Fri" },
          { name: "Dr. Sunita Rao", available: "Tue, Thu" },
          { name: "Prof. Anil Mehta", available: "Mon, Tue, Wed, Thu, Fri" },
        ]);
      }
    } catch (e) {
      setFaculty([
        { name: "Dr. Ramesh Kumar", available: "Mon, Wed, Fri" },
        { name: "Dr. Sunita Rao", available: "Tue, Thu" },
        { name: "Prof. Anil Mehta", available: "Mon, Tue, Wed, Thu, Fri" },
      ]);
    }

    try {
      const storedSchedule = localStorage.getItem("coexist_store_schedule");
      if (storedSchedule) {
        const parsed = JSON.parse(storedSchedule);
        if (Array.isArray(parsed)) {
          setSchedule(parsed.map(item => ({
            id: Number(item?.id || 0),
            code: String(item?.code || "").trim().toUpperCase(),
            title: String(item?.title || "").trim(),
            day: Number(item?.day || 0),
            slot: Number(item?.slot || 0),
            hall: String(item?.hall || "").trim()
          })));
        } else {
          throw new Error("Invalid schedule data");
        }
      } else {
        setSchedule(initialMockSchedule);
      }
    } catch (e) {
      setSchedule(initialMockSchedule);
    }

    let customFlag = false;
    try {
      customFlag = localStorage.getItem("coexist_store_custom_roster") === "true";
    } catch (e) {}
    setHasCustomRoster(customFlag);
  }, []);

  const setIngestedData = (type: "students" | "rooms" | "courses" | "faculty", rawData: any[]) => {
    if (type === "students") {
      const mapped = rawData.map(r => {
        const keys = Object.keys(r);
        const usnKey = keys.find(k => k.toLowerCase().includes("usn")) || "usn";
        const nameKey = keys.find(k => k.toLowerCase().includes("name")) || "name";
        return {
          usn: String(r[usnKey] || "").trim().toUpperCase(),
          name: String(r[nameKey] || "").trim()
        };
      });
      setStudents(mapped);
      setHasCustomRoster(true);
      localStorage.setItem("coexist_store_students", JSON.stringify(mapped));
      localStorage.setItem("coexist_store_custom_roster", "true");
    } else if (type === "rooms") {
      const mapped = rawData.map(r => {
        const keys = Object.keys(r);
        const roomKey = keys.find(k => k.toLowerCase().includes("room")) || "room";
        const capKey = keys.find(k => k.toLowerCase().includes("capacity")) || "capacity";
        return {
          room: String(r[roomKey] || "").trim(),
          capacity: Number(r[capKey] || 0)
        };
      });
      setRooms(mapped);
      localStorage.setItem("coexist_store_rooms", JSON.stringify(mapped));
    } else if (type === "courses") {
      const mapped = rawData.map(r => {
        const keys = Object.keys(r);
        const codeKey = keys.find(k => k.toLowerCase().includes("code")) || "code";
        const titleKey = keys.find(k => k.toLowerCase().includes("title")) || "title";
        return {
          code: String(r[codeKey] || "").trim().toUpperCase(),
          title: String(r[titleKey] || "").trim()
        };
      });
      setCourses(mapped);
      localStorage.setItem("coexist_store_courses", JSON.stringify(mapped));
    } else if (type === "faculty") {
      const mapped = rawData.map(r => {
        const keys = Object.keys(r);
        const nameKey = keys.find(k => k.toLowerCase().includes("name")) || "name";
        const avKey = keys.find(k => k.toLowerCase().includes("available")) || "available";
        return {
          name: String(r[nameKey] || "").trim(),
          available: String(r[avKey] || "").trim()
        };
      });
      setFaculty(mapped);
      localStorage.setItem("coexist_store_faculty", JSON.stringify(mapped));
    }
  };

  const updateSchedule = (newSchedule: ScheduledExam[]) => {
    setSchedule(newSchedule);
    localStorage.setItem("coexist_store_schedule", JSON.stringify(newSchedule));
  };

  const resetAllData = () => {
    localStorage.removeItem("coexist_store_students");
    localStorage.removeItem("coexist_store_rooms");
    localStorage.removeItem("coexist_store_courses");
    localStorage.removeItem("coexist_store_faculty");
    localStorage.removeItem("coexist_store_schedule");
    localStorage.removeItem("coexist_store_custom_roster");

    setStudents(initialMockStudents.map(s => ({ usn: s.rollNo, name: s.name })));
    setRooms(initialMockHalls.map(h => ({ room: h.name, capacity: h.capacity })));
    setCourses([
      { code: "CS301", title: "Data Structures" },
      { code: "CS302", title: "Operating Systems" },
      { code: "CS303", title: "DBMS" },
      { code: "MA201", title: "Linear Algebra" },
      { code: "EC301", title: "Signals & Systems" },
      { code: "HU101", title: "Technical Writing" },
      { code: "CS401", title: "Advanced Algorithms" },
    ]);
    setFaculty([
      { name: "Dr. Ramesh Kumar", available: "Mon, Wed, Fri" },
      { name: "Dr. Sunita Rao", available: "Tue, Thu" },
      { name: "Prof. Anil Mehta", available: "Mon, Tue, Wed, Thu, Fri" },
    ]);
    setSchedule(initialMockSchedule);
    setHasCustomRoster(false);
  };

  const isStudentAccepted = (usn: string) => {
    if (!usn) return false;
    return students.some(s => s.usn && s.usn.trim().toUpperCase() === usn.trim().toUpperCase());
  };

  return (
    <DataContext.Provider
      value={{
        students,
        rooms,
        courses,
        faculty,
        schedule,
        setIngestedData,
        updateSchedule,
        resetAllData,
        isStudentAccepted,
        hasCustomRoster,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useSystemData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useSystemData must be used within a SystemDataProvider");
  }
  return context;
}
