import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Role } from "@/context/AuthContext";

export default function AdminShell({ children, allow = ["admin"] }: { children: ReactNode; allow?: Role[] }) {
  return (
    <ProtectedRoute allow={allow}>
      <div className="min-h-screen md:flex bg-white text-black">
        <Sidebar />
        <main className="flex-1 w-full min-w-0 pt-20 px-4 pb-10 md:p-12">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
