# BornCreative.ai

This repository hosts the static files that power the BornCreative.ai marketing site. The `index.html` file and its supporting assets now live in the repository root so that GitHub Pages can serve them directly.

## Local development

The design system and Tailwind source files are still available inside [`borncreative.ai-main/`](borncreative.ai-main/). You can install dependencies and rebuild the compiled CSS from there:

```bash
cd borncreative.ai-main
npm install
npm run build
```

The build step outputs `assets/tailwind.css`, which is consumed by the static site at the repository root.

## Deploying to GitHub Pages

1. Push the `main` branch (or the branch configured for Pages) to GitHub.
2. Ensure the Pages source is set to the root of the repository in the repository settings.
3. GitHub Pages will serve `index.html` along with everything in `assets/`.

A `CNAME` file is committed so the site continues to resolve for the custom domain.
