import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, Role } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  allow,
}: {
  children: ReactNode;
  allow: Role[];
}) {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("chalk_role") as Role | null) : null;
    const effective = role ?? stored;
    if (!effective) {
      navigate({ to: "/login" });
    } else if (!allow.includes(effective)) {
      navigate({ to: "/login" });
    } else {
      setReady(true);
    }
  }, [role, allow, navigate]);

  if (!ready) return null;
  return <>{children}</>;
}
