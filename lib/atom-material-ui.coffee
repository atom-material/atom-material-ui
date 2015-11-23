module.exports =
    config:
        ui:
            order: 1
            type: 'object'
            properties:
                accentColor:
                    order: 1
                    title: 'Accent color'
                    description: 'Sets the accent color for the UI theme. Requires reload.'
                    type: 'color'
                    default: '#009688'
                panelShadows:
                    order: 2
                    title: 'Panels cast shadows'
                    description: 'Adds depth to the user interface by using shadows.'
                    type: 'boolean'
                    default: true

        tabs:
            order: 2
            type: 'object'
            properties:
                tintedTabBar:
                    order: 1
                    title: 'Tinted tab bar'
                    description: 'Paints the tab bar with the chosen accent color.'
                    type: 'boolean'
                    default: true

    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Bindings = require './bindings'
            Config.apply()
            Bindings.apply()
