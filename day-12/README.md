Day 12 - Background Sync, Focus & Online Handling

- Auto Refetch on Focus & Reconnect – queries automatically refetch when the user returns to the tab or when the app goes back online.
- Polling (refetchInterval) – keep data fresh in real-time with optional polling every 5s (toggleable).
- Manual Toggles – experiment with enabling/disabling auto-refetch and polling directly in the UI.
- Resilient UX – no blank screens, smooth recovery, works great for dashboards, analytics, and offline-first apps.
- Testing Made Easy – open DevTools - Network tab to observe requests:
- Switch tabs - refetch triggers on focus.
- Go offline in DevTools - queries pause; return online - refetch resumes.
- Enable polling toggle - watch requests fire every 5s.

Live Demo: https://mahesh-tanstack-day12.netlify.app