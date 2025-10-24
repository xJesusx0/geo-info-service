# 📘 Geo Info Service – Development Rules

> General Rules that should be respected application-wide

---

## ⚙️ General Considerations

- Only modify code directly relevant to the specific request or feature.  
  Avoid touching unrelated modules or refactoring areas outside the current scope.  
- Never use placeholders like `// TODO` or `// ... rest of code ...`.  
  Always write complete and functional code.  
- Break down complex problems into small, testable steps.  
- Always provide reasoning and evidence for proposed changes (logs, errors, API traces).  
- Follow the defined architecture and code organization strictly.  
- Ensure new code aligns with the system’s overall design and long-term maintainability.  

---

## 🧱 Project Structure

Your main modules should follow this layout:

```
src/
├── routes/          # Route definitions (Express)
├── controllers/     # HTTP handling and request validation
├── services/        # Business logic
├── repositories/    # Database queries and persistence
├── models/          # TypeScript interfaces and types
├── middlewares/     # Express middlewares (auth, API keys, etc.)
├── utils/           # Reusable helper functions
├── config/          # Environment variables, database connections
└── app.ts / index.ts
```

**Each module** (e.g., `country`, `city`, `neighborhood`) should have its own controller, service, and repository.

---

## 🎨 Code Style & Conventions

- Follow **TypeScript strict mode**.  
- Use **camelCase** for variables and methods.  
- Use **PascalCase** for classes and interfaces.  
- Use **ALL_CAPS** for constants.  
- Always include explicit return types in functions.  
- Use **ES Modules** (`import/export`), not `require`.  
- Keep files under ~300 lines; split larger logic into helpers.  
- Document complex methods with JSDoc (`/** ... */`).  

Example:
```ts
/**
 * Finds a city by ID.
 * @param id - City ID.
 * @returns City record or null if not found.
 */
async function findCityById(id: number): Promise<City | null> { ... }
```

---

## 🧠 Architecture Rules (Express + TS)

| Layer | Responsibility | Notes |
|--------|----------------|-------|
| **Routes** | Define endpoints and map them to controllers | Minimal logic, only routing |
| **Controllers** | Handle HTTP requests/responses | Validate input, call services |
| **Services** | Contain business rules | Reusable, independent of HTTP |
| **Repositories** | Handle database access | All SQL / Supabase calls |
| **Models** | Define data structures and types | Typed DTOs, no logic inside |

Follow **dependency direction**:  
`routes → controllers → services → repositories → db`

---

## 🧩 TypeScript Specifics

- Target **ES2022** or later.  
- Use `"module": "ESNext"` in `tsconfig.json`.  
- Prefer **async/await** over `.then()`.  
- Always use **interfaces** or **types** for data models.  
- Enable strict null checks and type inference.  
- No `any` unless absolutely necessary (and justified).

---

## 🧪 Testing

- Use **Bun’s built-in test runner** or **Vitest**.  
- Follow naming convention:  
  ```
  src/
  └── tests/
      ├── city.service.test.ts
      ├── neighborhood.repository.test.ts
  ```
- Mock database responses (Supabase client or pg).  
- Test both positive and error cases.  
- Aim for 80%+ coverage in core modules.

---

## ⚙️ Configuration & Environment

- Use `.env` for secrets and environment variables.  
- Load them via `dotenv` or `bun` built-in env handling.  
- Structure:
  ```
  SUPABASE_URL=
  SUPABASE_KEY=
  PORT=3000
  NODE_ENV=development
  ```
- Avoid hardcoded constants in code.  
- Use `process.env` only inside `config/env.ts`.

---

## 🧱 Dependency Management

- Use **Bun** for installing and running:
  ```
  bun install
  bun run dev
  ```
- Group dependencies logically:
  - Core: `express`, `@supabase/supabase-js`
  - Dev: `typescript`, `ts-node-dev`, `@types/express`
  - Testing: `vitest` or `bun test`

Keep the code lightweight; avoid adding libraries unless necessary.

---

## 🚀 Performance & Scalability

- Cache frequent reads using in-memory caching (e.g., `node-cache` or Redis).  
- Use pagination for large lists (`limit`, `offset`).  
- Avoid unnecessary DB round trips — batch queries when possible.  
- Use PostGIS spatial indexes for geometry queries (`GIST`).  
- Keep API responses lightweight (exclude unused columns).

---

## 🔐 Security

- All requests should go through an **API key middleware** (`X-API-Key`).  
- Store API keys in a separate table with expiration and usage limits.  
- Sanitize all user inputs (use validation library like `zod` or `class-validator`).  
- Disable stack traces in production responses.  
- Configure CORS for trusted origins only.  
- Never expose `SUPABASE_KEY` publicly.  

---

## 🧭 Logging & Monitoring

- Use **pino** or **winston** for structured logging.  
- Log important events (requests, DB errors, API key usage).  
- Maintain proper log levels:  
  - `error` → Critical errors  
  - `warn` → Unexpected but handled situations  
  - `info` → Key flow events (server start, connections)  
  - `debug` → Developer-only info  
- Integrate health endpoints:
  - `/health` → Checks service uptime  
  - `/version` → Returns build version

---

## 🧰 API Design

- Follow **RESTful conventions** strictly.  
- Use correct HTTP methods and status codes:
  - `GET` → Retrieve
  - `POST` → Create
  - `PUT` → Update
  - `DELETE` → (Rarely used here)
- Always return JSON responses.
- Include pagination metadata where applicable.
- Add OpenAPI/Swagger documentation (e.g., with `swagger-ui-express`).

---

## 🧱 Data Access

- Use Supabase or direct Postgres client.  
- All database access goes through the `repositories` layer.  
- Handle errors gracefully and log them.  
- Ensure DB constraints (foreign keys, indexes) are respected.  
- Keep queries efficient and parameterized to avoid SQL injection.

---

## 🧩 Build & Deployment

- Use `bun run build` to compile TypeScript to `/dist`.  
- Configure environment-specific builds via `.env` files:
  ```
  .env.development
  .env.production
  ```
- Deploy easily to **Vercel**, **Render**, or **Fly.io**.  
- Use **Docker** only if multi-service setup is required.  
- Version the API (e.g., `/api/v1/cities`) once it stabilizes.

---

## 🧠 Coding Principles

- Follow **SOLID** and **DRY** principles.  
- Maintain **high cohesion and low coupling**.  
- Prefer composition over inheritance.  
- Keep functions small and predictable.  
- Avoid circular dependencies.  
- Always handle errors explicitly (`try/catch`).

---

## 🧾 Documentation

- Each module should include a `README.md` with:
  - Purpose  
  - Endpoints exposed  
  - Example requests/responses  
- Maintain a root `README.md` with:
  - Setup instructions  
  - Project structure  
  - Environment variables  
  - Development commands  

---

## ✅ Summary of Key Practices

| Aspect | Rule |
|--------|------|
| Language | TypeScript (strict mode) |
| Framework | Express |
| DB | PostgreSQL + PostGIS via Supabase |
| Dependency manager | Bun |
| Testing | Bun Test / Vitest |
| API Auth | API Key middleware |
| Documentation | Swagger / OpenAPI |
| Logging | Winston / Pino |
| Architecture | Layered (routes → controllers → services → repositories) |
