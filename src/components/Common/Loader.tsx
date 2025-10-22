import React from "react";
import { useRouter } from "next/router";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const isAuthenticated = true; // Replace with actual auth check
  React.useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);
  return isAuthenticated ? <>{children}</> : null;
};
export default ProtectedRoute;
