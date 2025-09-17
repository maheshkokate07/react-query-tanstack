Day 11 - Custom Hooks with React Query

- Encapsulated logic - all data fetching and mutations handled inside useTodos and useAddTodo.
- Cleaner components - UI code stays focused on rendering, no direct API or cache logic.
- Automatic cache updates - hooks handle query invalidation and cache updates on mutation success.
- Optimistic updates & rollback - manage temporary UI state and error recovery inside hooks.
- Flexible parameters - hooks can accept filters (e.g., category) without touching components.
- Inspect network tab - see API calls, optimistic updates, and rollbacks in action.
- Practical use cases - any app where you want reusable, maintainable data logic across multiple components.

Live Demo: https://mahesh-tanstack-day11.netlify.app