import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { FC, ReactNode } from "react";

// components/AdminRoute.tsx
export const AdminRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { role } = useSelector((state: RootState) => state.auth);
    
    if (role !== 'admin') {
      return <Navigate to="/login" replace />;
    }
  
    return <>{children}</>;
  };
  
