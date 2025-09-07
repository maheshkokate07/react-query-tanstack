import { useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import TodosManual from "./components/TodosManual";

function App() {
  const [mode, setMode] = useState<"react-query" | "manual">("react-query");

  return (
    <main className="container">
      <h1>React Query Day 1 - Basic Fetch</h1>
      <p className="muted">Compare manual fetching vs TanStack Query.</p>

      <div className="switcher">
        <button
          className={mode === "react-query" ? "active" : ""}
          onClick={() => setMode("react-query")}
        >
          React Query
        </button>
        <button
          className={mode === "manual" ? "active" : ""}
          onClick={() => setMode("manual")}
        >
          Manual useEffect
        </button>
      </div>

      <section style={{ marginTop: 24 }}>
        {mode === "react-query" ? <Todos /> : <TodosManual />}
      </section>
    </main>
  );
}

export default App;