import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Todo = { id: number; title: string; completed: boolean }

export default function Todos() {
    const qc = useQueryClient();

    const fetchTodos = async (): Promise<Todo[]> => {
        const response = await axios.get<Todo[]>(
            "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        return response.data;
    };

    const { data, error, isLoading, isFetching, refetch } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    })


    if (isLoading) return <p>Loading todos…</p>
    if (error) return <ErrorBox onRetry={() => refetch()} />

    return (
        <div className="card">
            <div className="row">
                <strong>Todos</strong>
                <div className="actions">
                    <button onClick={() => refetch()}>Refetch</button>
                    <button onClick={() => qc.invalidateQueries({ queryKey: ['todos'] })}>Invalidate</button>
                </div>
            </div>
            {isFetching && <p className="subtle">Refreshing…</p>}
            <ul className="list">
                {data!.map((t) => (
                    <li key={t.id}>
                        <span className="dot" /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ErrorBox({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="error">
            <p>Failed to load todos.</p>
            <button onClick={onRetry}>Retry</button>
        </div>
    )
}