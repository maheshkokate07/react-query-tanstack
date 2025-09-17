import { useState } from "react";
import { useTodos } from "../hooks/useTodos.ts";

export default function AddTodo() {
    const [newTodo, setNewTodo] = useState("");
    const [shouldFail, setShouldFail] = useState(false);
    const { addTodo, addTodoState } = useTodos();

    return (
        <div className="card">
            <strong>Add Todo (with Optimistic Updates)</strong>

            <label
                style={{
                    display: "flex",
                    marginTop: "1rem",
                    cursor: "pointer",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    checked={shouldFail}
                    onChange={(e) => setShouldFail(e.target.checked)}
                    style={{ marginRight: "5px", width: "16px", height: "16px" }}
                />
                Force API failure
            </label>

            <div className="row" style={{ marginTop: 12, gap: 8 }}>
                <input
                    type="text"
                    placeholder="New todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    disabled={addTodoState.isPending}
                    onClick={() => {
                        if (!newTodo.trim()) return;
                        addTodo(
                            { title: newTodo, shouldFail },
                            { onSuccess: () => setNewTodo("") }
                        );
                    }}
                >
                    {addTodoState.isPending ? "Adding..." : "Add Todo"}
                </button>
            </div>

            {addTodoState.isError && (
                <p className="error" style={{ marginTop: "8px" }}>
                    Failed to add todo: {(addTodoState.error as Error).message}
                </p>
            )}
        </div>
    );
}