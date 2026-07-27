---
name: property-based-testing
description: >-
  Property-based testing — invariant-style tests (round-trip, idempotence,
  commutativity) with a generator/shrinker (Hypothesis) finding and
  minimizing counterexamples, instead of hand-enumerating cases. PLUS an
  absorbed "fuzzing" mode: isolate a deterministic, side-effect-free fuzz
  target and drive it with a coverage-guided fuzzer (libFuzzer) seeded from
  a small valid/invalid corpus. Use whenever Ethan asks to property-test a
  function, write Hypothesis tests, fuzz a parser or C/C++ function, "find
  edge cases automatically", or add libFuzzer/AFL-style testing to a
  project. Two modes, same mechanism: generate inputs, keep what breaks or
  explores new ground, shrink/minimize the failure.
---

# property-based-testing — invariants + generators, plus fuzzing

Both modes below share one mechanism: a generator produces inputs, a
checker decides which ones matter (failed a property, or hit new
coverage), and a shrinker reduces any hit to a minimal reproducer.
Property-based testing (Hypothesis) is the language-level, property-driven
form; fuzzing (libFuzzer) is the coverage-guided, corpus-seeded form of the
same idea aimed at lower-level/unsafe code. Pick the mode by what's under
test, not by habit.

## Mode 1 - Property-based testing (Hypothesis, Python)

Use for: pure-ish Python functions where an invariant is checkable in
code (parsers, serializers, data structures, algorithms with a
mathematical property).

1. Find the property first - this is the hard part, not the API. Don't
   start from "what input should I generate"; start from "what must
   always be true of the output, regardless of input." Common shapes:
   - Round-trip: `decode(encode(x)) == x`
   - Idempotence: `f(f(x)) == f(x)`
   - Commutativity / invariance: `f(a, b) == f(b, a)`, `sorted(f(x)) == sorted(x)`
   - Oracle comparison: `my_impl(x) == reference_impl(x)`
   - Metamorphic: a known input transform implies a known output
     transform (e.g. `f(x + [y])` contains everything `f(x)` does).
   If no property comes to mind, this function is probably a poor fit -
   fall back to example-based tests instead of forcing one.
2. Describe the input domain with a strategy, not literal examples:
   `st.integers()`, `st.lists(st.text())`, composable combinators
   (`st.one_of`, `.map`, `.filter`, `@st.composite` for structured
   objects). Prefer the narrowest strategy that actually covers the
   domain - overly broad strategies waste shrinking time on irrelevant
   cases.
3. Write the test as `@given(strategy) def test_x(...): assert property`.
   Treat it as additive to existing example-based unit tests, not a
   replacement - property tests catch edge cases, example tests pin down
   specific known-important cases and document behavior.
4. When a property fails, Hypothesis reports the shrunk minimal example
   (e.g. `[0, 0]`, not a 200-item list). Don't just make the test pass -
   turn the shrunk failure into a permanent example-based regression
   test, then fix the bug it exposed.
5. Re-run enough examples to trust the result (Hypothesis's default
   budget is usually fine); don't loosen the strategy just to stop a
   failure from reproducing.

## Mode 2 - Fuzzing (libFuzzer, C/C++ or other native code)

Use for: parsers, deserializers, or any function taking untrusted bytes
where memory safety or crash-freedom is the property, not a return value.

1. Isolate a fuzz target - this is the actual engineering work, not
   running the fuzzer. Write `LLVMFuzzerTestOneInput(const uint8_t *Data,
   size_t Size)` that:
   - handles arbitrary byte input without crashing on valid-but-weird data
   - never exits the process (no `exit()`/`abort()` on bad input)
   - doesn't mutate global/static state across calls
   - runs fast and deterministically (same bytes in, same behavior out,
     every time)
   If the real function doesn't meet these, wrap it or extract the
   parsing core rather than fuzzing the whole program.
2. Seed a small corpus - a handful of valid and malformed example inputs
   (a few well-formed files, a few deliberately broken ones), not an
   empty directory. This gives the mutator a useful starting point; an
   empty corpus means it explores blind for far longer.
3. Compile with `-fsanitize=fuzzer`, and add `-fsanitize=address` /
   `-fsanitize=undefined` when hunting memory or UB bugs specifically -
   libFuzzer alone only catches crashes and hangs, not silent memory
   corruption.
4. Run the binary against the corpus directory and let it search.
   Coverage guidance (SanitizerCoverage under the hood) means every
   mutation that reaches previously-unseen code gets kept - the search
   concentrates on unexplored branches instead of re-testing what's
   already covered.
5. Any crash is saved as a minimized, reproducible artifact file - treat
   it like a shrunk Hypothesis example: turn it into a permanent
   regression test/corpus entry before considering the bug fixed.
6. Note libFuzzer itself is in maintenance mode (successor: Centipede) -
   the concepts here (fuzz target contract, coverage guidance, seed
   corpus) transfer to any modern coverage-guided fuzzer if the tool
   changes later.

## Choosing between modes

- Testing a property of a Python function/data structure - Mode 1.
- Testing crash-freedom/memory-safety of C/C++ (or similarly unsafe)
  code on untrusted input - Mode 2.
- Both apply to the same project? Use Mode 1 for the business-logic
  layer and Mode 2 for any native parsing/deserialization boundary.
