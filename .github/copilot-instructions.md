# Copilot Working Agreement for This Repository

This file defines non-optional behavior for AI-assisted edits in this repo.

## 1) Scope Lock Before Editing

For each request, establish:

- Target scope in one line (example: Home page only).
- Non-goals in one line (example: Do not modify case-study layout).

If scope is ambiguous or contradictory, ask one clarifying question before editing.

## 2) Small-Patch Discipline

- Fix one issue per patch.
- Do not bundle opportunistic styling or refactors.
- Avoid touching unrelated files.

## 3) Verification Gate (Required)

For code changes, complete all checks before reporting done:

- Build: run npm run build.
- Static checks: verify no new errors in changed files.
- UI checks: verify behavior at desktop and mobile widths.

If a tool cannot visually confirm state (for example blank screenshots), use DOM/computed-style checks and explicitly report the limitation.

## 4) Route and Navigation Gate

If nav, links, or active states are changed:

- Verify destination URLs on all affected routes.
- Verify active-pill/active-section behavior on all affected routes.
- Explicitly test both / and /case-studies/mint-condition when relevant.

## 5) Regression Policy

If a new bug appears after a patch:

- Revert only the last patch/hunk that introduced the regression.
- Re-apply a narrower fix.
- Do not proceed with additional changes until regression is resolved.

## 6) Output Quality Standard

Final response must include exactly these three sections:

- What changed
- What was verified
- What remains unverified

Never claim verification that was not actually performed.

## 7) Repo-Specific Guardrails

- Preserve the existing visual language unless explicitly asked to redesign.
- Keep section width behavior consistent with surrounding sections on the same page.
- Prefer surgical className edits over structural rewrites unless structure change is required.
