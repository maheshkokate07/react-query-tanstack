import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean };

export default function TodosOptimistic() {
    const qc = useQueryClient();
    const [newTodo, setNewTodo] = useState("");
    const [forceFail, setForceFail] = useState(false);

    // Fetch todos
    const { data, isLoading, error } = useQuery<Todo[]>({
        queryKey: ["todos-optimistic"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false });
            if (error) throw error;
            return data as Todo[];
        },
        staleTime: 15000,
    });

    // Optimistic Mutation
    const addTodoMutation = useMutation({
        mutationFn: async (title: string) => {
            const payload = forceFail
                ? { title, complete: false }
                : { title, completed: false };

            const { data, error } = await supabase
                .from("todos")
                .insert([payload])
                .select()
                .single();

            if (error) throw error;
            return data as Todo;
        },
        onMutate: async (title: string) => {
            // Cancels any existing running fetches for this query key so a background fetch doesn’t overwrite your optimistic change
            await qc.cancelQueries({ queryKey: ["todos-optimistic"] });

            // Snapshot the current cache so you can restore it if the mutation fails
            const prevTodos = qc.getQueryData<Todo[]>(["todos-optimistic"]);

            // Create the fake todo for showing in UI
            const fakeTodo: Todo = { id: Date.now(), title, completed: false };

            // Optimistically update cache with fake todo - don't wait for api response
            qc.setQueryData<Todo[]>(["todos-optimistic"], (old) =>
                old ? [fakeTodo, ...old] : [fakeTodo]
            );

            setNewTodo("");

            // Anything returned from onMutate becomes the context available to onError / onSettled, you use this to rollback if something goes wrong
            return { prevTodos };
        },
        onError: (_err, _variables, context) => {
            // Rollback on error - puts the cache back to what it was before the mutation
            if (context?.prevTodos) {
                qc.setQueryData(["todos-optimistic"], context.prevTodos);
            }
        },
        onSettled: () => {
            // Ensure cache sync with server - This guarantees eventual consistency between UI and server
            qc.invalidateQueries({ queryKey: ["todos-optimistic"] });
        },
    });

    if (isLoading) return <p>Loading todos…</p>;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className="card">
            <strong>Todos (Optimistic Update example)</strong>

            <label style={{ display: "flex", marginTop: "1rem", cursor: "pointer" }}>
                <input
                    type="checkbox"
                    checked={forceFail}
                    onChange={() => setForceFail((prev) => !prev)}
                    style={{ marginRight: '5px', width: '16px', height: '16px' }}
                />
                Force API failure
            </label>

            <div className="row" style={{ marginTop: 12 }}>
                <input
                    type="text"
                    placeholder="New todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    disabled={addTodoMutation.isPending}
                    onClick={() => {
                        if (!newTodo.trim()) return;
                        addTodoMutation.mutate(newTodo);
                    }}
                >
                    {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
                </button>
            </div>

            {addTodoMutation.isError && (
                <p className="error">Failed to add todo. Rolled back.</p>
            )}

            {!data?.length && <p className="muted">No todos available!</p>}

            <ul className="list" style={{ margin: "12px 0" }}>
                {data!.map((t) => (
                    <li key={t.id}>
                        <span className="dot" /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}