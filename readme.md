# DripFunnel Public Website

The public marketing website for DripFunnel (a Softobotics company). Next.js, fully static, SEO optimized, mobile-first. English only, with separate pages for the United States, India and the United Arab Emirates (`/us/`, `/in/`, `/ae/`).

## Run it

```bash
nvm use            # Node 22 (see .nvmrc); Node 20.9+ also works
npm install
npm run dev        # http://localhost:3000  (opens /, which links to the three countries)
npm run build      # static site in ./out
```

Copy `.env.example` to `.env.local` to set the site address and the portal address.

## Read next

- [`docs/overview.md`](docs/overview.md): requirements and decisions
- [`docs/project-structure.md`](docs/project-structure.md): folders and how countries work
- [`PLACEHOLDERS.md`](PLACEHOLDERS.md): what is not final yet
- [`AGENTS.md`](AGENTS.md): instructions for AI coding agents
