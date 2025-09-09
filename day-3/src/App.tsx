import "./App.css";
import TodosMutation from "./components/TodosMutation";

function App() {
  return (
    <main className="container">
      <h1>React Query Day 3 - Mutations</h1>
      <p className="muted">
        Demo Highlights:
        <ul>
          <li>Add new todos with <strong>useMutation</strong> and immediately update the UI.</li>
          <li>React Query automatically updates cached data after a mutation using <strong>queryClient.setQueryData</strong>.</li>
          <li>Observe the network tab: only necessary API calls are made, avoiding duplicate fetches.</li>
          <li>Button shows <strong>Adding...</strong> during mutation, providing instant feedback.</li>
          <li>Error handling is built-in and easy to show clear messages if a mutation fails.</li>
        </ul>
      </p>

      <TodosMutation />
    </main>
  );
}

export default App;