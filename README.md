# HR App

A multi-tenant HR management system built as a monorepo — `client`, `server`, and `shared` workspaces — with GraphQL as the sole API layer, TypeORM over pg, and role-based access enforced on both the UI and the resolvers. React + TypeScript on the front, Express + Apollo Server on the back.

## Concepts used / learned

- **Monorepo with a shared workspace** — `@hr-app/shared` holds TypeScript types, GraphQL arg/response shapes, and shared enums (`EmpRole`, `EmpStatus`, `LogStatus`, `LeaveStatus`) so the client and server have the same context.
- **SDL-first GraphQL over `typeGraphQL`** — schema is written directly as SDL (`schema.ts`) with resolvers wired up separately (`resolvers.ts`), rather than using code first type-graphql.
- **RBAC enforced twice** — on the frontend, a `hasPermission(user, permission)` helper checks a role-to-permission map (`hr`, `manager`, `employee`) before rendering UI; on the backend, every mutation resolver independently checks `context.user.emp_role` before touching the database, so even if frontend is bypassed, backend will check for authorization.
- **JWT access + refresh token flow** — access token is short-lived and returned in the GraphQL response; refresh token is a 7-day JWT stored as an **httpOnly cookie**, verified through a `refreshEndpoint` query that reissues both tokens and rotates the stored refresh token per user.
- **TypeORM with entities and migrations** — `Companies`, `Employee`, `Users`, `Attendance`, as related entities, with real migration files (`migration:generate` / `migration:run`) instead of `synchronize: true`.
- **Multi-tenant scoping via `company_id`** — every resolver that reads or writes employee/attendance data scopes the query by the authenticated user's `company_id`, so one company's HR can never see another company's employees.
- **Supabase Storage for profile images** — the client uploads the file directly to a Supabase bucket, gets back a `publicUrl`, and sends only that URL to the backend to persist — the server never touches the raw image.
- **Apollo Client + TanStack Query together** — Apollo Client handles GraphQL queries/mutations, TanStack Query wraps them for caching, retries, and invalidation on the same query keys used across hooks like `useViewAll`, `useAddEmployee`, `useEditEmployee`.
- **Redux Toolkit for client state** — `authSlice` (with an async thunk for login), `themeSlice` (persisted to `localStorage`, restored into Redux on load), `formSlice`, and `dashboardSlice` split concerns.
- **Protected routing** — `AuthLayout` checks `state.auth.user.accessToken` before rendering the sidebar/dashboard tree and redirects unauthenticated users back to the landing page.
- **Console-only structured logging** — Winston for app-level logs, Morgan piped through Winston for HTTP request logging.
- **Attendance as a single toggling mutation** — `webClockIn` checks whether today's attendance row already exists for the employee; if not, it creates a check-in with a computed status (`present` / `late` / `half_day` based on time thresholds); if it does, the same mutation fills in the check-out and total hours.

## Features

- HR can view all employees (paginated, filterable by department, role, designation, status), create new employees, upload a profile picture, assign a manager from within the employee's own department, edit employee details, and delete employees
- Every employee can view the org directory as employee cards, and see their own attendance log
- Web clock-in / clock-out from the browser, with the log updated in real time
- Role-based UI — HR, manager, and employee see different actions and views
- Persistent theme (light/dark), synced between `localStorage` and Redux

## How it works

**Auth (GraphQL, not REST):**
`login` and `register` are mutations, not REST endpoints. On login, the server issues an access token in the mutation response and sets the refresh token as an httpOnly cookie. A `refreshEndpoint` query reads that cookie, verifies it, rotates the stored refresh token, and returns a new access token — the client calls this transparently to restore a session on page load.

**Employee & attendance data (GraphQL):**
Every request to `/graphql` passes through a context function that reads the `Authorization: Bearer <token>` header, verifies it, and attaches the decoded payload (`emp_id`, `emp_role`, `company_id`) to context as `user`. Resolvers check `context.user` — both that it exists and, for HR-only mutations like `addEmployee`, `editEmployee`, and `deleteEmployee`, that the role is `hr` — before doing anything.

**Image upload:**
```
HR selects a file → uploaded directly to a Supabase "profiles" bucket from the client
                  → Supabase returns a publicUrl
                  → publicUrl is sent to the backend as part of the employee payload
                  → stored in Postgres, returned as-is on every subsequent fetch
```

## Stack

**Client:** React 19, TypeScript, MUI, Apollo Client, TanStack Query, Redux Toolkit, React Router, Supabase JS
**Server:** Express 5, Apollo Server, GraphQL (SDL-first), TypeORM, PostgreSQL, JWT, bcrypt, Winston + Morgan, Zod
**Shared:** TypeScript types, GraphQL arg/response interfaces, and role/status enums consumed by both workspaces

## Running it locally

```bash
git clone https://github.com/sagarsunny24/hr-app.git
cd hr-app
npm install
```

You'll need Postgres running and a Supabase project with a `profiles` storage bucket. Create a `.env` inside `server/`:

```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

And a `.env` inside `client/`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Then, from `server/`:

```bash
npm run migration:run
npm run dev
```

And from `client/` (separate terminal):

```bash
npm run dev
```