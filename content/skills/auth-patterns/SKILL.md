---
name: auth-patterns
description: >-
  Choose or review an authentication/authorization approach for a backend —
  the OAuth 2.0 role model, which grant type fits a given client type, when
  PKCE is mandatory, and the authorization-vs-authentication (OAuth vs.
  OIDC) distinction. Use whenever adding third-party or delegated API
  access, wiring up "login with X," picking an OAuth grant type, reviewing
  a design doc or PR that touches auth, or when a login check relies on
  "the request has a valid access token" as its only proof of identity.
---

# auth-patterns — OAuth2 role model, grant-type selection, PKCE, authn vs. authz

Grounded in RFC 6749 + PKCE (RFC 7636) as summarized by oauth.net/2.

## 1. Name the four roles before anything else

Every OAuth flow is just moving an access token from the authorization
server into the client's hands. If a design can't name these four, it
isn't ready:

- **Resource owner** — the user.
- **Client** — the app requesting access (not necessarily trusted with a secret).
- **Authorization server** — issues tokens after the resource owner approves.
- **Resource server** — validates tokens and serves the protected data.

## 2. Pick the grant type by client type — not by preference

| Client type | Grant type | Why |
|---|---|---|
| Web app with a backend that can hold a secret | Authorization Code | Default case; secret lets the client authenticate itself when exchanging the code |
| Public client — mobile, SPA, CLI (no secret storage) | Authorization Code + **PKCE** | Can't hold a secret; PKCE replaces it as the binding mechanism |
| Service-to-service, no user in the loop | Client Credentials | There's no resource owner to redirect |
| Limited-input device (TV, CLI without a browser) | Device Code | User approves on a second device |
| Any of the above needing longer sessions | Refresh Token | Extends without re-prompting the user |
| Anything new | **Never** Implicit or Resource Owner Password | Both deprecated/discouraged; OAuth 2.1 drops them |

If a design doc proposes Implicit or Password grants for a new
integration, that's a finding, not a style nit — flag it.

## 3. PKCE checklist

- Mandatory for public clients (mobile, SPA, CLI) — no exceptions.
- Good default for confidential clients too: OAuth 2.1 makes PKCE
  universal, so treat "PKCE by default on any new OAuth integration" as
  the baseline regardless of client type.
- Mechanism: client generates a `code_verifier`, derives a
  `code_challenge`, sends the challenge at the authorize step, and the
  verifier at the token-exchange step. This closes the authorization-code-
  interception attack that plain Authorization Code flow is otherwise
  exposed to.

## 4. Authorization vs. authentication — the design-review gate

OAuth 2.0 answers "what is this client allowed to access," not "who is
this user." Treat any of the following as a latent bug, not an
implementation detail:

- A login check that accepts "request carries a valid access token" as
  proof of identity, with no ID token or session behind it.
- Reusing an OAuth access token where an OIDC **ID token** is what's
  actually needed.

Fix: identity claims come from OpenID Connect (ID tokens), layered on top
of OAuth's token machinery — not from the access token itself.

## Quick review pass

When reviewing a PR or design that adds auth:

1. Can it name all four OAuth roles for this flow?
2. Does the grant type match the client type per the table above?
3. Is PKCE in place (or explicitly justified as unnecessary)?
4. Is any "logged in" check actually backed by identity (OIDC), or just
   by possession of an access token?
