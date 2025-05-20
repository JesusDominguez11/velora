# velora

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Docker Setup

## Prerequisites

- Docker 20.10+ installed
- Docker Compose 2.0+
- Node.js 18+ (only required for local development without Docker)

## Quick Start

### Development Environment

```bash
# Start development server with hot-reload
docker-compose up frontend-dev
```

Access the app at: [http://localhost:5173]http://localhost:5173

### Production Build

```bash
# Build and run production container
docker-compose up frontend-prod --build
```

Access the production app at: [http://localhost:8080]http://localhost:8080
