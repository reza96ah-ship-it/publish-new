# Nashrino Design-System Roadmap

This file records the stabilization direction for the current frontend prototype.

## Immediate priorities

1. Restore the original directory structure from the source archive.
2. Make one shared RTL workspace shell own desktop and mobile navigation.
3. Establish one canonical route registry.
4. Consolidate semantic Tailwind CSS v4 design tokens.
5. Replace duplicated shell and UI component generations.
6. Add strict type checking, linting, tests, and a reproducible build.
7. Replace inline mock dashboard data with typed fixtures, then real APIs.
8. Complete purpose-built mobile workflows rather than shrinking desktop pages.

## Visual principles

- Use glass for navigation and transient controls.
- Use stable, more opaque surfaces for dense operational content.
- Preserve a clear hierarchy between urgent operations, execution status, and analytics.
- Keep the persistent desktop sidebar on the right in RTL.
- Use bottom navigation and a right-side drawer on mobile.
- Use real platform assets and real content thumbnails in production.

## Delivery phases

- Phase 0: repository and build stabilization
- Phase 1: shared shell, routes, and design tokens
- Phase 2: typed domain and API foundations
- Phase 3: dashboard and operational interactions
- Phase 4: mobile workflow completion
- Phase 5: accessibility, testing, observability, and release readiness
