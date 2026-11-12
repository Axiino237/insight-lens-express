# Insight Lens / The First Step Solutions — NestJS Backend

A modular, production-ready NestJS backend for **The First Step Solutions**.

## Features & Endpoints

- **Health:**
  - `GET /api/health` — Service uptime & status check
- **Contact Inquiries:**
  - `POST /api/contact` — Submits client event briefs with validation (name, email, company, phone, service, message)
  - `GET /api/contact` — Retrieves stored inquiries (persisted to `backend/data/inquiries.json`)
  - `GET /api/contact/:id` — Retrieves inquiry by ID
- **Services:**
  - `GET /api/services` — List of all 7 core event & fabrication disciplines
  - `GET /api/services/:id` — Single service details
- **Projects:**
  - `GET /api/projects` — Featured portfolio projects
  - `GET /api/projects/:id` — Single project details
- **Visitor Counter:**
  - `GET /api/visitor-count` — Current site visitor count
  - `POST /api/visitor-count/up` — Increment unique visitor count

## Getting Started

### Install Dependencies
```bash
cd backend
npm install
```

### Run in Development Mode
```bash
npm run start:dev
```
Or from the root directory:
```bash
npm run backend:dev
```

### Build for Production
```bash
npm run build
npm run start:prod
```

### Port Configuration
Defaults to port `4000` (can be overridden via `PORT` environment variable). The Vite frontend proxies `/api/*` to `http://localhost:4000`.

