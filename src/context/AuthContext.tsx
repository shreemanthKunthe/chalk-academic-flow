import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "admin" | "faculty" | "invigilator" | "student";

type AuthCtx = {
  role: Role | null;
  email: string | null;
  login: (role: Role, email: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const r = localStorage.getItem("coexist_role") as Role | null;
    const e = localStorage.getItem("coexist_email");
    if (r) setRole(r);
    if (e) setEmail(e);
  }, []);

  const login = (r: Role, e: string) => {
    localStorage.setItem("coexist_role", r);
    localStorage.setItem("coexist_email", e);
    setRole(r);
    setEmail(e);
  };
  const logout = () => {
    localStorage.removeItem("coexist_role");
    localStorage.removeItem("coexist_email");
    setRole(null);
    setEmail(null);
  };

  return <Ctx.Provider value={{ role, email, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside provider");
  return v;
}
