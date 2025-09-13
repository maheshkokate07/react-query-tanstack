import "./App.css";
import TodosRefetch from "./components/TodosRefetch.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 7 - Invalidation & Auto Refetching</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Query invalidation</strong>: UI stays in sync after mutations.</li>
          <li><strong>Auto refetch</strong> every 10s keeps data fresh like a live feed.</li>
          <li>Manual <strong>Refresh button</strong> to re-fetch the latest todos on demand.</li>
          <li>Stale/Cache control: React Query decides when to fetch vs reuse cached data.</li>
          <li>Open the <strong>Network tab</strong> to see background polling and refetches in action.</li>
          <li><strong>Real-world use</strong>: Think of chats, notifications, or dashboards - you always want fresh data without hitting refresh manually.</li>
        </ul>
      </p>

      <TodosRefetch />
    </main>
  );
}

export default App;