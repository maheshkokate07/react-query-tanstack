Day 5 - Dependent Queries

- Dependent queries - todos are fetched only after selecting a category.
- No wasted calls - React Query won't fire the todos query until a category is chosen.
- Switching categories shows cached data instantly (if already fetched).
- Network requests stay minimal, UI stays consistent and never stale.
- Built-in cache per category: prevents mixing data between different categories.
- Open the Network tab to verify - you'll see requests only when needed, never repeated unnecessarily.

Live Demo: https://mahesh-tanstack-day5.netlify.app