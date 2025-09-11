import "./App.css";
import TodosDependent from "./components/TodosDependent.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 5 - Dependent Queries</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li><strong>Dependent queries</strong>: todos are fetched only after selecting a category.</li>
          <li>No wasted calls - React Query won't fire the todos query until a category is chosen.</li>
          <li>Switching categories shows cached data instantly (if already fetched).</li>
          <li>Network requests stay minimal, UI stays consistent and never stale.</li>
          <li>Built-in cache per category: prevents mixing data between different categories.</li>
          <li>Open the <strong>Network tab</strong> to verify - you'll see requests only when needed, never repeated unnecessarily.</li>
        </ul>
      </p>

      <TodosDependent />
    </main>
  );
}

export default App;