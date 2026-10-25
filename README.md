# DevTool

A Node.js command-line toolkit for developer productivity. Manage local notes, inspect files, format and validate JSON, look up GitHub repositories, and generate UUIDs.

## Requirements

- Node.js 20 or newer
- npm

## Install from GitHub (before npm publication)

```bash
git clone https://github.com/Aryannnn11/devtool.git
cd devtool
npm ci
node bin/devtool.js --help
```

You can also link the command locally:

```bash
npm link
devtool --help
```

## After publication to npm

Once the owner publishes the package named `aryan-devtool-cli`:

```bash
npx aryan-devtool-cli --help
npx aryan-devtool-cli uuid
```

Or install globally with `npm install -g aryan-devtool-cli` and run `devtool --help`.

## Commands

```bash
devtool --help
devtool uuid
devtool github Aryannnn11/devtool
devtool note add "Fix the README"
devtool note list
devtool note remove <note-id>
devtool json validate ./data.json
devtool json format ./data.json
devtool file ./data.json
```

Commands that inspect or modify files operate on the computer where DevTool is run. Notes are stored locally.

## Browser terminal playground

A standalone interactive demo lives in [`demo/`](./demo). It includes a terminal-like interface for UUID generation, public GitHub repository information, browser-local notes, and JSON/file operations on bundled examples.

It is a **safe simulation**, not a remote shell. Browser users cannot access your computer's files. The full CLI remains available through npm:

```bash
npx aryan-devtool-cli --help
```

### Publish the demo on Vercel

1. Import this GitHub repository into a **new** Vercel project.
2. Set **Root Directory** to `demo`.
3. Set **Framework Preset** to `Other` (plain HTML/CSS/JavaScript).
4. Disable the build command and set **Output Directory** to `.` (the project root).
5. Deploy. No environment variables are required.

The Vercel site will serve `demo/index.html`; its relative CSS and JavaScript paths work under the same root.

## Development

```bash
npm ci
npm test
node bin/devtool.js --help
npm pack --dry-run
```

## Publishing (maintainer)

The npm name must be available and npm login/2FA must be configured before publishing:

```bash
npm view aryan-devtool-cli version
npm login
npm ci
npm test
npm pack --dry-run
npm publish
```

If `npm view` returns a 404, the name may be available; npm will still validate ownership at publication. Do not publish until tests and package contents have been reviewed.

## Tech stack

Node.js, JavaScript, Commander.js, Axios, Chalk, Vitest, Node.js filesystem and crypto APIs.

## Source

https://github.com/Aryannnn11/devtool

## License

MIT
