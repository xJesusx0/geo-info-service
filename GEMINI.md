# 🧠 Geo Info Service - Gemini Development Guide

> This document provides a comprehensive guide for developing and maintaining the Geo Info Service application, with specific instructions for Gemini.

---

## 🚀 Project Overview

**Geo Info Service** is a REST API built with Node.js, Express, and TypeScript. It provides geographical information by querying a Supabase (PostgreSQL) database. The project follows a clean, layered architecture to ensure separation of concerns and maintainability.

-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: Supabase (PostgreSQL with PostGIS)
-   **Runtime/Bundler**: Bun
-   **Key Libraries**:
    -   `@supabase/supabase-js` for database interaction.
    -   `dotenv` for environment variable management.
    -   A custom dependency injection (DI) container for managing services.

---

## 🧱 Solution Architecture

The project is organized into four distinct layers. Adhere strictly to this structure to maintain consistency.

1.  **`presentation`**: Handles HTTP requests and responses.
    -   **`controllers`**: Contain the logic for handling incoming requests, validating inputs, and calling the appropriate application services.
    -   **`routes`**: Define the API endpoints and map them to controller methods.
    -   **`dtos`**: Data Transfer Objects used for API responses.

2.  **`application`**: Contains the core business logic.
    -   **`services`**: Orchestrate business use cases. They are called by controllers and use repositories to interact with the database.
    -   **`container.config.ts`**: Configures the dependency injection container, wiring together all the different parts of the application.

3.  **`domain`**: Represents the core business entities and rules.
    -   **`repositories`**: Interfaces that define the contract for data access operations (e.g., `CityRepository`). These interfaces are implemented in the `infrastructure` layer.

4.  **`infrastructure`**: Implements data access and interactions with external services.
    -   **`repositories`**: Concrete implementations of the repository interfaces defined in the `domain` layer (e.g., `SupabaseCityRepository`).
    -   **`database`**: (Currently empty) Can be used for database-related configurations like migrations.

The dependency flow is unidirectional: `presentation` → `application` → `domain` ← `infrastructure`.

---

## 🛠️ How to Add a New Module (e.g., "Country")

Follow these steps to add a new geographical entity to the API.

### 1. Define the Type

Create a new type definition file in `src/types/`. For a "Country" entity, create `src/types/country.ts`:

```typescript
// src/types/country.ts
import { Database } from './database.types';

export type Country = Database['public']['Tables']['country']['Row'];
// Add other related types if necessary
```

### 2. Create the Domain Repository Interface

Define the data access contract in `src/domain/repositories/`. For "Country", create `src/domain/repositories/country.repository.ts`:

```typescript
// src/domain/repositories/country.repository.ts
import { Country } from '../../types/country';

export interface CountryRepository {
  findAll(): Promise<Country[]>;
  findById(id: number): Promise<Country | null>;
}
```

### 3. Implement the Infrastructure Repository

Create the Supabase implementation in `src/infrastructure/repositories/`. For "Country", create `src/infrastructure/repositories/country.repository.ts`:

```typescript
// src/infrastructure/repositories/country.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { CountryRepository } from '../../domain/repositories/country.repository';
import { Country } from '../../types/country';
import { Database } from '../../types/database.types';

export class SupabaseCountryRepository implements CountryRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(): Promise<Country[]> {
    const { data, error } = await this.supabaseClient.from('country').select('*');
    if (error) throw new Error(error.message);
    return data || [];
  }

  async findById(id: number): Promise<Country | null> {
    const { data, error } = await this.supabaseClient.from('country').select('*').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw new Error(error.message);
    }
    return data;
  }
}
```

### 4. Create the Application Service

Define the business logic in `src/application/services/`. For "Country", create `src/application/services/country.service.ts`:

```typescript
// src/application/services/country.service.ts
import { CountryRepository } from '../../domain/repositories/country.repository';
import { Country } from '../../types/country';

export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }

  async getCountryById(id: number): Promise<Country | null> {
    return this.countryRepository.findById(id);
  }
}
```

### 5. Create the Presentation Controller

Handle HTTP logic in `src/presentation/controllers/`. For "Country", create `src/presentation/controllers/country.controller.ts`:

```typescript
// src/presentation/controllers/country.controller.ts
import { Request, Response } from 'express';
import { CountryService } from '../../application/services/country.service';
import { ErrorResponse } from '../dtos/api.dto';

export class CountryController {
  constructor(private countryService: CountryService) {}

  getAll = async (req: Request, res: Response) => {
    const countries = await this.countryService.getAllCountries();
    res.json(countries);
  };

  getById = async (req: Request, res: Response) => {
    const countryId = Number(req.params.id);
    const country = await this.countryService.getCountryById(countryId);
    if (!country) {
      const response: ErrorResponse = { message: 'Country not found' };
      return res.status(404).json(response);
    }
    res.json(country);
  };
}
```

