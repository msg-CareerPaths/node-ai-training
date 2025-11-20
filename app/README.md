# App Overview

This repository contains a full-stack TypeScript application split into three main parts:

- `backend` – NestJS API (business logic, data access, configuration).
- `frontend` – Angular SPA (UI, routing, and client-side logic).
- `docker` – Docker compose file used for local development

## Shop functionalities

At a high level, this codebase implements a small e-commerce shop.

- **Product catalog**
  - Browse a list of products with key information (name, price, etc.).
  - Open a product detail view to see more information.
- **Authentication & users**
  - Sign up, sign in, and sign out.
  - Manage basic user information (for example, profile data).
- **Shopping cart**
  - Add products to the cart from the catalog or detail pages.
  - Update quantities or remove items from the cart.
- **Orders**
  - Create an order based on the current cart contents.
  - View a list of past orders and inspect their details.
- **Q&A**
  - Access documentation to help users navigate the app.

## Backend (NestJS API)

The backend is a NestJS application written in TypeScript.

### Install dependencies

From the repo root:

```bash
cd backend
npm install
```

### Run the API in development

```bash
cd backend
npm run start:dev
```

This starts the NestJS server in watch mode. Configuration for local development is managed via `.development.env` and `@nestjs/config`. Do not commit secrets or environment-specific overrides.

## Frontend (Angular UI)

The frontend is an Angular application using standalone components, signals for state, and Tailwind for layout.

### Install dependencies

```bash
cd frontend
npm install
```

### Run the app locally

```bash
cd frontend
npm start
```

This starts the dev server with live reload.

## Docker and Containers

The `docker` directory the compose file that should be used for local development (e.g.: database).

If you need any other containers, you should add them here.


## Typical Local Development Workflow

1. Clone the repository and open it in your editor.
2. Set up environment configuration (for example, `.development.env` in `backend`) without committing secrets.
3. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
4. Start the docker containers:
    - `cd docker && docker-compose up -d`
5. Start the backend API:
   - `cd backend && npm run start:dev`
6. Start the frontend:
   - `cd frontend && npm start`
7. Lint and format:
   - Backend: `cd backend && npm run lint && npm run format`
   - Frontend: `cd frontend && npm run lint && npm run format`
