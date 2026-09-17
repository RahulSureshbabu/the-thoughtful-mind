# The Thoughtful Mind

A freely-hosted blog about psychology. Built with [Astro](https://astro.build), authored through a browser CMS ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)), auto-translated into 7 languages, and deployed on GitHub Pages.

## Stack

- **Astro** — static site generator, content collections, i18n routing
- **Sveltia CMS** at `/admin` — writer's dashboard, Portuguese (Portugal)-only authoring
- **Google Cloud Translation API** — machine-translates every post from Portuguese into en/es/fr/de/hi/ja/ar at build time (`scripts/translate.mjs`)
- **sharp** — resizes/recompresses images the writer uploads via the CMS before they're served (`scripts/optimize-images.mjs`)
- **GitHub Pages + GitHub Actions** — hosting and CI/CD
- **pytest + Playwright (Python)** — UI test suite in `tests/`

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
```

```sh
npm run build && npm run preview   # production build, served locally
```

## UI tests

```sh
py -m venv .venv
.venv\Scripts\pip install -r tests\requirements.txt
.venv\Scripts\playwright install chromium
.venv\Scripts\pytest tests\
```

The test suite starts `npm run preview` itself if nothing is already listening on port 4321 (see `tests/conftest.py`).

## One-time setup (before this is live)

Replace every `your-github-username` placeholder in `astro.config.mjs`, `src/config/site.ts`, and `public/admin/config.yml` with the real GitHub username/repo, then:

1. Create the GitHub repo `the-thoughtful-mind` (must be public for free GitHub Pages) and push this project to `main`.
2. Repo **Settings → Pages → Source = "GitHub Actions"**.
3. Register a GitHub OAuth App (**Settings → Developer settings → OAuth Apps**) for the CMS login button.
4. Deploy [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) to a free Cloudflare Workers account; wire its URL together with the OAuth App's client ID/secret per that project's README, then update `base_url` in `public/admin/config.yml`.
5. Create a Google Cloud project, enable the **Cloud Translation API**, create a restricted API key, and add it as a GitHub Actions secret named `GOOGLE_TRANSLATE_API_KEY`. Set a small billing budget alert (e.g. $1) as a safety net — Google Cloud requires billing enabled even for free-tier usage, and the blog's translation volume should stay well under the 500k-character/month free allowance.
6. Once a handful of real posts are published, sign up for Google AdSense with the live site URL. On approval, set `ADSENSE.enabled = true` in `src/config/site.ts`, fill in the real client/slot IDs, and add the `ads.txt` file AdSense provides to `public/`.

## Writing a post

Go to `/admin` on the deployed site, sign in with GitHub, and create a post — the CMS dashboard itself is in Portuguese. It stays a draft (invisible on the live site) until you untick "Rascunho" (Draft). The next push to `main` will automatically generate translated versions of any new or changed Portuguese post, and any newly uploaded image (cover image or one dropped into the body) will be resized to a max width of 1600px and recompressed before it's served. Both steps run once per image/post — a `manifest.json` alongside the uploads and a `sourceHash` in each translated post's frontmatter track what's already been processed, so nothing is redone (or re-committed) on every build.
