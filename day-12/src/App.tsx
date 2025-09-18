import "./App.css";
import TodoList from "./components/TodoList.tsx";
import AddTodo from "./components/AddTodo.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 12 - Background Sync, Focus & Online Handling</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li>
            <strong>Background Sync</strong> - auto refetch on <code>window focus</code>, <code> network reconnect</code>, and optional <code>refetchInterval</code>.
          </li>
          <li>
            <strong>Configurable Strategies</strong> - toggle between manual refresh, polling, and focus-based sync.
          </li>
          <li>
            <strong>Offline-Aware</strong> - queries pause while offline and resume seamlessly when back online.
          </li>
          <li>
            <strong>Optimistic Updates + Rollbacks</strong> - still handled inside custom hooks for reliability.
          </li>
          <li>
            <strong>Real-World Scenarios</strong> - perfect for live dashboards, analytics feeds, stock-crypto tickers, or collaborative apps.
          </li>
          <li>
            Open the <strong>Network tab</strong> in DevTools, switch tabs, go offline - online, and watch requests auto-pause and resume in real time.
          </li>
        </ul>
      </p>

      <AddTodo />
      <TodoList />
    </main>
  );
}

export default App;