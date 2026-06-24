---
version: sprint-0b
name: SALIGAN-design-baseline
description: Accessible, offline-first application shell using neutral monochrome surfaces, clear status communication, restrained cards, and system typography.

colors:
  primary: "#111111"
  primary-active: "#242424"
  primary-disabled: "#e5e7eb"
  ink: "#111111"
  body: "#374151"
  muted: "#6b7280"
  hairline: "#e5e7eb"
  canvas: "#ffffff"
  surface-soft: "#f8f9fa"
  surface-card: "#f5f5f5"
  surface-dark: "#101010"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#d1d5db"
  success: "#10b981"
  warning: "#f59e0b"
  error: "#ef4444"

typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.025em
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.4

rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  app-shell:
    backgroundColor: "{colors.surface-soft}"
    maxContentWidth: 1152px
  top-bar:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline}"
  status-card:
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: 24px
  sync-status:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.full}"
    onlineColor: "{colors.success}"
    offlineColor: "{colors.warning}"
  information-band:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
---

# SALIGAN Design Baseline

## Purpose

This file defines SALIGAN product UI direction. It replaces earlier third-party visual analysis. SALIGAN MUST use its own identity and MUST NOT depend on proprietary fonts, copied brand elements, or another product's navigation and marketing patterns.

## Current Sprint 0B Implementation

`apps/web` currently implements:

- responsive `AppShell`;
- SALIGAN identity header;
- online/offline status indicator;
- dashboard placeholder cards for DTR/time log, rendered hours, and weekly report;
- offline-first information band;
- Tailwind CSS styling with system/Inter-compatible font stack;
- semantic headings, live connectivity status, and visible keyboard focus;
- PWA manifest and generated service worker.

Placeholder cards communicate future scope only. They MUST NOT imply working DTR, report, calculation, approval, or synchronization behavior.

## Design Principles

1. Records first. Prioritize attendance, hours, report status, and exceptions over decoration.
2. Offline state is explicit. Show connectivity, pending sync, failures, and conflicts in text, not color alone.
3. Sensitive actions are deliberate. Submission, correction, approval, deletion, and export require clear consequences.
4. Accessible by default. Target WCAG 2.2 AA, semantic HTML, keyboard operation, visible focus, labels, and adequate touch targets.
5. Low-end-device friendly. Keep bundles, imagery, animation, and rendering cost restrained.
6. Neutral institutional tone. Use monochrome surfaces with semantic color reserved for status and errors.
7. No fictional completeness. Planned screens and sample values must be labeled.

## Visual Foundation

### Color

- Near-black is primary action and high-emphasis text.
- White is primary content surface.
- Light gray separates application background and secondary cards.
- Dark surfaces are scarce and used for high-level information bands.
- Green, amber, and red are semantic signals only.
- Every semantic color requires accompanying text or icon meaning.

### Typography

Use Inter when bundled later or system sans-serif fallback now. Display headings use weight 600 and modest negative tracking. Body text uses weight 400. Tabular time values SHOULD use tabular numerals.

SALIGAN MUST NOT use Cal Sans or represent Cal.com branding.

### Spacing and Shape

- Base spacing unit: 4px.
- Common component spacing: 8, 12, 16, 24, and 32px.
- Cards use 12px radius; marquee surfaces may use 16px.
- Controls SHOULD meet 44px touch-target guidance.
- Avoid excessive rounding, deep shadows, glassmorphism, and decorative gradients.

## Current Components

### App Shell

Centered content container with light application background and white top bar. Header contains SALIGAN identity and connectivity state.

### Status Card

White bordered card with eyebrow, title, placeholder value, and explanatory text. Current cards are scaffold indicators, not live metrics.

### Sync Status

Compact live region:

- online: green indicator and “Online · sync available”;
- offline: amber indicator and “Offline · changes stay on device”.

Future versions must add pending count, last successful sync, retry state, and conflict state only after sync requirements are implemented.

### Offline Information Band

Dark information surface explaining local-storage and sync-queue readiness. It must remain factual about current behavior.

## Planned Screens

These screens are planned and unimplemented:

- authentication and account recovery;
- internship plan setup;
- schedule configuration;
- DTR entry and time segments;
- rendered/overtime/undertime/remaining-hours detail;
- daily notes and weekly reports;
- pending sync and conflict resolution;
- submission and supervisor review;
- attachments and exports;
- organization administration.

Each screen requires accepted requirements, loading/empty/error/offline states, accessibility checks, tests, and security review.

## Form and Data Rules

- Use explicit labels and help text.
- Preserve user-entered drafts across recoverable errors.
- Show timezone and local work date where time records are entered.
- Never imply client-side validation or role checks are authoritative.
- Destructive actions require confirmation and recovery guidance.
- Sensitive exports require authorization and visible draft/review status.

## Responsive Behavior

- Mobile-first single-column content below 768px.
- Dashboard cards may use two columns on tablet and three on desktop.
- Long record tables should become stacked record summaries or horizontally scroll with clear labels.
- Navigation structure will be defined when multiple implemented routes exist.
- Do not add placeholder navigation to unimplemented screens.

## Implementation Mapping

| Design concept      | Current location                          | Status               |
| ------------------- | ----------------------------------------- | -------------------- |
| App shell           | `apps/web/src/components/app-shell.tsx`   | Implemented          |
| Connectivity status | `apps/web/src/components/sync-status.tsx` | Implemented          |
| Dashboard cards     | `apps/web/src/components/status-card.tsx` | Placeholder          |
| Dashboard route     | `apps/web/src/routes/dashboard.tsx`       | Scaffold             |
| Offline stores      | `apps/web/src/offline/database.ts`        | Schema placeholders  |
| Shared UI package   | `packages/ui`                             | Placeholder boundary |

## Change Control

UI behavior must trace to SRS requirements or accepted issues. Reusable components should move into `packages/ui` only after a repeated, tested need exists. Major navigation, design-system, or framework changes require ADR review.
