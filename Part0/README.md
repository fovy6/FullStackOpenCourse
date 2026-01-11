# Part 0 · Fundamentals

## What This Part Covers
- Sets the stage for the Full Stack Open journey: modern web dev with React, REST/GraphQL APIs, Node, TypeScript, React Native, CI/CD, containers, databases, and debugging/deployment practices.

## Fundamentals of Web Apps (Key Concepts)
- **HTTP lifecycle** – Every request travels through DNS lookups, TCP handshakes, headers, payloads, and responses. Browser DevTools make these GET/POST exchanges visible (including cookies and caching), so you can see exactly how the browser and server negotiate resources.
- **Delivery paradigms** – Classic multi-page apps render complete HTML on the server, AJAX augments pages with background requests, and SPAs shift rendering and routing to the client. Tracking how the sample app evolves across these modes clarifies why modern frontends bundle routers, state, and API calls in the browser.
- **DOM, events, and JSON** – Manipulating the DOM, wiring event handlers, and fetching JSON (starting with `XMLHttpRequest`, later `fetch`) underpin interactive UIs. These basics show how data flows from the server into rendered elements without a full page reload.
- **Forms, redirects, and status codes** – Form submissions can trigger navigation, 3xx redirects, or error codes. Understanding how SPAs intercept these flows explains why client-side validation, routing, and optimistic updates matter.
- **CSS essentials** – Linked stylesheets, selectors, and the cascade define layout and branding. Even when focusing on backend logic, you need enough CSS fluency to debug rendering differences across browsers.
- **Frontend libraries and “full stack” scope** – Libraries such as jQuery, Backbone, Angular, React, and Vue emerged to tame DOM/event complexity. In this course, “full stack” means you will wire both the browser experience and the backend APIs cohesively.
- **JavaScript ecosystem churn** – Realities of JavaScript fatigue and embracing rapid tooling changes.

## Exercises 0.1-0.6 Overview
| Exercise | Focus | Deliverable |
|----------|-------|-------------|
| 0.1 | HTML refresher (Mozilla tutorial) | Reading only |
| 0.2 | CSS refresher (Mozilla tutorial) | Reading only |
| 0.3 | HTML forms basics (Mozilla tutorial) | Reading only |
| 0.4 | New note sequence diagram for `/notes` | Mermaid (or similar) diagram |
| 0.5 | Sequence diagram for SPA load | Diagram |
| 0.6 | Sequence diagram for SPA note creation | Diagram |
