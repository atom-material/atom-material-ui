![](http://i.imgur.com/7C2H2mw.png)
---
# Contributing to Atom Material UI

Some of this content comes from Atom's Contributing guidelines. Please, don't be intimidated, this is just a *guideline*. All bug reports, feature requests, and questions are **always** welcome.

## Code contributions
If you want to get your hands dirty and contribute with some code, you should fork this repository, make your changes, and then send in a pull request.

```shell
apm uninstall atom-material-ui #if you had it installed
git clone <your_forked_repo>
cd atom-material-ui/
apm link && apm install
atom -d .
```

Also, you should ignore changes to the file `custom.less` as those are your personal settings:

```shell
git update-index --assume-unchanged styles/custom.less
```

We'll have to deal with it this way until the maintainer of `less-cache` merges [this pull request](https://github.com/atom/less-cache/pull/8) and then we could use optional imports in LESS.

I recommend installing the package [editorconfig](https://atom.io/packages/editorconfig) so you don't have to change your global settings for indentation.

### Stylesheets

Use four spaces per indent and leave an empty line between a selector's properties and a nested selector. The white space helps with readability:

```scss
.selector {
    property: value;

    .nested {
        property: value;
    }
}
```

Don't abuse nesting or we'll all regret it. Having `!important` flags all over to fight specificity is nasty. Try using three levels at the most. `!important` is only allowed if you need to override a package's inline styles.

Don't be afraid to include another level if you want to target a `&.className`:

```scss
.selector {
    property: value;

    &.className {
        property: value;
    }
}
```

### JavaScript

In a nutshell, we're following [Airbnb's JavaScript styleguide](https://github.com/airbnb/javascript), except we use four spaces per indent.

## Testing

### Getting the development version

If you'd like to test new features and hunt bugs, follow these simple steps to get the latest (development) version.

```shell
git clone git@github.com:silvestreh/atom-material-ui.git
cd atom-material-ui/
apm link -d && apm install
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

### Template for submitting bug reports

```markdown
[Short description of problem here]

**Reproduction Steps:**

1. [First Step]
2. [Second Step]
3. [Other Steps...]

**Expected behavior:**

[Describe expected behavior here]

**Observed behavior:**

[Describe observed behavior here]

**Screenshots and GIFs**

![Screenshots and GIFs which follow reproduction steps to demonstrate the problem](url)

**Atom version:** [Enter Atom version here]
**OS and version:** [Enter OS name and version here]

**Installed packages:**

[List of installed packages here]

**Additional information:**

* Problem can be reproduced in safe mode: [Yes/No]
* Problem started happening recently, didn't happen in an older version of Atom: [Yes/No]
* Problem can be reliably reproduced, doesn't happen randomly: [Yes/No]
* Problem happens with all files and projects, not only some files or projects: [Yes/No]
```
