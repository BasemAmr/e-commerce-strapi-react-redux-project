import { Navigate } from "react-router-dom";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const AdminRoute: FC<{ children: ReactNode }> = ({ children }) => {

  const { role } = useSelector((state: RootState) => state.auth);

  const isAdmin = role === "admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};