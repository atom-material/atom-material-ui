tinycolor = require 'tinycolor2'
amu = require './atom-material-ui'

init = () ->
    if !localStorage.getItem 'atom-material-ui:configOk'
        console.log 'AMU needs to reset your settings. Sorry!'
        atom.config.set('atom-material-ui')
        amu.writeConfig()
        localStorage.setItem 'atom-material-ui:configOk', true

    amu.toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar')
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows')
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast')
    amu.toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations')
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view')


module.exports =
    apply: ->
        root = document.documentElement

        # Check if there are custom icons packages
        checkPacks = () ->
            root.classList.remove('has-custom-icons')

            loadedPackages =  atom.packages.getActivePackages()
            iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons']

            loadedPackages.forEach (pack, i) ->
                if (iconPacks.indexOf(pack.name) >= 0)
                    root.classList.add('has-custom-icons')

        atom.packages.onDidActivatePackage () -> checkPacks()
        atom.packages.onDidDeactivatePackage () -> checkPacks()

        init()

        # Accent color

        atom.config.onDidChange 'atom-material-ui.colors.accentColor', (value) ->
            amu.writeConfig()

        atom.config.onDidChange 'atom-material-ui.colors.abaseColor', (value) ->
            if atom.config.get 'atom-material-ui.colors.genAccent'
                accent = tinycolor(value.newValue.toHexString()).complement().saturate(20).lighten(5)
                atom.config.set 'atom-material-ui.colors.accentColor', accent.toHexString()
            amu.writeConfig()

        atom.themes.onDidChangeActiveThemes ->
            amu.writeConfig()

        # Font Size Settings

        atom.config.onDidChange 'atom-material-ui.fonts.fontSize', ->
            amu.writeConfig()

        # className-toggling Settings

        atom.config.onDidChange 'atom-material-ui.tabs.tintedTabBar', (value) ->
            amu.toggleClass(value.newValue, 'tinted-tab-bar')

        atom.config.onDidChange 'atom-material-ui.ui.animations', (value) ->
            amu.toggleClass(value.newValue, 'use-animations')

        atom.config.onDidChange 'atom-material-ui.ui.panelShadows', (value) ->
            amu.toggleClass(value.newValue, 'panel-shadows')

        atom.config.onDidChange 'atom-material-ui.ui.panelContrast', (value) ->
            amu.toggleClass(value.newValue, 'panel-contrast')

        atom.config.onDidChange 'atom-material-ui.treeView.compactList', (value) ->
            amu.toggleClass(value.newValue, 'compact-tree-view')
