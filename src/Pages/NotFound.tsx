import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

/**
 * NotFound component - 404 page
 * Displayed when user navigates to an invalid route
 */
const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle size={32} className="text-red-600" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-gray-800">Page Not Found</h2>
        
        <p className="mt-3 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Go Back
          </button>
        </div>

        {/* Status Code */}
        <p className="mt-8 text-xs text-gray-400">Error Code: 404</p>
      </div>
    </main>
  );
};

export default NotFound;
