```
npm install
gulp
```

## Naming conventions

File names **should not** contain prefixes or suffixes. Files should be grouped by directories to organize content.

## Directory structure

Content should be developed as discrete modules. All project code should live within the `src` directory which will be built and placed in the `build` directory during development and `dist` for distribution.

```
.
| # source files
+-- src
    |
    | # core content helpers
    +-- core
    |   |
    |   | # colors used in content
    |   +-- colors.styl
    |   |
    |   | # fonts used in content
    |   +-- fonts
    |   |   |
    |   |   | # fonts used in content for local testing
    |   |   +-- internal.styl
    |   |   |
    |   |   | # fonts used in content for final server
    |   |   +-- server.styl
    |   |
    |   | # index of core styles
    |   +-- index.styl
    |   |
    |   | # mixins used in content
    |   +-- mixins.styl
    |   |
    |   | # overrides used to adjust Demandware features
    |   +-- overrides.styl
    |   |
    |   | # scaffolding classes used in content
    |   +-- scaffolding.styl
    |   |
    |   | # variables used in content
    |   +-- variables.styl
    |
    | # homepage content
    +-- homepage
        |
        | # main-area asset content
        +-- main-area
            |
            | # Javascript for main area content piece
            +-- index.js
            |
            | # Stylus for main area content piece
            +-- index.styl
            |
            | # Data for main area content piece
            +-- index.yaml
            |
            | # Template for main area content piece
            +-- template.html
            |
            | # CSS Overrides for demandware to be inlined
            +-- overrides.css
```

## Content Asset Submodule

We use a separate repository to store our images and video for assets due to the large size and number of assets. To set up this submodule:

1. Create a repo for the assets to live in.
2. Run `git init` inside `src/content` and commit the contents of the folder.
3. Run `git submodule add <repo-url> src/content` from the root of the project and then commit the changes.
