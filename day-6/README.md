Day 6 - Pagination & Infinite Query

- Classic Pagination: fetch a fixed number of items per page to reduce network data transfer, improve rendering performance, and maintain a responsive UI.
- Infinite Scroll: uses useInfiniteQuery to fetch and append new items in batches, preserving previously loaded pages and providing a smooth, incremental data loading experience.
- Previous pages or batches are cached to avoid flicker and unnecessary refetching using  placeholderData / useInfiniteQuery.
- Network requests are minimal: React Query caches each page or batch separately.
- Open the Network tabin your browser to see that only the necessary requests are made per page or batch.

Live Demo: https://mahesh-tanstack-day6.netlify.app