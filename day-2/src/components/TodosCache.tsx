import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Todo = { id: number; title: string; completed: boolean };

type TodoCacheMeta = {
  lastFetched: string;
};

export default function TodosCache() {
  const qc = useQueryClient();

  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );

    // store metadata - lastFetched in query cache
    qc.setQueryData<TodoCacheMeta>(["todos-meta"], {
      lastFetched: new Date().toLocaleTimeString(),
    });

    return response.data;
  };

  const { data, error, isLoading, isFetching, refetch } = useQuery<Todo[]>({
    queryKey: ["todos-cache"],
    queryFn: fetchTodos,
    staleTime: 15000, // data stays fresh for 15s
    refetchOnWindowFocus: true
  });

  // read metadata from cache
  const meta = qc.getQueryData<TodoCacheMeta>(["todos-meta"]);

  if (isLoading) return <p>Loading todos…</p>;
  if (error) return <ErrorBox onRetry={() => refetch()} />;

  return (
    <div className="card">
      <div className="row">
        <strong>Todos (with cache)</strong>
        <div className="actions">
          <button onClick={() => refetch()}>Refetch</button>
          <button
            onClick={() =>
              qc.invalidateQueries({ queryKey: ["todos-cache"] })
            }
          >
            Invalidate
          </button>
        </div>
      </div>

      {isFetching && <p className="subtle">Refreshing in background…</p>}
      {meta?.lastFetched && (
        <p className="cache-info">Last fetched: {meta.lastFetched}</p>
      )}

      <ul className="list">
        {data!.map((t) => (
          <li key={t.id}>
            <span className="dot" /> {t.title}
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
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}