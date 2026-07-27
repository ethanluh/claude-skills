---
name: caching-strategies
description: >-
  Caching strategies — cache-aside vs. write-through mechanics, why
  production systems combine both, and TTL as a first-class design
  parameter tied to staleness tolerance. Use when adding a cache layer in
  front of a database, choosing between lazy-loading and write-through,
  reviewing a design doc or PR that introduces caching, setting or
  reviewing a TTL/expiration value, or diagnosing a cache-related
  production issue (stale reads, low hit rate, thundering herd on miss).
---

# Caching strategies — cache-aside vs. write-through

Grounded in AWS's database caching whitepaper (see
`literature/backend-design/aws-database-caching-patterns.md`).

## The two default patterns

- **Cache-aside (lazy loading) — reactive, application-managed.**
  - Read path: check cache -> hit -> return immediately.
  - Miss: query the database, populate the cache, then return.
  - Cache only ever holds data that was actually requested — cheap and
    self-trimming.
  - Cost: every miss pays both a cache lookup and a DB round trip.

- **Write-through — proactive.**
  - The moment the primary DB is updated, the cache is updated too.
  - Cache stays consistent with the source of truth; read latency is
    optimal whenever data is present.
  - Cost: a larger, more expensive cache, since infrequently-read data
    still gets written on every update.

## Checklist: choosing / reviewing a caching design

- [ ] Don't treat this as pick-one. Production systems combine both:
      write-through for hot/critical data that must stay fresh, cache-aside
      as the fallback path for whatever isn't proactively kept warm (e.g.
      after eviction or a cold cache).
- [ ] Frame the choice as a consistency/cost tradeoff, not a
      performance-only decision:
  - Cache-aside optimizes for a smaller, cheaper cache and simpler
    implementation, at the cost of miss latency and only-eventual
    freshness.
  - Write-through optimizes for read consistency and hit rate, at the
    cost of cache size and write-path overhead.
- [ ] Set an explicit TTL/expiration — this is what keeps a cache-aside or
      write-through cache from going stale or growing unbounded. Treat the
      window as a first-class design decision, not an afterthought bolted
      on after the pattern is picked.
- [ ] Tie the TTL value to the application's actual staleness tolerance —
      how wrong can a read be, and for how long, before it matters — not to
      a round-number default.
- [ ] Match TTL to the real read/write ratio for that data. Hot,
      rarely-changing data can tolerate a longer TTL; volatile or
      correctness-sensitive data needs a short one or write-through instead.

## Diagnosing a cache-related production issue

When a performance problem looks cache-related (stale reads, low hit rate,
thundering herd on cache miss), check these before touching database
indexes or query plans:

- [ ] Which pattern is actually in play for this data path — cache-aside,
      write-through, or an untested mix of both?
- [ ] Was TTL ever tuned for this data's real read/write ratio, or is it a
      default that no longer matches usage?
- [ ] Is a miss on hot data causing a stampede (many concurrent misses
      hitting the DB at once) — a sign the pattern or TTL doesn't match the
      access pattern?
