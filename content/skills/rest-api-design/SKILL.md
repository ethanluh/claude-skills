---
name: rest-api-design
description: >-
  Design or review a REST API against a concrete, testable checklist —
  resource-noun modeling, HTTP verb semantics, mandatory versioning,
  structured error envelopes, pagination, and long-running-operation
  handling. Use whenever Ethan is designing a new API from a spec (routes,
  resource model, verb choices, versioning scheme, error contract before
  writing implementation code) or reviewing an existing API/PR that adds or
  changes endpoints. Also use for backend project/internship work where
  "REST best practices" is too vague — this gives pass/fail criteria instead.
  Not for GraphQL, gRPC, or other non-REST API styles.
---

# rest-api-design — resource-noun modeling, verb semantics, versioning, errors, pagination, LRO

Source: Microsoft REST API Guidelines (Azure), distilled into pass/fail
checks. Run this checklist whether designing new endpoints or reviewing
existing ones — every item below is a concrete check, not a principle.

## 1. Resource modeling
- [ ] URLs are nouns, hierarchical collections: `/service-root/collection/id`.
      Fail: verb-shaped endpoints (`/createUser`, `/getOrderStatus`).
- [ ] Paths are shallow (avoid `/a/{id}/b/{id}/c/{id}/d`); fields are flat,
      not deeply nested objects a client has to unpack.
- [ ] Actions that don't map to a resource state transition become a
      sub-resource or POST-to-verb-noun (`POST /orders/{id}/cancel`), not a
      bare RPC-style endpoint.

## 2. HTTP verb semantics
- [ ] GET: safe and idempotent, no side effects, returns JSON.
- [ ] PUT: full create-or-replace of a resource, returns 200 (replaced) or
      201 (created). Fail: PUT used for partial update.
- [ ] PATCH: partial update via JSON Merge Patch. Fail: PATCH doing a full
      replace, or PUT doing a partial one.
- [ ] POST: creates a resource with a service-assigned ID, or invokes a
      non-idempotent action.
- [ ] DELETE: returns 204, no body.
- [ ] Check retry safety: is the verb idempotent where the client would
      retry on timeout? POST for an idempotent operation is a fail.

## 3. Versioning (mandatory, not optional)
- [ ] Every request requires an `api-version` query parameter,
      `YYYY-MM-DD` format.
- [ ] Missing version returns 400 with a `MissingApiVersionParameter`-style
      error code — verify this is enforced, not just documented.
- [ ] Unstable/breaking versions carry a `-preview` suffix.
- [ ] Fail: version baked into the URL path only, or no version at all.

## 4. Error contract
- [ ] Every error response uses the structured envelope:
      `{code, message, target, details, innererror}`.
- [ ] Every top-level `code` value used by the API is documented — treat
      error codes as part of the contract, since client code branches on
      them. Fail: ad hoc error shapes that differ by endpoint, or bare
      strings/stack traces in the body.

## 5. Pagination
- [ ] Collection endpoints return `{value: [...], nextLink: "..."}`, not
      custom `page`/`limit` params per endpoint.
- [ ] Standard query params supported consistently where applicable:
      `filter`, `orderby`, `skip`, `top`, `select`, `expand`.
- [ ] Fail: one endpoint paginates with `page`/`size`, another with
      `offset`/`limit`, another with cursor-only — pick one pattern.

## 6. Long-running operations (>1s of work)
- [ ] Initiating request returns 202 Accepted with an `operation-location`
      header pointing to a pollable status resource.
- [ ] Status resource stays queryable for at least 24 hours.
- [ ] Client can pass an `operation-id` (or equivalent) for idempotent
      retries of the same LRO.
- [ ] Fail: async work modeled as a bespoke webhook/callback instead of a
      pollable resource, or as a synchronous call that just blocks.

## How to apply

- **Designing from a spec**: walk sections 1-6 in order before writing any
  implementation code — resource model first, then verbs, then version
  param, then error shape, then pagination/LRO for any collection or async
  endpoint.
- **Reviewing an existing API/PR**: run each checklist item against the
  actual routes/handlers in the diff. Report pass/fail per section, not a
  prose summary — cite the specific route or handler that fails and which
  rule it breaks.
- Common student-project gap: LRO handling (section 6) is usually just
  missing because projects only model synchronous CRUD — flag any
  fire-and-forget async work (job queues, batch imports, ML inference
  calls) that isn't exposed as a pollable resource.
