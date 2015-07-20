module.exports =
    config:
        accentColor:
            title: 'Accent color'
            description: 'Set the accent color for the UI theme.'
            type: 'string'
            default: 'Teal'
            enum: ['Blue', 'Cyan', 'Green', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow']
        tabSize:
            title: 'Tab bar size'
            description: 'Set the height for the tab bar'
            type: 'string'
            default: 'Normal'
            enum: ['Small', 'Normal', 'Big']
        themeSyle:
            title: 'Theme style'
            description: 'Select the theme style from Default, Darker and Lighter'
            type: 'string'
            default: 'Default'
            enum: ['Darker', 'Default', 'Lighter']
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
        depth:
            title: 'Add depth'
            description: 'Adds a few shadows here and there to add depth to the UI.'
            type: 'boolean'
            default: false
        altCmdPalette:
            title: 'Alternative command palette background'
            description: 'Use a syntax\' background color for the command palette and fuzzy finder.'
            type: 'boolean'
            default: true
        compactTreeView:
            title: 'Compact Tree View'
            description: 'Reduces line-height in the tree view component.'
            type: 'boolean'
            default: false
        fontSize:
            title: 'UI font size'
            description: 'Sets the font size used through the user interface. It doesn\'t override the text editor font size setting.'
            type: 'string'
            default: 'Regular'
            enum: ['Small', 'Regular', 'Big', 'Huge']

    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Config.apply()
