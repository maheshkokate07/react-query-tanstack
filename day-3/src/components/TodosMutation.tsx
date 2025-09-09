import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean };

export default function TodosMutation() {
    const qc = useQueryClient();
    const [newTodo, setNewTodo] = useState("");

    // Fetch todos from supabase DB
    const { data, isLoading, error } = useQuery<Todo[]>({
        queryKey: ["todos-mutation"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false });
            if (error) throw error;
            return data as Todo[];
        },
        staleTime: 15000
    });

    // Mutation: Add todo
    const addTodoMutation = useMutation({
        mutationFn: async (title: string) => {
            const { data, error } = await supabase
                .from("todos")
                .insert([{ title, completed: false }])
                .select()
                .single();
            if (error) throw error;
            return data as Todo;
        },

        // What should be happen when mutationFn is success - get the returned data from mutation function
        onSuccess: (newTodo) => {
            // Mutate cached data with new todo
            qc.setQueryData<Todo[]>(["todos-mutation"], (old) =>
                old ? [newTodo, ...old] : [newTodo]
            );
            setNewTodo("");
        }
    });

    if (isLoading) return <p>Loading todos…</p>;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className="card">
            <strong>Todos (Mutation  example)</strong>

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
                        if (!newTodo.trim())
                            return;
                        addTodoMutation.mutate(newTodo);
                    }}
                >
                    {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
                </button>
            </div>

            {addTodoMutation.isError && (
                <p className="error">Failed to add todo. Try again.</p>
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