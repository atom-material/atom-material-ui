module.exports =
    apply: ->
        root = document.documentElement

        # Accent color

        setAccentColor = (currentAccentColor) ->
            root.classList.remove('blue')
            root.classList.remove('cyan')
            root.classList.remove('green')
            root.classList.remove('pink')
            root.classList.remove('purple')
            root.classList.remove('red')
            root.classList.remove('teal')
            root.classList.remove('white')
            root.classList.remove('yellow')
            root.classList.add(currentAccentColor.toLowerCase())

        atom.config.onDidChange 'atom-material-ui.accentColor', ->
            setAccentColor(atom.config.get('atom-material-ui.accentColor'))

        setAccentColor(atom.config.get('atom-material-ui.accentColor'))

        # Roboto Mono Font

        setRobotoFont = (boolean) ->
            if boolean
                root.classList.add('roboto-mono')
            else
                root.classList.remove('roboto-mono')

        atom.config.onDidChange 'atom-material-ui.useRoboto', ->
            setRobotoFont(atom.config.get('atom-material-ui.useRoboto'))

        setRobotoFont(atom.config.get('atom-material-ui.useRoboto'))

        # Slim Scrollbars

        setSlimScrollbars = (boolean) ->
            if boolean
                root.classList.add('slim-scrollbar')
            else
                root.classList.remove('slim-scrollbar')

        atom.config.onDidChange 'atom-material-ui.slimScrollbar', ->
            setSlimScrollbars(atom.config.get('atom-material-ui.slimScrollbar'))

        setSlimScrollbars(atom.config.get('atom-material-ui.slimScrollbar'))

        # Disable Animations

        setAnimationStatus = (boolean) ->
            if boolean
                root.classList.add('no-animations')
            else
                root.classList.remove('no-animations')

        atom.config.onDidChange 'atom-material-ui.disableAnimations', ->
            setAnimationStatus(atom.config.get('atom-material-ui.disableAnimations'))

        setAnimationStatus(atom.config.get('atom-material-ui.disableAnimations'))

        # Contrasting Panels

        setPanelContrast = (boolean) ->
            if boolean
                root.classList.add('panel-contrast')
            else
                root.classList.remove('panel-contrast')

        atom.config.onDidChange 'atom-material-ui.panelContrast', ->
            setPanelContrast(atom.config.get('atom-material-ui.panelContrast'))

        setPanelContrast(atom.config.get('atom-material-ui.panelContrast'))

        # Contrasting Panels

        setDepth = (boolean) ->
            if boolean
                root.classList.add('panel-depth')
            else
                root.classList.remove('panel-depth')

        atom.config.onDidChange 'atom-material-ui.depth', ->
            setDepth(atom.config.get('atom-material-ui.depth'))

        setDepth(atom.config.get('atom-material-ui.depth'))

        # Dark Overlay

        setAltCmdPalette = (boolean) ->
            if boolean
                root.classList.add('alt-cmd-palette')
            else
                root.classList.remove('alt-cmd-palette')

        atom.config.onDidChange 'atom-material-ui.altCmdPalette', ->
            setAltCmdPalette(atom.config.get('atom-material-ui.altCmdPalette'))

        setAltCmdPalette(atom.config.get('atom-material-ui.altCmdPalette'))

        # Tabs Size

        setTabSize = (currentTabSize) ->
            root.classList.remove('tab-size-small')
            root.classList.remove('tab-size-normal')
            root.classList.remove('tab-size-big')
            root.classList.add('tab-size-' + currentTabSize.toLowerCase())

        atom.config.onDidChange 'atom-material-ui.tabSize', ->
            setTabSize(atom.config.get('atom-material-ui.tabSize'))

        setTabSize(atom.config.get('atom-material-ui.tabSize'))
