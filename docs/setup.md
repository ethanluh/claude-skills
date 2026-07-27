# Setup

1. Clone the repo:
   ```
   git clone <repo-url>
   cd <repo-name>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the dev server:
   ```
   npm run dev
   ```
4. Run the test suite:
   ```
   npm run test
   ```
5. To pull in current skill content from a local BigBrain checkout:
   ```
   npm run sync:skills
   npm run build:manifest
   ```

## Automated BigBrain sync

`.github/workflows/sync-skills.yml` runs the same sync weekly (and on manual
dispatch), checking out the private `ethanluh/BigBrain` repo and opening a PR
with any resulting changes to `content/skills/` and `content/skills.json`.

It needs a repo secret **`BIGBRAIN_SYNC_TOKEN`**: a fine-grained GitHub PAT
scoped only to the `BigBrain` repo with read-only `Contents` access. Add it
under Settings → Secrets and variables → Actions.
