import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@infrastructure/hooks/useAppSelector';
import { useAppDispatch } from '@infrastructure/hooks/useAppDispatch';
import { setUser, setAuthenticated } from '@infrastructure/store/authSlice';
import { container } from '@infrastructure/di/container';
import { LoadingState } from '@core/components/LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = localStorage.getItem('accessToken');
      if (token && !user) {
        try {
          const currentUser = await container.getCurrentUserUseCase.execute();
          dispatch(setUser(currentUser));
        } catch {
          dispatch(setAuthenticated(false));
          localStorage.removeItem('accessToken');
        }
      }
    };

    void checkAuth();
  }, [dispatch, user]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}