# Security

This is a personal/research template repo with no formal disclosure process.
For a security issue in a project derived from this template, open a private
GitHub security advisory or contact the maintainer directly rather than
filing a public issue.

## Notes for derived web app projects

- Never commit secrets (API keys, tokens, `.env*` files) — use environment
  variables and a secrets manager appropriate to your deploy target.
- Keep `next`, `react`, and other dependencies patched; run `npm audit`
  periodically.
- Set standard security headers (CSP, `X-Frame-Options`, etc.) once the app
  has real routes and a deploy target.
