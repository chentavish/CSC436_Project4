# Job Application Tracker API

A REST API for tracking job applications. Built with Express and TypeScript, stored in Supabase, and deployed on Vercel.

**Live base URL:** https://YOUR-PROJECT.vercel.app

**Try it:** `GET https://YOUR-PROJECT.vercel.app/api/applications?status=interview`

## Endpoints

| Method | Path | What it does |
|---|---|---|
| GET | `/api/health` | Checks the server is running |
| GET | `/api/applications` | Lists all applications, newest first |
| GET | `/api/applications/:id` | Gets one application |
| POST | `/api/applications` | Adds an application |
| PATCH | `/api/applications/:id` | Updates part of an application |
| DELETE | `/api/applications/:id` | Deletes an application |

### The application object

| Field | Type | Notes |
|---|---|---|
| `id` | number | Set by the database |
| `company` | text | Required |
| `role` | text | Required |
| `status` | text | `applied`, `interview`, `offer`, or `rejected`. Defaults to `applied` |
| `applied_on` | date | `YYYY-MM-DD`. Defaults to today |
| `notes` | text or null | Optional |
| `created_at` | timestamp | Set by the database |

### GET /api/applications

Optional query parameters:

- `status`: only applications with that status, like `?status=interview`
- `company`: company name contains this text, like `?company=goo`

Example response (200):

```json
[
  {
    "id": 2,
    "company": "Spotify",
    "role": "Backend Engineer",
    "status": "interview",
    "applied_on": "2026-10-21",
    "notes": "Technical screen Dec 2",
    "created_at": "2026-11-24T19:12:44.218Z"
  }
]
```

### GET /api/applications/:id

Example response (200):

```json
{
  "id": 6,
  "company": "Datadog",
  "role": "Software Engineer, Early Career",
  "status": "offer",
  "applied_on": "2026-09-22",
  "notes": "Offer deadline Dec 5",
  "created_at": "2026-11-24T19:12:44.218Z"
}
```

Returns 404 if the id doesn't exist or isn't a positive whole number.

### POST /api/applications

Body (`company` and `role` are required):

```json
{
  "company": "Notion",
  "role": "Software Engineer",
  "status": "applied",
  "applied_on": "2026-11-25",
  "notes": "Found on LinkedIn"
}
```

Example response (201):

```json
{
  "id": 9,
  "company": "Notion",
  "role": "Software Engineer",
  "status": "applied",
  "applied_on": "2026-11-25",
  "notes": "Found on LinkedIn",
  "created_at": "2026-11-25T23:15:02.611Z"
}
```

### PATCH /api/applications/:id

Body (send at least one field, all are optional):

```json
{
  "status": "interview"
}
```

Example response (200): the full updated application, in the same shape as GET by id. Returns 404 if the id doesn't exist.

### DELETE /api/applications/:id

Returns 204 with no body. Returns 404 if the id doesn't exist.

### Errors

Every error comes back as JSON.

| Status | When | Example |
|---|---|---|
| 400 | Missing or invalid fields | `{ "error": "Invalid application", "problems": ["role is required and must be text"] }` |
| 400 | Body isn't valid JSON | `{ "error": "Request body is not valid JSON" }` |
| 404 | No application with that id | `{ "error": "No application with id 99" }` |
| 404 | Route doesn't exist | `{ "error": "No route for GET /api/jobs" }` |
| 500 | Database or server error | `{ "error": "Something went wrong on the server" }` |

## Run it locally

You need Node 22.18 or newer and a Supabase project.

1. Clone the repo and install:

   ```bash
   git clone https://github.com/chentavish/CSC436_Project4.git
   cd CSC436_Project4
   npm install
   ```

2. In the Supabase SQL Editor, run `setup.sql` to create the table and sample rows.
3. Copy `.env.example` to `.env` and fill in your Supabase URL and secret key.
4. Start the server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000/api/health, or use `requests.http` with the VS Code REST Client extension to try every endpoint.

Other scripts: `npm run typecheck` checks types, and `npm run types` regenerates `data/database.types.ts` after a table change.

## Built with

Express 5, TypeScript, Supabase, and Vercel.