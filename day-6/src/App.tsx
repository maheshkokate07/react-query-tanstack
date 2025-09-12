import { useState } from "react";
import "./App.css";
import TodosPagination from "./components/TodosPagination.tsx";
import TodosInfinite from "./components/TodosInfinite.tsx";

function App() {
  const [mode, setMode] = useState<"pagination" | "infinite">("pagination");

  return (
    <main className="container">
      <h1>React Query Day 6 - Pagination & Infinite Query</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Classic Pagination</strong>: fetch a fixed number of items per page to reduce network data transfer, improve rendering performance, and maintain a responsive UI.</li>
          <li><strong>Infinite Scroll</strong>: uses <code>useInfiniteQuery</code> to fetch and append new items in batches, preserving previously loaded pages and providing a smooth, incremental data loading experience.</li>
          <li>Previous pages or batches are cached to avoid flicker and unnecessary refetching (using <code>placeholderData</code> / <code>useInfiniteQuery</code>).</li>
          <li>Network requests are minimal: React Query caches each page or batch separately.</li>
          <li>Open the <strong>Network tab</strong> in your browser to see that only the necessary requests are made per page or batch.</li>
        </ul>
      </p>

      <div className="switcher">
        <button
          className={mode === "pagination" ? "active" : ""}
          onClick={() => setMode("pagination")}
        >
          Pagination
        </button>
        <button
          className={mode === "infinite" ? "active" : ""}
          onClick={() => setMode("infinite")}
        >
          Infinite Scroll
        </button>
      </div>

      <section style={{ marginTop: 24 }}>
        {mode === "pagination" ? <TodosPagination /> : <TodosInfinite />}
      </section>
    </main>
  );
}

export default App;