workspace "SALIGAN" "System context for the self-hosted offline-first internship records and OJT management platform" {
  model {
    intern = person "Student Intern" "Records DTR entries, daily notes, accomplishments, and exports."
    supervisor = person "Company Supervisor" "Reviews and verifies submitted time records and reports."
    coordinator = person "Academic Coordinator" "Monitors internship completion and submission readiness."
    admin = person "Organization Admin" "Configures organizations, departments, users, and templates."

    saligan = softwareSystem "SALIGAN" "Free and open-source offline-first PWA for internship records, DTR, rendered hours, reports, exports, reminders, and supervisor review." {
      web = container "Web PWA" "Installable React/Vite app with offline drafts and sync queue." "React, Vite, IndexedDB, Dexie"
      api = container "API" "REST API for authentication, internship plans, time entries, reports, reviews, exports, and sync." "NestJS, Fastify, OpenAPI"
      db = container "PostgreSQL" "Canonical relational database for records, reports, review states, and audit events." "PostgreSQL"
      storage = container "File Storage" "Stores generated exports and documentation attachments." "Filesystem adapter; future S3-compatible adapter"
    }

    email = softwareSystem "SMTP Server" "Sends notifications when enabled."
    calendar = softwareSystem "Calendar Apps" "Receives ICS reminder files."

    intern -> saligan "Tracks internship records using"
    supervisor -> saligan "Reviews submissions using"
    coordinator -> saligan "Checks progress using"
    admin -> saligan "Configures using"
    web -> api "Calls REST API"
    web -> web "Stores drafts locally"
    api -> db "Reads/writes"
    api -> storage "Stores files"
    api -> email "Sends notifications"
    web -> calendar "Exports ICS reminders"
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
