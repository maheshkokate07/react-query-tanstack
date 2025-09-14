import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/supabaseClient";

type Todo = { id: number; title: string; completed: boolean; category: string };

async function fetchTodosByCategory(category: string): Promise<Todo[]> {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("category", category)
        .order("id", { ascending: false });

    if (error) throw error;
    return data as Todo[];
}

export default function TodosParallel() {
    // Parallel queries - both fire together
    const {
        data: motivationTodos,
        isLoading: loadingMotivation,
        error: errorMotivation,
    } = useQuery({
        queryKey: ["todos", "motivation"],
        queryFn: () => fetchTodosByCategory("motivation"),
    });

    const {
        data: generalTodos,
        isLoading: loadingGeneral,
        error: errorGeneral,
    } = useQuery({
        queryKey: ["todos", "general"],
        queryFn: () => fetchTodosByCategory("general"),
    });

    if (loadingMotivation || loadingGeneral) return <p>Loading todos...</p>;
    if (errorMotivation || errorGeneral) return <p>Error loading todos</p>;

    return (
        <div className="card">
            <strong>Parallel Queries</strong>

            <div style={{ marginTop: "1rem" }}>
                <h3>Motivation Todos</h3>
                <ul className="list">
                    {motivationTodos?.map((t) => (
                        <li key={t.id}>
                            <span className="dot" /> {t.title}
                        </li>
                    ))}
                </ul>

                <h3>General Todos</h3>
                <ul className="list">
                    {generalTodos?.map((t) => (
                        <li key={t.id}>
                            <span className="dot" /> {t.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}