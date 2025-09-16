import { Suspense } from 'react';
import './App.css';
import TodosSuspense from './components/TodosSuspense.tsx';
import ErrorFallback from './components/ErrorFallback.tsx';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <main className="container">
      <h1>React Query Day 10 - Suspense & Error Boundaries</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Suspense mode</strong>: declarative loading UI with <code>React.Suspense</code> fallback.</li>
          <li><strong>Error Boundary + Reset</strong>: catch real API errors and retry gracefully.</li>
          <li><strong>No manual state checks</strong>: components focus only on data and rendering.</li>
          <li><strong>Consistent UX</strong>: same spinner and error UI everywhere.</li>
          <li><strong>Real-world use</strong>: dashboards, profile screens, or any place with network/fetch failures.</li>
          <li><strong>Dropdown control</strong>: choose Normal, Loading (Suspense), Error (Fallback) to test real scenarios.</li>
          <li><strong>Inspect network tab</strong>: see actual requests, failures, and delays for full transparency.</li>
        </ul>
      </p>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<p>Loading todos...</p>}>
              <TodosSuspense />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}

export default App;
