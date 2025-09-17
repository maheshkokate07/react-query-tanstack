import "./App.css";
import TodoList from "./components/TodoList.tsx";
import AddTodo from "./components/AddTodo.tsx";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 11 - Custom Hooks with React Query</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li>All React Query logic is encapsulated in <code>"useTodos"</code> custom hook.</li>
          <li>UI components remain clean, focused purely on rendering, without direct API or cache logic.</li>
          <li>Query keys, fetch functions, and mutations are centralized, making code more maintainable and reusable.</li>
          <li>Hooks automatically update cached data on mutation success, ensuring the UI stays in sync.</li>
          <li>Hooks can accept parameters (like category filters) to flexibly fetch or mutate data without changing components.</li>
          <li>Optimistic updates and rollback logic can be handled inside hooks, improving UX and error resilience.</li>
        </ul>
      </p>

      <AddTodo />
      <TodoList />
    </main>
  );
}

export default App;