module.exports =
    config:
        accentColor:
            title: 'Accent color'
            description: 'Set the accent color for the UI theme.'
            type: 'string'
            default: 'Cyan'
            enum: ['Cyan', 'Green', 'Pink', 'Purple', 'Red', 'Yellow']
        useRoboto:
            title: 'Use Roboto Mono'
            description: 'Choose wether to use Roboto Mono font for the editor.'
            type: 'boolean',
            default: false
        slimScrollbar:
            title: 'Slim scrollbars'
            description: 'Makes scrollbars very slim.'
            type: 'boolean'
            default: false
        disableAnimations:
            title: 'Disable animations'
            description: 'Reduces distractions when switching tabs.'
            type: 'boolean'
            default: false
        panelContrast:
            title: 'Contrasting panels'
            description: 'Makes panels\' background darker. Applies to tabs, search & replace, tree-view, etc.'
            type: 'boolean'
            default: false

    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Config.apply()
