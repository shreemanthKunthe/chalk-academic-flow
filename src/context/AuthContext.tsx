import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "admin" | "faculty" | "invigilator" | "student";

type AuthCtx = {
  role: Role | null;
  email: string | null;
  usn: string | null;
  login: (role: Role, email: string, usn?: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [usn, setUsn] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const r = localStorage.getItem("coexist_role") as Role | null;
    const e = localStorage.getItem("coexist_email");
    const u = localStorage.getItem("coexist_usn");
    if (r) setRole(r);
    if (e) setEmail(e);
    if (u) setUsn(u);
  }, []);

  const login = (r: Role, e: string, u?: string) => {
    localStorage.setItem("coexist_role", r);
    localStorage.setItem("coexist_email", e);
    if (u) {
      localStorage.setItem("coexist_usn", u);
      setUsn(u);
    } else {
      localStorage.removeItem("coexist_usn");
      setUsn(null);
    }
    setRole(r);
    setEmail(e);
  };
  const logout = () => {
    localStorage.removeItem("coexist_role");
    localStorage.removeItem("coexist_email");
    localStorage.removeItem("coexist_usn");
    setRole(null);
    setEmail(null);
    setUsn(null);
  };

  return <Ctx.Provider value={{ role, email, usn, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside provider");
  return v;
}
