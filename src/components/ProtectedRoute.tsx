import { Navigate } from 'react-router-dom';
import { UserAuth } from '@/Context/Authcontext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component to guard authenticated pages
 * Redirects to signin if user is not authenticated
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, isLoading } = UserAuth();

  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute component for auth pages
 * Redirects to dashboard if user is already authenticated
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { session, isLoading } = UserAuth();

  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
