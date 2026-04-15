# Boardify

**Boardify** is an AI-assisted collaborative planning app designed for people who like the flexibility of kanban boards, but need better guidance on what to do next.

It combines classic board/list/task workflows with practical AI support (task prioritization, next-task recommendations, and suggested subtasks) so teams and solo builders can spend less time triaging work and more time shipping.

This repository is a full-stack monorepo with an **Expo (React Native)** client (iOS, Android, and web) and a **Cloudflare-native backend** (Workers, D1, R2, Queues, and WebSockets).

## Why this project exists

Most task apps are great at storing tasks but weak at helping users decide:
- What should I work on first?
- Which deadlines are risky?
- How do I break this down into concrete steps?

Boardify focuses on that gap. The product goal is to keep planning lightweight while still giving users smart recommendations, clear visibility, and fast collaboration.

## Highlights

- **Full-stack architecture:** React Native + Expo Router frontend, Cloudflare Workers API, D1 relational schema, R2 media storage.
- **Real-time collaboration:** board updates via WebSockets.
- **AI productivity features:** list-level prioritization, next-task recommendation, and subtask generation with daily usage limits.
- **Background automation:** queued and scheduled jobs for reminders and digest-style experiences.
- **Cross-platform UX:** mobile-first UI that also runs on web.

## Product capabilities

- Board/list/task organization with drag-and-drop interactions.
- Task metadata such as due dates, labels, priorities, assignees, checklist items, and attachments.
- Team collaboration features including board sharing and invitations.
- Notification and settings flows for account and board preferences.
- AI actions with safe apply/revert behavior for generated reorder changes.

## Architecture at a glance

- **Client (`app/`)**
  - Expo + React Native + Expo Router
  - Shared design system and cross-platform components
  - Auth/session handling and board interaction flows
- **API (`api/`)**
  - Cloudflare Workers endpoints for auth, boards, tasks, media, and AI
  - Real-time updates and notification-related services
- **Data (`db/`)**
  - D1 schema and migration SQL
  - Relational models for users, boards, lists, tasks, memberships, and audit trails

| Directory | Contents |
|-----------|----------|
| [`app/`](app/) | Expo app — Expo Router, NativeWind, auth, boards UI |
| [`api/`](api/) | Worker API — auth, boards, images, WebSockets, Workers AI, notifications |
| [`db/`](db/) | D1 schema and migrations |

## Requirements

- **Node.js** 18+
- **App:** see [`app/README.md`](app/README.md) for Expo run/build, env vars, and push setup
- **API:** see [`api/README.md`](api/README.md) for Wrangler, D1, queues (production), and secrets

## Quick start

```bash
# Install the mobile/web client
cd app && npm install && npm start

# API (from another terminal), remote dev D1 example:
cd api && npm install && npm run dev
```

Point the app at your API base URL (see `app` README and `app.config.js` / `.env.development`).

## Contributing

Pull requests and issues are welcome. By contributing, you agree that your
contribution is licensed to the project maintainer under the terms described in
[`LICENSE`](LICENSE) (section 3).

## License

**Source-available (not a permissive OSS license).**

Copyright (c) 2026 Jacob Beal. All rights reserved.

You may inspect and clone this code for **personal, non-commercial** use. You may
**not** use it in production, commercially redistribute it, or copy it as a
product or template **without prior written permission** from the copyright
holder.

See **[`LICENSE`](LICENSE)** for the full terms.

If you need a commercial license, redistribution rights, or other arrangements,
contact the copyright holder.