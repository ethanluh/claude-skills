---
name: environment-config-management
description: >-
  Teaches strict config/code separation via environment variables (twelve-factor
  method), the "could this repo go public right now without leaking a secret"
  litmus test, and .env.example conventions for documenting required config
  without committing real values. Use whenever starting a new project, adding
  a new API key/credential/connection string, reviewing a repo before making it
  public, or when a `.env` file, secret, or config value shows up hardcoded in
  source.
---

# environment-config-management -- strict config/code separation

Source: the Twelve-Factor App "config" chapter (Heroku engineers, ~2011),
still the reference point for cloud-native config a decade-plus later.

## 1. Define config correctly

Config is "everything that is likely to vary between deploys": database and
backing-service connection strings, credentials to external APIs (AWS,
Twitter, etc.), and per-deploy values like canonical hostnames.

Internal wiring that does *not* vary between deploys (e.g. Rails routing
tables, Spring bean wiring) is **not** config -- don't over-parameterize code
structure into env vars just because it's "settings."

## 2. Run the litmus test on every project

**Could this codebase be made open source at any moment, without
compromising any credentials?**

- Yes: config is properly externalized.
- No: config/code separation has failed, full stop.

This beats generic "don't hardcode secrets" advice because it's checkable:
run `git log -p` (or `git log -p -- '*.env' '*.config.*'`) and ask whether a
real key would ever show up. Run this check before starting new work on a
repo and again before flipping any repo's visibility to public.

## 3. Store config in environment variables, not files

- Env vars are language- and OS-agnostic -- no per-language YAML/JSON/INI
  parser needed.
- Env vars are far less likely to be accidentally committed than a config
  file sitting in the repo tree. Config files beat hardcoded constants, but
  env vars beat both.
- Read config via the platform's env mechanism (`os.environ` / `process.env`
  / `std::getenv`), never by hardcoding a literal value that only differs
  per deploy.

## 4. Reject the "named environments" pattern

Don't bucket config into `development`/`staging`/`production` groups (e.g.
`.env.development`, `.env.production`). That model explodes combinatorially
as more deploys appear -- a one-off staging tier for a single developer
shouldn't require a new bucket. Instead, treat each config variable as an
independently managed, orthogonal control. This is a deliberate deviation
from what most tutorials teach -- call it out rather than following the
file-per-environment convention uncritically.

## 5. .env.example convention

- Commit `.env.example` listing every required variable name with a
  placeholder or empty value (`API_KEY=`, `DATABASE_URL=postgres://...`) --
  documents what's needed to run the project without exposing real values.
- Gitignore the real `.env` (verify `.gitignore` actually has the entry --
  don't assume).
- Never commit a `.env` file, even temporarily "to test." If one was ever
  committed, the secret must be rotated -- removing the file from HEAD
  doesn't remove it from git history.

## 6. Secret storage at rest is a separate concern

This methodology only mandates config-out-of-code; it doesn't prescribe
Vault, a cloud secret manager, or platform secret CLIs (e.g. `fly secrets
set`) for storage at rest. Layer that tooling on top once the separation
itself is correct -- don't skip step 2's litmus test just because a secret
manager is in place upstream.
