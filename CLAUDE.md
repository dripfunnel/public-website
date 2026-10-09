@AGENTS.md

# DripFunnel Public Website: notes for Claude

- The website is being built (Next.js, static). See "Current phase" in AGENTS.md and [docs/project-structure.md](docs/project-structure.md).
- **One language only (English).** Countries are `us`, `in`, `ae`, each with its own page components and data file. No i18n.
- When the owner explains a requirement, update or create the matching file in `docs/`, then reply with a short summary of what changed and the questions that are still open.
- **Always update the docs** whenever a feature or the design changes (see "Keep the documents up to date" in AGENTS.md), and list the updated docs in the reply.
- Ask the owner when something is unclear. They have asked to be asked.
- The owner is not writing code, so keep explanations in plain, non-technical language.
- Never overwrite `design/DripFunnel Website v2.dc.html`. It is the reference copy.
- The original copy of the design files also exists outside the repo in `C:\Users\mamat\Downloads\DF Platform Prototype setup (1)`. Do not modify or delete anything there unless asked.
