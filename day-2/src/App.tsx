import { useState } from "react";
import "./App.css";
import TodosCache from "./components/TodosCache.tsx";

function App() {
  const [show, setShow] = useState(true);

  return (
    <main className="container">
      <h1>React Query Day 2 - Query Caching & Refetching</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li>Data stays fresh for <strong><code>staleTime</code></strong> (15s here), even after unmount & remount</li>
          <li>Returning to the tab after <strong><code>staleTime</code></strong> (15s here) triggers <strong>automatic refetch</strong></li>
          <li><strong>Background refetch</strong> happens when data is stale</li>
          <li>Keep <strong>Network tab open</strong> to observe actual requests</li>
        </ul>
      </p>

      <div className="switcher">
        <button onClick={() => setShow((s) => !s)}>
          {show ? "Unmount Todos" : "Mount Todos"}
        </button>
      </div>

      <section style={{ marginTop: 24 }}>
        {show && <TodosCache />}
      </section>
    </main>
  );
}

export default App;