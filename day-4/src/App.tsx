import "./App.css";
import TodosOptimistic from "./components/TodosOptimistic.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 4 - Optimistic Updates</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li>Instant UI updates with <strong>optimistic mutations</strong> - new todos appear immediately insted of waiting for api call settle.</li>
          <li>
            Rollback on error: use the <strong>“Force API Failure”</strong> toggle to simulate errors - the UI instantly reverts if the server request fails.
          </li>
          <li>Cache stays consistent with the server once mutation succeeds.</li>
          <li>Observe the Network tab and try <strong>reducing the network speed</strong> - you'll see API calls while the UI never flickers.</li>
        </ul>
      </p>

      <TodosOptimistic />
    </main>
  );
}

export default App;