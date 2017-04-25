![](http://i.imgur.com/7C2H2mw.png)
---
# Contributing to Atom Material UI

Some of this content comes from Atom's Contributing guidelines. Please, don't be intimidated, this is just a *guideline*. All bug reports, feature requests, and questions are **always** welcome.

## Code contributions
If you want to get your hands dirty and contribute with some code, you should fork this repository, make your changes, and then send in a pull request.

```shell
git clone <your_forked_repo>
cd atom-material-ui/
apm link -d && npm install
atom -d .
```

I recommend installing the package [editorconfig](https://atom.io/packages/editorconfig) so you don't have to change your global settings for indentation.

### Stylesheets

Use four spaces per indent and leave an empty line between a selector's properties and a nested selector. Also leave a empty line between selectors. The white space helps with readability:

```scss
.selector {
    property: value;

    .nested {
        property: value;
    }
}

.another-selector {
    property: value;
}
```

Don't abuse nesting or we'll all regret it in the future. Having `!important` flags all over to fight specificity is nasty. Try using three levels at the most. `!important` is only allowed if you need to override a package's inline styles.

Don't be afraid to include another level if you want to target a `&.className`:

```scss
.selector {
    property: value;

    &.className {
        property: value;
    }
}
```

Using BEM(ish) syntax nesting is OK:

```scss
.block {
    &__element {
        &__sub-element {
            &--modifier {
                property: value;
            }
        }
    }
}
```

That unholy pyramid doesn't look great, but the output CSS isn't that hard to override.

### JavaScript

In a nutshell, we're following Airbnb's JavaScript style guide, except we use four spaces per indent. Make sure to check the [style guide](https://github.com/airbnb/javascript). Also, we have ESLint to catch bugs and style errors, so make sure to install it along with `linter` and `linter-eslint`.

## Trying new features

### Getting the development version

If you'd like to test new features and hunt bugs, follow these simple steps to get the latest (development) version.

```shell
git clone git@github.com:silvestreh/atom-material-ui.git
cd atom-material-ui/
apm link -d && npm install
```

You'll have to run Atom in *developer mode* to test the theme. To do so, open a terminal and run:

```shell
atom -d .
```

This way both, the APM published version and the development version, can coexist.

### Reporting a bug

Before opening an issue please search through the existing ones, even those that are marked as closed. Also, please take these into account before submitting an issue:

- **Which version of Atom are you using?** You can get the exact version by running `atom -v` in your terminal, or by starting Atom and running the Application: About command from the Command Palette.
- **What's the name and version of the OS you're using?**
- **Which packages do you have installed?** You can get that list by running `apm list --installed` in a terminal.
- **Are you using local styles in your user stylesheets?** If so, provide its contents, preferably in a code block or with a link to a gist.
