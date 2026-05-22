import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <header className="w-full px-10 py-6 flex items-center justify-between bg-white">
      <Link to="/" className="text-xl font-extrabold tracking-tight">COEXIST</Link>
      <nav className="hidden md:flex items-center gap-12">
        {["EXAMS", "HALLS", "RESULTS", "REPORTS"].map((l) => (
          <a key={l} href="#" className="text-[12px] uppercase tracking-widest font-medium text-black hover:opacity-60">
            {l}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-6 text-black">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <Link to="/login" aria-label="account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
