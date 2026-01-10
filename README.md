```markdown
Trending Amazon Picks — quick notes

Where to replace links:
- All product objects are stored in `assets/script.js` in the PRODUCTS array.
- Each product has a `link` field currently set to placeholders like `{{LINK_HOME_1}}`.
- Replace those placeholders with your real amzn.to affiliate URLs.

Files added/updated:
- index.html — single static entry page
- assets/styles.css — styling (dark theme, responsive)
- assets/script.js — data + rendering + UI (filters, search, sort)

How to edit:
1. Clone your repo and checkout `gh-pages` (or the branch you're using for Pages).
2. Update `assets/script.js` PRODUCT entries, swapping placeholder `link` values with real affiliate links.
3. Commit & push — GitHub Pages will publish the changes automatically.

Notes:
- This is plain HTML/CSS/vanilla JS — no build step required.
- Use the `imageUrl` fields to point to real product images later.
- All Amazon links include `rel="nofollow sponsored noopener"` and `target="_blank"` to follow affiliate best practices.
```
