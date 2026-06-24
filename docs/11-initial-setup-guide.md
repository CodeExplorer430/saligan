# 11 — Initial Setup Guide

## Purpose

This guide prepares the SALIGAN repository for the first implementation sprint.

## Prerequisites

Recommended local tools:

```text
Node.js 24 LTS
pnpm 11
Docker 29+
Docker Compose 2.40+
Git
OpenSSL
jq
```

## Create repository

```bash
mkdir saligan
cd saligan
git init
```

Copy this planning package into the repository root, then commit the baseline:

```bash
git add README.md docs specs diagrams adrs backlog package.json pnpm-workspace.yaml docker-compose.yml .env.example .editorconfig .gitignore
git commit -m "chore: establish SALIGAN planning baseline"
```

## Install package manager

```bash
corepack enable
corepack prepare pnpm@11.0.0 --activate
pnpm --version
```

## Planned scaffold commands

```bash
mkdir -p apps/web-pwa apps/api packages/domain packages/ui packages/config packages/exporters packages/sync docker
pnpm init
```

After scaffolding, the root should contain:

```text
apps/web-pwa
apps/api
packages/domain
packages/ui
packages/config
packages/exporters
packages/sync
docs
diagrams
specs
adrs
backlog
docker
```

## Environment setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Start local infrastructure:

```bash
docker compose up -d postgres mailpit
```

## First development milestone

Before building UI screens, implement and test the domain package:

1. schedule presets;
2. time segment model;
3. regular/overtime/undertime computation;
4. remaining hours computation;
5. validation rules.

## Initial quality gates

The final repository should support these commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## First implementation order

1. Domain model and computation tests.
2. Database schema and migrations.
3. API endpoints for internship plan and time entries.
4. PWA local data model with IndexedDB.
5. DTR logging screen.
6. DTR export prototype.
7. Weekly report prototype.
8. Offline sync queue.
