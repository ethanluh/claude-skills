---
name: pr-screenshot
description: Capture a PR screenshot from the current repo's local dev server using the Browser pane, then upload it to that repo's screenshot-release tag and return ready-to-embed markdown. Use whenever a PR needs a UI screenshot.
---

# Capturing a PR screenshot

Repo-agnostic: works from whatever repo the current session is in.

1. **Start (or confirm) the local dev server.** Check the project's dev
   command and port:
   - Look for a per-repo skill or `.claude/launch.json` entry that already
     documents how to launch the app — prefer that over guessing.
   - Otherwise check `package.json` scripts and the framework config (e.g.
     `vite.config.ts`'s `server.port`) for the dev command and port.
   - Start it in the background if it's not already running, and wait for it
     to come up before navigating.

2. **Use the Browser pane** (`mcp__Claude_Browser__*` tools) rather than
   Claude in Chrome, since this is the in-app browser surface and these
   tools aren't deferred:
   - `preview_start` with `{name}` for the repo's dev server (from
     `.claude/launch.json`, per step 1) — reuses the server if already
     running — or `{url}` if you're pointing at something already hosted.
     Then `navigate` to the relevant route (ask the user for the route if
     it's not obvious from the diff).
   - `resize_window` first only if a specific viewport matters — otherwise
     use the current window size. One screenshot per invocation, no
     multi-viewport sweep.
   - `computer` with `action: "screenshot"` to capture the page. This is the
     intended capture mechanism for this skill — no gif/video tooling.

3. **Save the screenshot** to the scratchpad directory with a descriptive
   name, e.g. `pr-screenshot-<short-desc>.png`.

4. **Upload it to the repo's screenshot-release tag.** Check the repo's own
   PR/contributing docs (e.g. its `open-pr`-style skill, `CLAUDE.md`, or
   `CONTRIBUTING.md`) for the exact tag name and upload convention already
   in use there — don't invent a new one. If none exists, ask the user
   rather than guessing a tag name. The general shape is:

   ```bash
   gh release upload <screenshot-tag> <path> --repo <owner>/<repo>
   ```

   (`gh repo view --json nameWithOwner` gives `<owner>/<repo>` for the
   current directory.) This publishes content, so confirm with the user
   before running it unless they've already approved this specific upload
   in the current turn.

5. **Return the embed markdown**, using that repo's stable release download
   URL convention, so it can be pasted directly into the PR body:

   ```markdown
   ![<caption>](https://github.com/<owner>/<repo>/releases/download/<screenshot-tag>/<file>.png)
   ```
