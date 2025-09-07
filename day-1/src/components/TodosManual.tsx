import { useEffect, useState } from "react";
import axios from "axios";

type Todo = { id: number; title: string; completed: boolean };

export default function TodosManual() {
    const [data, setData] = useState<Todo[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchTodos() {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get<Todo[]>(
                "https://jsonplaceholder.typicode.com/todos?_limit=10"
            );
            setData(res.data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) return <p>Loading todos…</p>;
    if (error) return <ErrorBox onRetry={fetchTodos} />;

    return (
        <div className="card">
            <div className="row">
                <strong>Todos</strong>
                <div className="actions">
                    <button onClick={fetchTodos}>Refetch</button>
                </div>
            </div>
            <ul className="list">
                {data?.map((t) => (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.completed} readOnly /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ErrorBox({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="error">
            <p>Failed to load todos.</p>
            <div className="actions">
                <button onClick={onRetry}>Retry</button>
            </div>
        </div>
    );
}