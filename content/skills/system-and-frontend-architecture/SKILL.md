---
name: system-and-frontend-architecture
description: Architecture decision guidance spanning code-organization patterns (MVC/MVP/MVVM/VIPER/Clean/Hexagonal/Vertical-Slice), frontend system design (rendering strategy, caching, state management, micro-frontends), and backend/infra system design (caching layers, load balancing, three-tier/microservices). Use when choosing or reviewing an architecture pattern, deciding how to split a frontend or backend system, or evaluating whether a proposed pattern matches the project's actual scale.
---

# System and Frontend Architecture

Cross-source guidance on code-organization patterns, frontend system design,
and backend/infra system design — three layers of the same underlying
question: which layer is allowed to talk to which, and at what scale does
splitting them further actually pay off.

## Match the pattern to current scale, not anticipated scale

Architecture choices are hard to reverse, unlike file structure or naming.
Default to the lightest pattern that fits today's requirements:
- Modular monolith before micro-frontends/microservices — team size and
  Conway's Law (who owns what), not traffic alone, is what actually forces
  a split.
- Don't adopt SSR, micro-frontends, or VIPER/Clean's multiple layers
  preemptively. Add a layer when there's a concrete, current reason, not
  because the pattern is available.
- Cockburn's own framing of Hexagonal Architecture is a useful corrective
  here: "there's only one line — the app and the outside." Cite this
  whenever a proposal is stacking layers (VIPER's five, Clean's four)
  without a specific problem each layer solves.

## Code-organization patterns: pick by "who talks to whom"

- **MVC** — Controller mediates everything and may know the View
  concretely.
- **MVP** — Presenter mediates too, but is kept ignorant of the concrete UI
  via a protocol/interface. Cost: trivial to unit-test (mock the view), but
  loses native UI-framework idioms that assume a concrete view reference.
- **MVVM** — ViewModel never references the View at all; it exposes
  observable state instead of pushing to it. Strictly looser coupling than
  MVP.
- **VIPER** — splits Entity (data) from Interactor (business logic), where
  the others fold both into one Model; bakes in a Router as a first-class
  navigation layer.
- **Clean/Hexagonal (Ports and Adapters)** — a different axis: splits by
  dependency direction and volatility, not by UI role. Inner layers must
  never depend on outer ones; driven adapters implement interfaces the
  application itself defines (Port Ownership Principle). Compatible with,
  not competing against, the role-splitting patterns above.
- **Vertical Slice Architecture** — organizes by feature instead of
  technical layer, explicitly resisting a shared Service/Repository/Model
  folder-per-type structure. Treat "reuse is a four-letter word" as the
  deliberate counter-instinct to every layered pattern above: resist
  sharing code across features until it's genuinely identical and changes
  for the same reason.
- Navigation is the concern none of MVC/MVP/MVVM cleanly own — a
  Coordinator (bolted onto MVVM) or Router (native to VIPER) is the fix,
  not stuffing navigation into the ViewModel/Presenter.

## Frontend system design

- Rendering strategy is a tradeoff between freshness/interactivity and
  build-time cost (SSG/ISR/SSR/CSR) — pick based on how often content
  changes and how personalized it is, not by default.
- Cache aggressively at every layer (component memoization, client state,
  React Query, GraphQL) to avoid redundant work, but treat caching as a
  performance *enhancement* layered on a sound design, not a fix for a bad
  one.
- Solve REST under/over-fetching with GraphQL + a BFF layer rather than
  piling on more REST endpoints.
- Categorize state by origin — global / server / local — and pick tools
  per category, rather than adopting one state library for everything.
- Treat reliability (feature flags, error fallbacks, production
  observability/RUM) as a first-class design concern, not an afterthought.

## Backend/infra system design

- No cache access pattern (cache-aside, read-through, write-through,
  write-behind, refresh-ahead) is universally "best" — the right one
  depends on read/write ratio and how much staleness the data tolerates.
  Default to write-through for consistency-critical or sensitive data.
- Never cache authenticated/session-specific content — this rule shows up
  at every abstraction level, from cache-pattern choice down to CDN/page
  caching.
- Identify the single point of failure and harden it first, before adding
  redundancy elsewhere.
- Three-tier architecture (frontend/backend/database as separate deployed
  services) is the physical split that MVC's three logical roles need once
  a single-server setup outgrows itself — it's the concrete link between
  a code-organization pattern and a system-design decision. Design patterns
  organize code within one app; system design is how separate deployed
  systems interact.
- "The right choice depends on requirements" applies not just to caching
  but to database type, load-balancing algorithm, and API protocol
  (REST/GraphQL/gRPC) — don't default to the familiar choice without
  checking it against the actual read/write/latency requirements.
