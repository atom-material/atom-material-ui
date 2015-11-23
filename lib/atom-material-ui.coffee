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
                getFromSyntax:
                    order: 2
                    title: 'Get from syntax'
                    type: 'button'
                    
    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Bindings = require './bindings'
            Config.apply()
            Bindings.apply()
