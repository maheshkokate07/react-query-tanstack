import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean };

export default function TodosRefetch() {
    const qc = useQueryClient();
    const [newTodo, setNewTodo] = useState("");

    // Fetch todos - auto-refetch every 10s
    const {
        data: todos,
        isLoading,
        isFetching,
        refetch,
    } = useQuery<Todo[]>({
        queryKey: ["todos-refetch"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("id", { ascending: false });
            if (error) throw error;
            return data as Todo[];
        },
        // auto-refetch every 10s
        refetchInterval: 10000,
        // considered fresh for 5s
        staleTime: 5000,
    });

    // Mutation - add new todo
    const addTodo = useMutation({
        mutationFn: async (title: string) => {
            const { data, error } = await supabase
                .from("todos")
                .insert([{ title, completed: false }])
                .select()
                .single();
            if (error) throw error;
            return data as Todo;
        },
        onSuccess: () => {
            // invalidate to get fresh todos
            qc.invalidateQueries({ queryKey: ["todos-refetch"] });
        },
    });

    const handleAdd = () => {
        if (!newTodo.trim()) return;
        addTodo.mutate(newTodo);
        setNewTodo("");
    };

    if (isLoading) return <p>Loading todos...</p>;

    return (
        <div className="card">
            <strong>Todos (with Invalidation & Refetching)</strong>

            <div style={{ marginTop: "1rem" }}>
                <input
                    type="text"
                    placeholder="New todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAdd} disabled={addTodo.isPending}>
                    {addTodo.isPending ? "Adding..." : "Add"}
                </button>
                <button onClick={() => refetch()} disabled={isFetching}>
                    {isFetching ? "Refreshing..." : "Refresh"}
                </button>
            </div>

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