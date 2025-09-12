import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean; category: string };
const PAGE_SIZE = 5;

export default function TodosInfinite() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: ["todos-infinite"],
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false })
                .range(pageParam, pageParam + PAGE_SIZE - 1);

            if (error) throw error;
            return data as Todo[];
        },
        // Tells React Query how to compute the next page start index
        getNextPageParam: (lastPage: Todo[], allPages: Todo[][]) => {
            if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
            return allPages.flat().length;
        },
        // First page starts at index 0
        initialPageParam: 0,
        staleTime: 15000,
        refetchOnReconnect: true,
    });

    const todos = data?.pages.flat() ?? [];

    return (
        <div className="card">
            <strong>Todos (Infinite Scroll)</strong>

            {status === "pending" && <p>Loading todos…</p>}
            {status === "error" && <p>Failed to load todos: {error?.message}</p>}

            {status === "success" && (
                <>
                    {todos.length > 0 ? (
                        <>
                            <ul className="list" style={{ margin: "12px 0" }}>
                                {todos.map((t) => (
                                    <li key={t.id}>
                                        <span className="dot" /> {t.title}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ textAlign: "center" }}>
                                {hasNextPage ? (
                                    <button
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                    >
                                        {isFetchingNextPage
                                            ? "Loading more..."
                                            : "Load more"}
                                    </button>
                                ) : (
                                    <p className="muted">No more todos</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="muted">No todos available</p>
                    )}
                </>
            )}
        </div>
    );
}