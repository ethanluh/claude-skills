---
name: api-from-spec
description: >-
  Design a new API from a spec — write or extend an OpenAPI-style contract
  first (resources, verbs, versioning, errors) before any implementation
  code, gate unstable additions behind a preview track, then generate or
  hand-write SDKs/docs from the spec. Use whenever Ethan is starting a new
  API (class project, internship, personal tool) and asks "how do I design
  this API", "write the spec first", "set up a preview/stable split", or is
  about to add an endpoint to an already-spec'd API. Not for reviewing an
  API that's already built without a spec — that's a straight `rest-api-design`
  review instead.
---

# api-from-spec — spec-first API design

Ordering discipline: the OpenAPI document is the contract, and everything
else (implementation, SDKs, docs) is generated or hand-written *from* it —
never the reverse. Grounded in Microsoft's REST API Guidelines (resource/
verb/versioning/error rules) and Stripe's public OpenAPI repo (the process
of actually running spec-first at scale).

## 0. Preconditions

1. Confirm a spec file exists or will be created (`openapi.yaml`/`.json`) —
   if the API is already implemented with no spec, stop: this is a
   `rest-api-design` review task, not a spec-first design task.
2. Confirm scope: new API from scratch, or a new endpoint/field on an
   existing spec'd API. The latter skips straight to step 2.

## 1. Model the resource, not the action

- Nouns only: `/service-root/collection/id`, never verb-shaped endpoints
  (`/createUser`). Keep paths shallow and fields flat.
- Assign each resource a canonical identity independent of its URL path —
  Stripe's `x-resourceId` extension exists precisely because a resource can
  be reachable from more than one path and still needs one stable name.

## 2. Pick verbs by actual semantics, not habit

- GET: safe/idempotent read. PUT: create-or-replace a full resource (200
  or 201). PATCH: partial update (JSON Merge Patch). POST: create with a
  service-assigned ID, or invoke a genuine action. DELETE: 204.
- Wrong verb-to-semantics mapping (e.g. POST for an idempotent replace)
  breaks client retry logic downstream — this is a spec-time decision, not
  something to patch later in the implementation.

## 3. Write the versioning and error contract before any endpoint detail

- Version from the first commit of the spec: a required version parameter
  (Microsoft's convention is `api-version` in `YYYY-MM-DD` format), hard
  error if a client omits it. Don't leave versioning for "later" — it's
  unversionable after clients exist.
- Errors are part of the contract, not free-form strings: fix a structured
  envelope (`{code, message, target, details, innererror}` or equivalent)
  and document every top-level error code as rigorously as an endpoint,
  since client code branches on it.
- Standardize pagination (`{value, nextLink}` or equivalent) and the query
  params every collection endpoint accepts (`filter`, `orderby`, `skip`,
  `top`, `select`, `expand`) so collections behave uniformly.
- Any endpoint that kicks off async work (job queue, batch import, ML
  inference): spec it as 202 + a pollable status resource + an idempotency
  key up front — this is a common gap when only synchronous CRUD gets
  modeled.

## 4. Gate instability behind a preview track

- Split the spec into a stable track (safe to build against) and a preview
  track (upcoming endpoints/fields, opt-in). Stripe's `/latest` vs
  `/preview` is the concrete model — even a single local OpenAPI file can
  keep two such sections or two such files.
- Never land an unstable field directly into the stable spec "to save
  time" — that's the whole discipline this step protects.
- When OpenAPI's base vocabulary can't express something real (which
  fields are expandable, a discriminated-union response shape), add a
  deliberate vendor extension (`x-*` field, documented) rather than
  dropping spec-first discipline and improvising in code.

## 5. Generate or hand-write from the spec, never the reverse

- Once the spec section is settled, generate or write SDK bindings and
  docs from it. If a public spec and an SDK-codegen spec need to diverge
  (deprecated-but-still-present endpoints, pre-release fields for your own
  client), keep both variants derived from the same source resources
  rather than maintaining docs by hand against a moving implementation.
- Implementation code should satisfy the spec, not the other way around —
  if implementation forces a spec change, that change goes through steps
  1–4 again, not as a silent edit.

## 6. Output

- The spec file/diff itself (resources, verbs, versioning param, error
  envelope, preview split where relevant).
- One line naming which track (stable/preview) each new addition landed
  in and why.
