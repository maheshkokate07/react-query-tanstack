Day 4 – Optimistic Updates

- Instantly update the UI with optimistic mutations — todos appear immediately without waiting for the server
- Rollback on error: use the “Force API Failure” toggle to simulate errors, and watch the UI revert
- Cache stays consistent by syncing with the server once the mutation succeeds
- No UI flicker: open DevTools Network tab to see API calls happening in the background while the UI stays smooth

Live Demo: https://mahesh-tanstack-day4.netlify.app