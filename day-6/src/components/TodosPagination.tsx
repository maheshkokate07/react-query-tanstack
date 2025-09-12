import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean; category: string };
const PAGE_SIZE = 5;

export default function TodosPagination() {
    const [page, setPage] = useState(1);

    // Count total todos to calculate total pages
    const { data: totalCount } = useQuery<number>({
        queryKey: ["todos-count"],
        queryFn: async () => {
            const { count, error } = await supabase
                .from("todos")
                .select("*", { count: "exact", head: true });
            if (error) throw error;
            return count ?? 0;
        },
        staleTime: Infinity,
    });

    const totalPages = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;

    // Fetch todos for current page
    const {
        data: todos,
        isPending,
        error,
    } = useQuery<Todo[]>({
        queryKey: ["todos-paginated", page],
        queryFn: async () => {
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false })
                .range(from, to);
            if (error) throw error;
            return data as Todo[];
        },
        // Shows previous data until new data arrives when tab switched or mount unmount
        placeholderData: keepPreviousData,
        staleTime: 15000,
    });

    return (
        <div className="card">
            <strong>Todos (Pagination)</strong>

            {isPending && <p>Loading todos…</p>}
            {error && <p>Failed to load todos: {error.message}</p>}

            {todos && (
                <>
                    <ul className="list" style={{ margin: "12px 0" }}>
                        {todos.map((t) => (
                            <li key={t.id}>
                                <span className="dot" /> {t.title}
                            </li>
                        ))}
                    </ul>

                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`${page === i + 1 ? "active" : ""} pages`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}