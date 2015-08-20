module.exports =
    config:
        accentColor:
            title: 'Accent color'
            description: 'Sets the accent color for the UI theme.'
            type: 'string'
            default: 'Teal'
            enum: ['Blue', 'Cyan', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow']
        tabSize:
            title: 'Tab bar size'
            description: 'Sets the height for the tab bar'
            type: 'string'
            default: 'Normal'
            enum: ['Small', 'Normal', 'Big']
        useRoboto:
            title: 'Use Roboto Mono font in text editors'
            type: 'boolean',
            default: false
        slimScrollbar:
            title: 'Slim scrollbars'
            type: 'boolean'
            default: false
        disableAnimations:
            title: 'Disable animations'
            description: 'Reduces visual distractions when switching tabs or giving focus to text fields.'
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
            description: 'Set the font size used through the user interface. It doesn\'t override the text editor font size setting.'
            type: 'string'
            default: 'Regular'
            enum: ['Small', 'Regular', 'Big', 'Huge']
        showTabIcons:
            title: 'Icons in tabs'
            description: 'Shows the file-type icon for focused tabs.'
            type: 'string'
            default: 'Hide'
            enum: ['Hide', 'Show on active tab', 'Show on all tabs']
        rippleAccentColor:
            title: 'Use accent color in tabs\' ripple effect'
            type: 'boolean',
            default: false

    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Config.apply()
