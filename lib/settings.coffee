module.exports =
    config:
        accentColor:
            title: 'Accent color'
            description: 'Set the accent color for the UI theme.'
            type: 'string'
            default: 'Cyan'
            enum: ['Cyan', 'Green', 'Pink', 'Purple', 'Red', 'Yellow']

    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Config.apply()
