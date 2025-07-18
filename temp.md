## git

Let me explain the common conventional commit message types. This is based on the Conventional Commits specification, which is widely used in many projects:

1. `feat:` - New features
   - Example: `feat: add user authentication system`

2. `fix:` - Bug fixes
   - Example: `fix: resolve login page crash`

3. `docs:` - Documentation changes
   - Example: `docs: update API documentation`

4. `style:` - Code style changes (formatting, semicolons, etc) that don't affect code logic
   - Example: `style: format using prettier`

5. `refactor:` - Code changes that neither fix a bug nor add a feature
   - Example: `refactor: restructure user service`

6. `perf:` - Performance improvements
   - Example: `perf: optimize image loading`

7. `test:` - Adding or modifying tests
   - Example: `test: add unit tests for user registration`

8. `chore:` - Changes to build process, tools, libraries, etc
   - Example: `chore: update dependencies`

9. `ci:` - Changes to CI configuration files and scripts
   - Example: `ci: add GitHub Actions workflow`

10. `revert:` - Reverting a previous commit
    - Example: `revert: feat: user authentication system`

Additional conventions:

- You can add a scope in parentheses: `feat(auth): add login page`
- Add a `!` for breaking changes: `feat!: change API response format`
- The commit message should be in present tense
- You can add more details in the commit body after the first line

Example of a complete commit message:

```tsx
feat(auth): add OAuth2 login support

- Implement Google OAuth2 flow
- Add user profile sync
- Update login UI to show OAuth options

BREAKING CHANGE: Previous login tokens are incompatible
```

These conventions help in:

- Automated changelog generation
- Determining semantic version bumps automatically
- Making the commit history more readable and structured
- Making it easier to find specific types of changes

## css

auto grid

```css
.products-page-grid {
  --grid-max-col-count: 3;
  --grid-min-col-size: 200px;
  --grid-gap: 1rem;

  /* calculations, do not touch */
  --grid-col-size-calc: calc(
    (100% - var(--grid-gap) * var(--grid-max-col-count)) /
      var(--grid-max-col-count)
  );
  --grid-col-min-size-calc: min(
    100%,
    max(var(--grid-min-col-size), var(--grid-col-size-calc))
  );

  display: grid;
  gap: var(--grid-gap);

  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--grid-col-min-size-calc), 1fr)
  );
}
```

stacking contents using grid

```css
.stacked {
  display: grid;
  place-items: center;
  isolation: isolate;
}



.stacked > * {
  grid-column: 1/-1;
  grid-row: 1/-1;
}



.stacked > .media {
  z-index: -1;
}
```

gradient underline

```css
.gradient-underline {
  --gradient-color-one: #215dee;
  --gradient-color-two: #b61cff;

  display: inline;
  background: linear-gradient(
      to right,
      #fd3d67 0%,
      #f59740 33.33%,
      #ad64f6 66.67%,
      #ff3b70 100%
    )
    no-repeat;
  background-size: 0 2px;
  background-position: 0 98%;
  transition: background-size 0.5s cubic-bezier(0.2, 0.63, 0.36, 1);

  &:hover {
    background-size: 100% 2px;
  }
}
```

## npm

version numbers in npm :
`majorUpdates.minorUpdatesWithBackwardSupport.bugFixesVersion`

like `1.5.11` means:

1.  it is at version 1
2.  version 1 has 5 minor releases that doesn't break other version like `1.4` `1.3` simply adds some features
3.  `11` is the number of bugs that developer found and fixed.

```tsx
npm outdated
npm i
npm i --save-dev
npm i @version            npm i slugify@1.0.0
npm uninstall
```

### npm update:

this is the default :
`"slugify": "^1.0.0"`
if we update now it will update to the latest version
we can change the `^` to `~` to only accept minor and patch releases it is safer.

## next js

### how to create a proxy next js 15

There is some un relevant code here, ignore those. we can proxy requests using rewrites.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

    return [
      {
        source: "/proxy-web",
        // example with production and dev mode
        destination:
          process.env.NODE_ENV === "production"
            ? "https://gira.ai"
            : "https://gira.ai",
      },
      {
        // fetch("/backend-api/test") => fetch("https://gira.ai/test")
        source: "/backend-api/:path*",
        destination: "https://gira.ai/:path*",
      },
    ];
  },
};

export default nextConfig;
```
