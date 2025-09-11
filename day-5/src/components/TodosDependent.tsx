import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean; category: string };

export default function TodosDependent() {
    const [category, setCategory] = useState<string | null>(null);

    // Fetch distinct categories
    const { data: categories, isLoading: catLoading, error: catError } = useQuery<string[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("category")
                .not("category", "is", null);
            if (error) throw error;
            const uniqueCats = Array.from(new Set(data.map((d) => d.category)));
            return uniqueCats;
        },
        staleTime: 15000,
    });

    // Fetch todos only when category is selected
    const {
        data: todos,
        isLoading: todosLoading,
        error: todosError,
    } = useQuery<Todo[]>({
        // Unique cache key per category - ensures React Query stores/fetches todos separately for each category
        queryKey: ["todos-by-category", category],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .eq("category", category)
                .order("id", { ascending: false });
            if (error) throw error;
            return data as Todo[];
        },
        // Run only when category chosen
        enabled: !!category,
        staleTime: 15000,
    });

    if (catLoading) return <p>Loading categories…</p>;
    if (catError) return <p>Failed to load categories</p>;

    return (
        <div className="card">
            <strong>Todos (Dependent Queries by Category)</strong>

            <div style={{ marginTop: "1rem" }}>
                <label>Select Category: </label>
                <select
                    value={category ?? ""}
                    onChange={(e) => setCategory(e.target.value || null)}
                >
                    <option value="">-- choose category --</option>
                    {categories?.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            {!category && <p className="muted">Pick a category to load todos.</p>}

            {todosLoading && <p>Loading todos…</p>}
            {todosError && <p>Failed to load todos</p>}

            {todos && (
                <ul className="list" style={{ margin: "12px 0" }}>
                    {todos.length === 0 && <p className="muted">No todos for this category</p>}
                    {todos.map((t) => (
                        <li key={t.id}>
                            <span className="dot" /> {t.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}