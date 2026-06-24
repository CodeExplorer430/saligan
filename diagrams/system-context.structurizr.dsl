workspace "SALIGAN" "Sprint 0B current system context and planned users" {
  model {
    developer = person "Developer" "Runs and extends the Sprint 0B scaffold."
    futureUser = person "Future SALIGAN User" "Will use requirement-traced internship workflows."

    saligan = softwareSystem "SALIGAN" "Pre-MVP offline-first internship records platform." {
      web = container "Web PWA Shell" "Current dashboard placeholders, connectivity state, PWA assets, and Dexie placeholder stores." "React, Vite, Tailwind, TanStack, Dexie"
      api = container "API Shell" "Current health endpoint, Swagger, and placeholder NestJS modules." "NestJS, Fastify"
      db = container "PostgreSQL" "Current migrated 12-table database baseline." "PostgreSQL 18, Drizzle"
    }

    planned = softwareSystem "Planned Product Capabilities" "Authentication, business workflows, synchronization, exports, attachments, review, and notifications."

    developer -> web "Runs and tests"
    developer -> api "Runs and tests"
    api -> db "Applies migrations; future queries"
    futureUser -> web "Will use"
    web -> planned "Will provide offline workflows"
    api -> planned "Will enforce server behavior"
  }

  views {
    systemContext saligan "SystemContext" {
      include *
      autolayout lr
    }
    container saligan "Containers" {
      include *
      autolayout lr
    }
    theme default
  }
}
