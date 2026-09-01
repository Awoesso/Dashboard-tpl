import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

/**
 * ErrorFallback component - Error page for route errors
 * Handles all errors that occur during route rendering
 */
const ErrorFallback = () => {
  const error = useRouteError();

  const statusCode = isRouteErrorResponse(error) ? error.status : 500;
  const statusText = isRouteErrorResponse(error)
    ? error.statusText
    : 'Internal Server Error';
  const errorMessage = isRouteErrorResponse(error)
    ? error.data?.message || 'An unexpected error occurred'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-sm text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
        </div>

        {/* Error Status */}
        <h1 className="text-3xl font-bold text-red-900">{statusCode}</h1>
        <h2 className="mt-2 text-lg font-semibold text-gray-800">{statusText}</h2>

        {/* Error Message */}
        <p className="mt-3 text-sm text-gray-600">{errorMessage}</p>

        {/* Debug Info (only in dev) */}
        {import.meta.env.DEV && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-xs font-medium text-red-600 hover:text-red-700">
              Error Details
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-[10px] text-red-800 whitespace-pre-wrap break-words">
              {errorMessage}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <a
            href="/"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition inline-block"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
};

export default ErrorFallback;
