# Dependabot + Devin review/auto-merge (pilot)

This repository uses GitHub Dependabot to create dependency update PRs. The
pilot workflow sends **only strictly verified semver patch PRs** to Devin after
the **PR Validation / Astro build** check succeeds. Devin investigates the PR,
posts an evidence-based review comment, and may request auto-merge only when
GitHub branch protection enforces required checks.

## Before enabling (required manual configuration)

1. Connect the repository `sibukixxx/sibukixxx.github.io` to Devin (GitHub
   integration) and provision a dedicated Devin service-user token with
   **minimum required permissions**. Never place the key in source control.
2. In GitHub repository Settings > Secrets and variables > Actions, create:
   - Secret: `DEVIN_API_KEY` (Devin API v3 service-user token).
   - Variable: `DEVIN_ORG_ID` (your Devin organization ID).
3. In GitHub Settings > Branches / Rulesets, protect `master`. Require the
   `Astro build` check from the `PR Validation` workflow for PR merges. Do
   not allow administrators or bots to bypass these required checks for
   automated dependency updates.
4. In repository Settings > General > Pull Requests, enable **Allow auto-merge**.
   This repository had auto-merge disabled when the pilot was prepared.
5. Ensure Devin has access only to this repository and can use the GitHub
   integration to comment and request auto-merge. Review the service-user
   permission scope and any Devin spending limits.

With secrets absent, the dispatcher skips safely. The GitHub connector used to
prepare this pilot cannot configure repository secrets, branch rules or
Devin-side integrations on your behalf.

## Execution and boundaries

- `PR Validation` runs `pnpm install --frozen-lockfile` and `pnpm build` on
  every PR to `master`, using a read-only token and **no third-party secrets**.
- A successful PR Validation `workflow_run` on the default branch triggers the
  Devin dispatcher. GitHub may omit the PR association from the event in some
  situations: that case is deliberately skipped, not guessed.
- Before sending a Devin request, the dispatcher checks the PR author is
  `dependabot[bot]`, the PR is open and not draft, the target is `master`,
  the source is the same repository, the head SHA matches the verified run,
  the changed files are only `package.json` and/or `pnpm-lock.yaml`,
  and the title describes a single strictly increasing semver patch.
- Major, minor, pre-release, grouped, GitHub Actions, workflow edits, or other
  non-allowlisted updates stay for manual review. Their omission from automatic
  review is intentional in this initial pilot.
- Devin is explicitly prohibited from modifying code or creating new PRs in
  this flow. It must inspect the changelog, lockfile, security information,
  compatibility and GitHub checks; post a review comment; and HOLD if uncertain.
- The Devin prompt permits requesting GitHub auto-merge only when protected
  branch requirements are enforced and every check is green. **The prompt
  itself is not a security boundary**; GitHub rules must enforce the gate.
- `pnpm build` is a smoke test, not a guarantee of functional compatibility.
  Add browser/E2E checks and dependency-specific tests before raising the
  automatic acceptance scope.

## Initial verification checklist

- [ ] PR Validation succeeds on a Dependabot patch PR.
- [ ] The dispatcher runs and records a valid Devin session.
- [ ] Devin posts a comment identifying the verified exact head SHA and risks.
- [ ] A failing build remains unmerged.
- [ ] A non-patch or changed-file PR remains unmerged.
- [ ] A green patch PR can be queued for auto-merge without bypassing checks.
- [ ] No unexpected merge occurs if Devin/API is unavailable.
- [ ] Devin spending and GitHub audit logs are inspected.

## Expansion to other repositories

Do **not** copy this workflow unchanged to other repositories:
the default branch, package manager, lockfiles, test commands, CI check names,
allowlisted files and policy enforcement must be adapted per repository.
Devin is a third party: confirm access to private repositories and data-handling
terms before connecting business/customer code.

References:
- https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/automate-dependabot-with-actions
- https://docs.devin.ai/api-reference/authentication