### 6. Create the Routes

Define the endpoints in `src/presentation/routes/`. For "Country", create `src/presentation/routes/country.routes.ts`:

```typescript
// src/presentation/routes/country.routes.ts
import { Router } from 'express';
import { container } from '../../core/container';
import { TOKENS } from '../../core/tokens';
import { CountryController } from '../controllers/country.controller';

export function createCountryRoutes(): Router {
  const router = Router();
  const countryController = container.resolve<CountryController>(TOKENS.COUNTRY_CONTROLLER);

  router.get('/', countryController.getAll);
  router.get('/:id', countryController.getById);
  return router;
}
```

### 7. Wire Everything in the DI Container

First, add a new token to `src/core/tokens.ts`:

```typescript
// src/core/tokens.ts
export const TOKENS = {
  // ... existing tokens
  COUNTRY_REPOSITORY: 'CountryRepository',
  COUNTRY_SERVICE: 'CountryService',
  COUNTRY_CONTROLLER: 'CountryController',
} as const;
```

Next, register the new components in `src/application/container.config.ts`:

```typescript
// src/application/container.config.ts
// ... imports for new classes

export function configureContainer() {
  // ... existing configuration

  // Register Country components
  registerSupabaseRepository(TOKENS.COUNTRY_REPOSITORY, SupabaseCountryRepository);
  registerService(TOKENS.COUNTRY_SERVICE, TOKENS.COUNTRY_REPOSITORY, CountryService);
  registerController(TOKENS.COUNTRY_CONTROLLER, TOKENS.COUNTRY_SERVICE, CountryController);
}
```

### 8. Add the Routes to the Main App

Finally, add the new routes to `src/index.ts`:

```typescript
// src/index.ts
// ... imports
import { createCountryRoutes } from './presentation/routes/country.routes';

// ... app setup
app.use('/api/v1/cities', createCityRoutes());
app.use('/api/v1/neighborhoods', createNeighborhoodRoutes());
app.use('/api/v1/countries', createCountryRoutes()); // Add this line

// ... app.listen
```

---

## ⚙️ Core Concepts & Conventions

### Dependency Injection

-   The project uses a custom DI container (`src/core/container.ts`).
-   **Tokens**: Unique string identifiers for services are defined in `src/core/tokens.ts`. Always add new tokens here.
-   **Configuration**: All dependencies are wired together in `src/application/container.config.ts`. Use the helper functions (`registerSupabaseRepository`, `registerService`, `registerController`) to register new components.
-   **Resolution**: Dependencies are resolved in the `routes` files by calling `container.resolve<Type>(TOKEN)`.

### Environment Variables

-   Environment variables are managed via a `.env` file.
-   The `src/core/env.ts` file loads and validates these variables.
-   To add a new variable, update `env.d.ts`, `env.ts`, and the `.env.example` file.

### Database Interaction

-   All database queries must be performed within **repository** classes in the `infrastructure` layer.
-   Use the `SupabaseClient` instance provided to the repository's constructor.
-   Handle potential database errors gracefully (e.g., check for `PGRST116` for "not found" errors).
-   For geospatial queries, use Supabase RPC calls to PostgreSQL functions (see `SupabaseNeighborhoodRepository` for an example).

### Code Style

-   **TypeScript**: Use strict mode. Provide explicit types for function parameters and return values. Avoid `any`.
-   **Naming**:
    -   `PascalCase` for classes, interfaces, and types (e.g., `CityService`).
    -   `camelCase` for variables and functions (e.g., `getAllCities`).
    -   `UPPER_SNAKE_CASE` for constants and tokens (e.g., `TOKENS.CITY_REPOSITORY`).
-   **Modularity**: Keep files focused on a single responsibility.

---

## 🧪 Testing

-   Use **Bun's built-in test runner**.
-   Create test files with the `.test.ts` suffix (e.g., `city.service.test.ts`).
-   Mock dependencies, especially database repositories, to isolate the code under test.
-   Focus on testing business logic in **services** and input/output handling in **controllers**.

## 🔐 Security

-   **Input Validation**: Always validate and sanitize user-provided data in the **controller** layer before passing it to services.
-   **Error Handling**: Do not expose detailed error messages or stack traces to the client. Return standardized error responses (e.g., `{ "message": "Internal server error" }`).
-   **API Keys**: While not yet implemented, an API key middleware should be added to protect the endpoints.
