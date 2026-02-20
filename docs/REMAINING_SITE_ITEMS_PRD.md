# PRD: Remaining Site-Related Items

**Scope:** Code and config changes on the kiln-portfolio site only. No manual or off-site tasks (e.g. email design, Listmonk form styling).

---

## 1. Configurable Substack URL

**Current state:** System page uses a hardcoded link `https://yourname.substack.com` for the Substack card (`src/app/system/page.tsx`).

**Requirement:**

- Substack link is driven by environment, not hardcoded.
- Add **`NEXT_PUBLIC_SUBSTACK_URL`** (e.g. `https://hankcj.substack.com`). When set, the System page Substack card uses this URL. When unset, either hide the card or keep a fallback/placeholder and document the env in `.env.local.example`.
- Document the variable in `.env.local.example`.

**Acceptance:** Changing the env and redeploying updates the Substack link with no code change.

---

## 2. (Optional) Embedded Subscribe Form

**Current state:** “Subscribe by email” is a link to Listmonk’s public form (`NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL`). Placement and behavior are correct.

**Optional requirement:**

- Provide an optional **in-site** subscription form (e.g. email + optional name) that submits to Listmonk’s public subscription API (or a Next.js API route that proxies to it), with list IDs and double-opt-in behavior as required by Listmonk.
- Form appears only when the relevant env (e.g. `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` or a new var for “use embedded form”) is set. Include basic success/error and loading state.
- Do not remove or alter the existing link-based flow; the embedded form is an alternative when enabled.

**Acceptance:** When enabled, users can subscribe from the site without leaving for Listmonk; existing link-based subscription still works when the embedded form is not used.

---

## 3. Env and Docs

- **`.env.local.example`:** Add `NEXT_PUBLIC_SUBSTACK_URL` (and, if the embedded form is implemented, any new vars) with short comments.
- **Docs:** In `docs/LISTMONK_SETUP.md` (or equivalent), note the new Substack env and, if applicable, that an optional embedded form exists and which env enables it.

---

## Out of scope (not in this PRD)

- Email or form design in Listmonk.
- Substack dashboard setup or RSS connection.
- listmonk-rss, Ghost, or other off-site configuration.
- Broader portfolio features (e.g. Stripe, intake) unless you explicitly add them to “remaining site items.”

---

**Summary:** One required item (configurable Substack URL), one optional (embedded subscribe form), plus env and doc updates. All site-related only.
