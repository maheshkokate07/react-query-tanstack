type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div role="alert" className="card error" style={{ padding: '1rem' }}>
            <p><strong>Oops, something went wrong:</strong></p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}
