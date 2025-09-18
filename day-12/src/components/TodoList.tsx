import { useState } from "react";
import { useTodos } from "../hooks/useTodos.ts";

export default function TodoList() {
    const [focusRefetch, setFocusRefetch] = useState(true);
    const [reconnectRefetch, setReconnectRefetch] = useState(true);
    const [polling, setPolling] = useState(false);

    const { data: todos, isLoading, error } = useTodos({
        enableRefetchOnFocus: focusRefetch,
        enableRefetchOnReconnect: reconnectRefetch,
        enablePolling: polling,
    });

    if (isLoading) return <p>Loading todos…</p>;
    if (error) return <p style={{ color: "red" }}>Something went wrong!</p>;

    return (
        <div className="card" style={{ marginTop: 20 }}>
            <strong>Todos List (Background Sync Demo)</strong>

            <div style={{ marginTop: "1rem", paddingBottom: '1rem', display: "flex", flexDirection: "column", gap: "5px", borderBottom: '1px solid lightgray' }}>
                <label style={{ display: "flex", gap: "3px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={focusRefetch}
                        onChange={() => setFocusRefetch((p) => !p)}
                        style={{ width: "15px", height: "15px" }}
                    />
                    Refetch on Window Focus
                </label>

                <label style={{ display: "flex", gap: "3px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={reconnectRefetch}
                        onChange={() => setReconnectRefetch((p) => !p)}
                        style={{ width: "15px", height: "15px" }}
                    />
                    Refetch on Reconnect (Offline - Online)
                </label>

                <label style={{ display: "flex", gap: "3px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={polling}
                        onChange={() => setPolling((p) => !p)}
                        style={{ width: "15px", height: "15px" }}
                    />
                    Enable Polling (5s interval)
                </label>
            </div>

            {!todos?.length && <p className="muted">No todos available!</p>}

            <ul className="list" style={{ margin: "12px 0" }}>
                {todos?.map((t) => (
                    <li key={t.id}>
                        <span className="dot" /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}