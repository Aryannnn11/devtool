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
