import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

const items = [
  { label: "DASHBOARD", to: "/admin" },
  { label: "EXAMS", to: "/admin/exams" },
  { label: "HALLS", to: "/admin/halls" },
  { label: "SEATING", to: "/admin/seating/1" },
  { label: "ATTENDANCE", to: "/invigilator" },
  { label: "RESULTS", to: "/student/results" },
];

export default function Sidebar() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2 text-base font-extrabold tracking-tight">
          <Logo size={18} className="text-black" />
          <span>COEXIST</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="text-[11px] uppercase tracking-widest border border-black px-3 py-1.5"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-14 z-30 bg-white px-6 py-6 flex flex-col">
          <nav className="flex-1 space-y-5">
            {items.map((it) => {
              const active = loc.pathname === it.to || (it.to !== "/admin" && loc.pathname.startsWith(it.to));
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={`block text-sm uppercase tracking-wider ${
                    active ? "text-black font-semibold" : "text-gray-400"
                  }`}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-wider text-gray-400 text-left"
          >
            Logout
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] shrink-0 border-r border-gray-100 bg-white min-h-screen flex-col">
        <div className="px-6 py-8">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight hover:opacity-85 transition-opacity">
            <Logo size={22} className="text-black" />
            <span>COEXIST</span>
          </Link>
        </div>
        <nav className="flex-1 px-6 space-y-4">
          {items.map((it) => {
            const active = loc.pathname === it.to || (it.to !== "/admin" && loc.pathname.startsWith(it.to));
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`block text-xs uppercase tracking-wider transition-colors ${
                  active ? "text-black font-semibold" : "text-gray-400 hover:text-black"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-8">
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-wider text-gray-400 hover:text-black"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
