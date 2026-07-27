---
name: database-schema-design
description: >-
  Design or review a PostgreSQL (or general relational) database schema —
  checks normal-form violations (1NF/2NF/3NF/BCNF) as a concrete checklist,
  enforces normalizing first and denormalizing only after a measured
  bottleneck, and points to concrete Postgres tooling (foreign keys, indexes,
  materialized views). Use whenever designing a new schema, reviewing a
  proposed table design, deciding whether to denormalize, or debugging
  update/insert/delete anomalies in an existing schema.
---

# database-schema-design

## Normal-form violation checklist

Walk every table through these in order; each catches a distinct anomaly.

1. **1NF — atomicity and row uniqueness.** Any column holding a packed list
   (`tags: "a,b,c"`) or a duplicate row violates this. Fix: pull the
   multi-valued column into its own join table.
2. **2NF — full dependency on the whole key.** Only applies to tables with a
   composite primary key. Every non-key column must depend on the *entire*
   key. Example violation: `(order_id, product_id)` primary key with a
   `product_name` column — `product_name` depends only on `product_id`. Fix:
   move it to a `products` table.
3. **3NF — no transitive dependencies.** Non-key columns must depend only on
   the primary key, not on each other. Example: `zip_code` determining `city`
   inside an `orders` table. Fix: extract an `addresses` table keyed on
   `zip_code`.
4. **BCNF — the tie-breaker.** Only relevant when a table has more than one
   candidate key (more than one column/combination that could uniquely
   identify a row). Check whether every determinant is a candidate key; if
   not, split the table.

## Ordering rule: normalize first, denormalize on a measured bottleneck

Default target is 3NF. Do not denormalize preemptively — denormalization
(duplicated columns, pre-joined data) trades integrity for read speed, and
that trade should be a response to an identified slow query, not a starting
assumption ("the only thing faster than a join is not using joins" is true,
but so is "you don't have a join problem until you've measured one"). When
reviewing a schema:

- If it's already denormalized without a stated reason (a slow query,
  `EXPLAIN ANALYZE` output, a load test) — push back and ask for the
  measurement, or normalize it.
- If it's normalized and someone reports a slow read path — that's the
  trigger to consider denormalizing, not before.

## Concrete Postgres tooling

- **Foreign keys**: enforce the normalized structure's referential integrity
  (`REFERENCES` + `ON DELETE`/`ON UPDATE` behavior) — don't rely on
  application code to keep joined tables consistent.
- **Indexes**: put them on the columns that get joined or filtered on;
  normalization without indexes on the join columns just moves the cost from
  redundancy to slow joins.
- **Materialized views**: the preferred middle ground for the denormalize
  step — they give a read path a pre-joined, indexable, cache-like shape
  without duplicating data on the write path or giving up the normalized
  source-of-truth tables. Prefer this over ad hoc caching or manually
  duplicated columns.
- **ER diagrams**: sketch the entity/dependency structure before writing DDL,
  especially when checking for 2NF/3NF violations — dependency direction is
  easier to see in a diagram than in a `CREATE TABLE` statement.

## Procedure when asked to design or review a schema

1. List every table's primary key (and whether it's composite).
2. Run each table through the 1NF -> 2NF -> 3NF -> BCNF checklist above;
   name the specific violation and the specific fix, don't just say "looks
   normalized."
3. Confirm foreign keys exist for every cross-table reference and indexes
   exist on join/filter columns.
4. If a table is denormalized, demand or state the measured bottleneck that
   justified it; if none exists, propose the normalized alternative plus a
   materialized view for the read path instead.
