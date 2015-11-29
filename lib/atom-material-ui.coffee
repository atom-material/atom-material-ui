fs = require 'fs'

module.exports =
    getContrast: (color) ->
        # Finds a contrasting text color
        r = parseInt(color.substr(1, 2), 16)
        g = parseInt(color.substr(3, 2), 16)
        b = parseInt(color.substr(5, 2), 16)
        yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

        return "desaturate(darken(#{color}, 40%), 25%)" if yiq >= 220
        return "desaturate(darken(#{color}, 35%), 20%)" if yiq >= 190 && yiq < 220
        return "desaturate(darken(#{color}, 25%), 20%)" if yiq >= 130 && yiq < 190
        return "lighten(#{color}, 60%)" if yiq < 130

    config:
        colors:
            order: 1
            type: 'object'
            properties:
                abaseColor: # hack to force this setting to show first, should be "baseColor"
                    title: 'Primary color'
                    description: 'Changes the main theme color.'
                    type: 'color'
                    default: '#009688'
                accentColor:
                    title: 'Accent color'
                    description: 'Accent color used to underline active tabs.'
                    type: 'color'
                    default: '#FFFFFF'
                genAccent:
                    title: 'Generate complementary accent'
                    description: 'Material UI will try to generate a complementary color to your selected base color and set it as an accent. If it fails, just pick a different accent color to reload the theme. <small>Experimental</small>'
                    type: 'boolean'
                    default: false

        ui:
            order: 2
            type: 'object'
            properties:
                panelShadows:
                    title: 'Panels cast shadows'
                    description: 'Adds depth to the user interface by using shadows.'
                    type: 'boolean'
                    default: false
                animations:
                    title: 'Use animations'
                    description: 'Enables animations for clicked tabs and other UI elements.'
                    type: 'boolean'
                    default: true
                panelContrast:
                    title: 'Contrasting panels'
                    description: 'Adds a little contrast between panels to differentiate where one starts and the other ends.'
                    type: 'boolean'
                    default: false

        tabs:
            order: 3
            type: 'object'
            properties:
                tintedTabBar:
                    title: 'Tinted tab bar'
                    description: 'Paints the tab bar with the chosen primary color.'
                    type: 'boolean'
                    default: false

        treeView:
            order: 4
            type: 'object'
            properties:
                compactList:
                    title: 'Compact tree view'
                    description: 'Reduces line height in the tree view component.'
                    type: 'boolean'
                    default: false

        fonts:
            order: 5
            type: 'object'
            properties:
                fontSize:
                    title: 'User interface font size'
                    description: 'Scales the entire UI based on this value.'
                    default: 16
                    minimum: 10
                    type: 'number'

    toggleClass: (boolean, className) ->
        root = document.documentElement

        if boolean
            root.classList.add(className)
        else
            root.classList.remove(className)

    writeConfig: (cb) ->
        accentColor = atom.config.get('atom-material-ui.colors.accentColor').toHexString()
        baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toHexString()
        accentTextColor = this.getContrast baseColor
        fontSize = atom.config.get('atom-material-ui.fonts.fontSize')

        config =
            """
            @accent-color: #{accentColor};
            @accent-text-color: #{accentTextColor};
            @base-color: #{baseColor};
            :root {
                font-size: #{fontSize}px;
            }
            """

        fs.writeFile "#{__dirname}/../styles/custom.less", config, 'utf8', () ->
            themePack = atom.packages.getLoadedPackage('atom-material-ui')
            themePack.deactivate()
            themePack.activate()

            if cb && typeof cb == 'function'
                cb()

    activate: () ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Bindings = require './bindings'
            Config.apply()
            setTimeout ->
                Bindings.apply()
            , 0
