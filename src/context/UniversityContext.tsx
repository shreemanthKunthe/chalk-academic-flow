import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { mockUniversities, University } from "@/data/universities";

type UniversityCtx = {
  university: University | null;
  setUniversity: (u: University) => void;
  clearUniversity: () => void;
};

const Ctx = createContext<UniversityCtx | null>(null);

export function UniversityProvider({ children }: { children: ReactNode }) {
  const [university, setUniversityState] = useState<University | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = localStorage.getItem("coexist_university_id");
    if (id) {
      const found = mockUniversities.find((u) => u.id === id);
      if (found) setUniversityState(found);
    }
  }, []);

  const setUniversity = (u: University) => {
    localStorage.setItem("coexist_university_id", u.id);
    setUniversityState(u);
  };

  const clearUniversity = () => {
    localStorage.removeItem("coexist_university_id");
    setUniversityState(null);
  };

  return (
    <Ctx.Provider value={{ university, setUniversity, clearUniversity }}>
      {children}
    </Ctx.Provider>
  );
}

export function useUniversity() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUniversity outside provider");
  return v;
}
