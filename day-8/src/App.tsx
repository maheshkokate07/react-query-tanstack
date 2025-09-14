import "./App.css";
import TodosParallel from "./components/TodosParallel.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 8 - Parallel Queries</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Multiple queries</strong> run independently but in parallel.</li>
          <li><strong>Faster loading</strong>: no waiting for one query to finish before starting the other.</li>
          <li><strong>Cache isolation</strong>: each query has its own cache.</li>
          <li><strong>Error isolation</strong>: one query failing doesn't block the other.</li>
          <li>Open the <strong>Network tab</strong> - you'll see both requests fire at the same time.</li>
          <li><strong>Real-world use</strong>: Dashboards, profile pages, or any screen with multiple independent data sources.</li>
        </ul>
      </p>

      <TodosParallel />
    </main>
  );
}

export default App;