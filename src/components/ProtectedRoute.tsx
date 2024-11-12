import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { role } = useSelector((state: RootState) => state.auth);

  const isAuthenticated = role !== 'guest';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;