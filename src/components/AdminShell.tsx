import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Role } from "@/context/AuthContext";

export default function AdminShell({ children, allow = ["admin"] }: { children: ReactNode; allow?: Role[] }) {
  return (
    <ProtectedRoute allow={allow}>
      <div className="min-h-screen flex bg-white text-black">
        <Sidebar />
        <main className="flex-1 p-12">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
