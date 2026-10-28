# Website starter

A responsive portfolio built with **HTML, CSS, and plain JavaScript**, with Vite
for development and production builds. The example includes three sample projects,
mobile navigation, a persistent light/dark theme, and keyboard-friendly controls.
No framework, backend, account, or environment configuration is required.

## Prerequisites

- Install **Node.js 24 LTS** from [nodejs.org](https://nodejs.org/en/download).
  npm comes with the standard installer. Restart your terminal after installation.
- Install Git if you want to clone the repository.
- Use a modern browser and your preferred editor.

Check your installation in PowerShell (or another terminal):

```powershell
node --version
npm --version
```

`.nvmrc` selects Node 24 for version managers; it does not install Node by itself.
The committed `package-lock.json` records exact dependencies. Node runs the tools;
the shipped website runs in the browser.

## Create your own project

On GitHub, select **Use this template → Create a new repository**, choose your
repository name and visibility, then clone the new repository:

```powershell
git clone https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173`.
Edit a source file and Vite updates the browser. Stop the server with `Ctrl+C`.
Run commands from the repository directory. To explore the original example,
clone `https://github.com/SagarsGitHub/starter-website.git` instead (access required).

On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` and `npx.cmd` in place
of `npm` and `npx`; changing your execution policy is unnecessary.

## Commands

| Command                | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `npm ci`               | Install exactly the locked dependencies on a clean checkout |
| `npm run dev`          | Start the development server                                |
| `npm run lint`         | Check JavaScript for common mistakes using ESLint           |
| `npm run format`       | Format source and documentation with Prettier               |
| `npm run format:check` | Check formatting without changing files                     |
| `npm run build`        | Generate the production website in `dist/`                  |
| `npm run preview`      | Serve an existing production build locally                  |
| `npm test`             | Run Chromium behavior tests against an existing build       |
| `npm run check`        | Lint, check formatting, build, and test                     |

Before running browser tests for the first time:

```powershell
npx playwright install chromium
npm run check
```

On Linux, `npx playwright install --with-deps chromium` also installs required
system packages and may ask for administrator privileges. CI runs these checks
on Windows and Linux with Node 24. Browser coverage is Chromium; Firefox, Safari,
and macOS are not part of the configured test matrix.

## How the website works

1. **HTML describes the content.** `index.html` contains headings, navigation,
   project articles, and links. Semantic elements give the browser and assistive
   technology meaning. The page remains readable and navigable without JavaScript.
2. **CSS controls presentation.** `src/style.css` contains color variables, spacing,
   typography, Flexbox, Grid, and media queries. The project grid becomes a single
   column on small screens. Decorative artwork is made with CSS, with no external
   fonts or image requests.
3. **JavaScript adds behavior.** `src/main.js` listens for clicks, keyboard input,
   and media-query changes. It updates HTML attributes for the menu and theme.
   Theme choice is stored locally; blocked storage still allows theme switching.
4. **Vite handles development and packaging.** It serves ES modules while you
   work and bundles assets for production. `vite.config.js` uses relative build
   paths so the output can also be hosted in a subdirectory.
5. **Playwright checks the actual browser.** Tests cover navigation, keyboard
   interaction, theme persistence, blocked storage, no-JavaScript behavior,
   resizing, and narrow layouts.

The theme initially follows the operating system. Selecting the “Dark theme”
toggle overrides it; its pressed state means dark mode is active. Clear the
`theme` key in browser storage to follow the system again. Mobile navigation
closes on link selection or Escape and resets when switching screen sizes.

Use browser developer tools to inspect HTML, adjust CSS, view console errors,
simulate screen widths, and inspect the `theme` key in local storage.

## Project layout

```text
index.html                 Page content and metadata
src/main.js                Theme and mobile navigation
src/style.css              Design tokens, layout, and responsive styles
public/favicon.svg         Static icon copied into the build
tests/website.spec.js       Browser behavior tests
vite.config.js             Production asset-path configuration
playwright.config.js       Browser and preview-server configuration
eslint.config.js           JavaScript lint configuration
.github/                   CI and monthly dependency update checks
```

Generated dependencies, production output, and test reports are ignored by Git.
An `.env.example` is unnecessary because the example has no configuration secrets.
Anything delivered to a browser is public to its visitors; never put credentials
in frontend code.

## Learning exercises

Try these individually and inspect the result before continuing:

1. Replace the name, biography, and three project descriptions in HTML.
2. Change the CSS color variables and compare both themes.
3. Add a fourth project and observe how Grid handles it.
4. Adjust the mobile breakpoint, then resize the browser and inspect the menu.
5. Add a skill badge and a new section with an anchor link.
6. Add a project filter using buttons, DOM selection, and the `hidden` attribute.
7. Add a meaningful browser test for the filter you created.

Further learning: [MDN frontend fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core),
[Vite guide](https://vite.dev/guide/), and [Playwright documentation](https://playwright.dev/docs/intro).

## Customize the template

- [ ] Rename `package.json`'s `name` using `npm pkg set name="your-project"`,
      then run `npm install` to update the lockfile.
- [ ] Replace the example identity, project content, contact email, title,
      description, favicon, and footer in `index.html` and `public/`.
- [ ] Adjust CSS variables and replace the decorative art if needed.
- [ ] Update tests for your content and behavior; run `npm run check`.
- [ ] Replace this README with your project's instructions.
- [ ] Choose a project license before distributing your work; this starter
      does not select one for you.

## Build and hosting

```powershell
npm run build
npm run preview
```

The preview server is for local verification. A static hosting service can serve
the entire `dist/` directory; its build command is `npm run build` and output
directory is `dist`. Deployment integration is intentionally left for your new
project. Opening source HTML through `file://` does not replace the Vite server.

The email link opens the visitor's email application. Sample project cards are
descriptive examples, not links to real projects. No form submits data.
