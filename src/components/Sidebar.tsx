import { Link, useLocation, useNavigate } from "@tanstack/react-router";
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

  return (
    <aside className="w-[220px] shrink-0 border-r border-gray-100 bg-white min-h-screen flex flex-col">
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
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
          className="text-xs uppercase tracking-wider text-gray-400 hover:text-black"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
