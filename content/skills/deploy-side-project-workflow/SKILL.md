---
name: deploy-side-project-workflow
description: >-
  Deploy a side project end-to-end -- write a multi-stage Dockerfile with
  proper cache ordering, externalize all config/secrets per twelve-factor,
  then launch/deploy via a PaaS (Fly.io as current example) with secrets set
  via the platform rather than committed to the repo. Use whenever Ethan is
  taking a project from "runs on my machine" to "has a live URL," asks how to
  deploy/ship/launch a side project, or needs to wire a Dockerfile and a cloud
  platform together for the first time.
---

# deploy-side-project-workflow -- ship a side project to a live URL

The durable spine of this workflow is twelve-factor config/secrets
separation; the Dockerfile and the PaaS are swappable, churny details --
Fly.io stands in for whatever platform is current when you read this. For
the full mechanics behind each stage, load the sibling skills by name:
**containerization-fundamentals** (Docker layer caching, multi-stage builds)
and **environment-config-management** (twelve-factor config, the
open-source litmus test, `.env.example`).

## 1. Containerize: write a Dockerfile with correct cache ordering

- Copy dependency manifests first (`package.json`/`requirements.txt`/etc.),
  run the install step, *then* `COPY . .` for the rest of the source. Every
  Dockerfile instruction is a layer, and reversing this order invalidates
  the cached install on every source change -- the single most expensive
  mistake to retrofit once it's muscle memory.
- Use a multi-stage build: one stage with the full build toolchain
  (compiler, dev dependencies) producing artifacts, a second lean runtime
  stage that copies only the compiled output. The toolchain and source
  never ship to production.
- Full technique and worked examples: load `containerization-fundamentals`.

## 2. Externalize all config and secrets

- Before writing any deploy config, run the litmus test: could this repo go
  public right now without leaking a credential? If no, config/code
  separation isn't done yet -- fix it before proceeding.
- Move every value that varies between deploys (DB URLs, API keys,
  hostnames) into environment variables, read via the platform's env
  mechanism, never hardcoded. Don't bucket into `.env.development` /
  `.env.production` -- treat each variable as independently managed.
- Commit `.env.example` with variable names and placeholders; gitignore the
  real `.env`; never commit a real secret, even temporarily.
- Full method: load `environment-config-management`.

## 3. Bootstrap platform config without deploying yet

Current example: Fly.io.

- `fly launch --no-deploy` inspects the project and generates `fly.toml`
  (app name, build/service settings) without shipping anything live.
  Review and commit `fly.toml` before the first real deploy.
- Image resolution priority: `--image` flag / `[build]` in `fly.toml` >
  buildpack > `--dockerfile` flag > a `Dockerfile` found in the working
  directory. A project with a working Dockerfile from step 1 gets picked
  up automatically -- no platform-specific rewrite needed.

## 4. Set secrets through the platform, never through the image

- `fly secrets set KEY=value` -- this is twelve-factor's "config in the
  environment" enforced by the platform itself. Never bake a secret into
  the Dockerfile or `fly.toml`.
- Setting a secret triggers an automatic redeploy so the running instance
  picks up the new value -- expect a redeploy, don't fight it.

## 5. Deploy and iterate

- `fly deploy` builds from the Dockerfile and ships it. Default deploy
  strategy is rolling, which is sufficient for a solo project; canary and
  blue-green exist once uptime starts mattering (real users).
- The platform smoke-checks new instances for a short window after launch
  and halts the rollout on repeated crashes -- a basic safety net, not a
  substitute for your own health checks.
- If the project needs persistent storage, note the constraint up front:
  volume mounts can't be changed via a redeploy, only their mount points in
  config.
- Repeat `fly deploy` for every subsequent release; wire it into CI (a
  `flyctl deploy` step on merge to main) once manual deploys feel routine.

## 6. Definition of done

- `docker build` succeeds locally and produces a lean final image (no dev
  toolchain in the runtime stage).
- The litmus test in step 2 passes: repo could go public with zero leaked
  credentials.
- `fly.toml` is committed; secrets are set via `fly secrets set`, not
  present anywhere in the repo or image.
- The app is reachable at its live URL after `fly deploy`.
