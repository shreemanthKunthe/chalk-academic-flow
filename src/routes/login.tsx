import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, Role } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  component: Login,
});

const roles: Role[] = ["admin", "faculty", "invigilator", "student"];

function Login() {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, email || `${role}@coexist.edu`);
    const dest =
      role === "admin" ? "/admin" : role === "faculty" ? "/faculty" : role === "invigilator" ? "/invigilator" : "/student";
    navigate({ to: dest });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      <div className="hidden md:flex flex-col justify-between p-12 border-r border-gray-100">
        <span className="text-xl font-extrabold tracking-tight">COEXIST</span>
        <div>
          <h1
            className="font-extrabold leading-[0.85]"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", letterSpacing: "-4px" }}
          >
            COEXIST
          </h1>
          <p className="text-gray-500 mt-4 max-w-[320px] text-[15px] leading-[1.6]">
            The complete exam platform for modern colleges. Sign in to continue.
          </p>
        </div>
        <span className="text-xs uppercase tracking-widest text-gray-400">© 2026</span>
      </div>

      <div className="flex items-center justify-center p-10">
        <form onSubmit={submit} className="w-full max-w-md">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-8">Sign In</h2>

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
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
                placeholder="you@college.edu"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-2">Password</label>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
