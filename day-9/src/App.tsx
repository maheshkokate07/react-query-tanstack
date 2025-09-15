import "./App.css";
import TodosPrefetch from "./components/TodosPrefetch.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 9 - Prefetching & Initial Data</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Prefetching:</strong> load data before user requests it - hover/click.</li>
          <li><strong>Instant UI:</strong> cached results appear immediately without waiting for a fetch.</li>
          <li><strong>Initial Data:</strong> placeholder data shows instantly, then swaps with real data.</li>
          <li><strong>Better UX:</strong> avoids empty states & spinners while fetching.</li>
          <li><strong>Practical use cases:</strong> hover menus, tooltips, or anticipating navigation.</li>
          <li><strong>Cache smartness:</strong> React Query reuses prefetched data across components.</li>
        </ul>
      </p>

      <TodosPrefetch />
    </main>
  );
}

export default App;