import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState, AppDispatch } from '@/store/store'; // Import AppDispatch for typing
import { Navigate } from 'react-router-dom';
import { refreshAccessToken } from '@/store/slices/authSlice';
import {jwtDecode} from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: IRootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isTokenValid = () => {
    try {
      const decoded: any = jwtDecode(user?.accessToken || '');
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const refreshTokenHandler = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(refreshAccessToken()).unwrap();
    } catch (error) {
      console.log("refreshing the token failed");
      setIsRefreshing(false);
      // Trigger logout if refresh fails
      // You can dispatch a logout action here
    }
  };

  useEffect(() => {
    if (!isTokenValid() && isAuthenticated) {
      refreshTokenHandler();
    }
  }, [isAuthenticated, user, dispatch]);

  if (isRefreshing || isLoading) {
    return <div>Refreshing session...</div>;
  }
console.log("isauthenticated", isAuthenticated);
console.log("isTokenValid", isTokenValid());

  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
