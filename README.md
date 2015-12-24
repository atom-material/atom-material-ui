[![apm](https://img.shields.io/apm/dm/atom-material-ui.svg?style=flat-square)](https://atom.io/packages/atom-material-ui)
[![apm](https://img.shields.io/apm/v/atom-material-ui.svg?style=flat-square)](https://atom.io/packages/atom-material-ui)
[![apm](https://img.shields.io/apm/l/atom-material-ui.svg?style=flat-square)]()

<a href="https://pledgie.com/campaigns/29552"><img alt="Click here to lend your support to: Atom Material Design Theme and make a donation at pledgie.com !" src="https://pledgie.com/campaigns/29552.png?skin_name=chrome" border="0"></a>

![](http://i.imgur.com/7C2H2mw.png)
---

A dynamic UI theme for Atom that (kinda) follows Google's Material Design Guidelines. Best with [Atom Material Syntax](https://github.com/silvestreh/atom-material-syntax).

Inspired by Mattia Astorino's [SublimeText theme](https://github.com/equinusocio/material-theme).

## Installation

Fire up a console and type:

`apm install atom-material-ui atom-material-syntax atom-material-syntax-light atom-material-syntax-dark`

Or, inside Atom's settings select Install and then search for this package.

## Configuration

Atom Material UI supports different accent colors. To change it, go to Settings > Themes and click the cog icon next to the theme selector.

![](http://i.imgur.com/pf3oiZr.png)

You'll find the color picker there.

## Screenshot

Here's the obligatory screenshot. The toolbar on the left side is a package named [Tool-bar-main](https://atom.io/packages/tool-bar-main).

![](http://i.imgur.com/BbNSkFT.png)

## Light syntax theme variant

![](http://i.imgur.com/NFJB47Q.png)

## Contributing

If you want to contribute you should fork this repository, make your changes and then send a pull request.

```shell
apm uninstall atom-material-ui #if you had it installed
git clone <your_forked_repo>
cd atom-material-ui/
apm link && apm install
```

I recommend installing the package [editorconfig](https://atom.io/packages/editorconfig) so you don't have to change your global settings for indentation.

Leave an empty line between a selector's properties and a nested selector. The white space helps with readability:

```css
.selector {
    property: value;

    .nested {
        property: value;
    }
}
```

## Extra

![](http://i.imgur.com/0tHORB1.png)

You can download the redesigned icon from [dropbox](https://dl.dropboxusercontent.com/u/115930/Atom-MD-Icon.zip). It's a ZIP file containing multiple resolution PNGs, ICNS and ICO formats. Windows ICO converted by Akshit Tripathi.
