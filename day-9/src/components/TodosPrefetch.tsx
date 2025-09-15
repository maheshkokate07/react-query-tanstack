import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean; category: string };

async function fetchTodos(): Promise<Todo[]> {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw error;
    return data as Todo[];
}

export default function TodosPrefetch() {
    const queryClient = useQueryClient();

    // Prefetch data on hover
    const prefetchTodos = () => {
        queryClient.prefetchQuery({
            queryKey: ["todos"],
            queryFn: fetchTodos,
        });
    };

    const { data: todos, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        initialData: () => {
            // Return fake placeholder data instantly
            return [{ id: 0, title: "Loading placeholder...", completed: false, category: "general" }];
        },
    });

    return (
        <div className="card">
            <strong>Prefetching & Initial Data</strong>

            <button onMouseEnter={prefetchTodos} onClick={prefetchTodos}>
                Hover or Click to Prefetch Todos
            </button>

            {isLoading && <p>Loading todos...</p>}

            <ul className="list" style={{ marginTop: "1rem" }}>
                {todos?.map((t) => (
                    <li key={t.id}>
                        <span className="dot" /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}