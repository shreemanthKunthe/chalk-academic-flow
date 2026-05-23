import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, Role } from "@/context/AuthContext";
import { useUniversity } from "@/context/UniversityContext";
import Logo from "../components/Logo";

export const Route = createFileRoute("/login")({
  component: Login,
});

const roles: Role[] = ["admin", "faculty", "invigilator", "student"];

function Login() {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usn, setUsn] = useState("");
  const { login } = useAuth();
  const { university } = useUniversity();
  const navigate = useNavigate();

  // Require a selected university first
  useEffect(() => {
    if (!university) {
      navigate({ to: "/select-university" });
    }
  }, [university, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniSlug = university?.id ?? "coexist";
    login(role, email || `${role}@${uniSlug}.edu`);
    const dest =
      role === "admin"
        ? "/admin"
        : role === "faculty"
          ? "/faculty"
          : role === "invigilator"
            ? "/invigilator"
            : "/student";
    navigate({ to: dest });
  };

  if (!university) return null;

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      <div className="hidden md:flex flex-col justify-between p-12 border-r border-gray-100">
        <span className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          <Logo size={22} className="text-black" />
          <span>COEXIST</span>
        </span>
        <div>
          <span className="text-[11px] uppercase tracking-widest text-gray-400">
            Step 02 / 02 · Sign in
          </span>
          <h1
            className="font-extrabold leading-[0.85] mt-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em" }}
          >
            {university.shortName}
          </h1>
          <p className="text-gray-700 mt-4 max-w-[340px] text-[15px] leading-[1.6] font-medium">
            {university.name}
          </p>
          <p className="text-gray-500 mt-2 max-w-[340px] text-[13px] leading-[1.6]">
            {university.city}, {university.state} · Est. {university.established}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-400">
          <span>© 2026</span>
          <Link to="/select-university" className="hover:text-black">
            ← Change university
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <form onSubmit={submit} className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight">
              Sign In
            </h2>
            <span className="text-[11px] uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-1">
              {university.shortName}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {roles.map((r) => {
              const sel = r === role;
              return (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-5 py-2 text-xs uppercase tracking-wider border border-black transition-colors ${
                    sel ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <div className="space-y-8">
            {role === "student" && (
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                  USN
                </label>
                <input
                  type="text"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value.toUpperCase())}
                  className="w-full border-0 border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent tracking-wider"
                  placeholder={university.usnPattern}
                />
                <p className="mt-2 text-[11px] text-gray-400">
                  Format: {university.usnPattern}
                </p>
              </div>
            )}
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
                placeholder={`you@${university.id}.edu`}
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-12 w-full bg-black text-white py-4 uppercase tracking-wider text-sm font-medium hover:opacity-90"
          >
            Login to {university.shortName}
          </button>

          <Link
            to="/select-university"
            className="mt-6 block text-center text-[11px] uppercase tracking-widest text-gray-400 hover:text-black md:hidden"
          >
            ← Change university
          </Link>
        </form>
      </div>
    </div>
  );
}
