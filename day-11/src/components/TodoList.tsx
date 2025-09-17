import { useTodos } from "../hooks/useTodos.ts";

export default function TodoList() {
    const { data: todos, isLoading, error } = useTodos();

    if (isLoading) return <p>Loading todos…</p>;
    if (error) return <p style={{ color: "red" }}>Something went wrong!</p>;

    if (!todos?.length) return <p className="muted">No todos available!</p>;

    return (
        <ul className="list" style={{ margin: "12px 0" }}>
            {todos.map((t) => (
                <li key={t.id}>
                    <span className="dot" /> {t.title}
                </li>
            ))}
        </ul>
    );
}