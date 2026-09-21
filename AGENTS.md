# sibukixxx.github.io

Astro personal/public site with content collections.

## Commands
- `pnpm dev`
- `pnpm build`
- `pnpm preview`

## Shared rules
- Use pnpm as indicated by the lockfile.
- Keep content-collection schemas and frontmatter synchronized; do not bypass Astro content validation.
- Public posts/case studies must distinguish personal opinion, dated observations, and verifiable claims.
- Generated search/build output is not hand-edited source unless the repository explicitly tracks it as generated artifact.

## Change-dependent checks
- Content/routes/components: `pnpm build`.
- Content schema/frontmatter: build representative/all content collections.
- Deployment config: validate build output locally before any publish action.

## Done
- Production build passes.
- New content validates against its collection schema.
- Publish/deploy actions occur only when explicitly requested.
