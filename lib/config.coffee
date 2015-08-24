module.exports =
    apply: ->
        root = document.documentElement

        # Check if there are custom icons packages

        checkPacks = () ->
            root.classList.remove('dont-change-icons')

            loadedPackages =  atom.packages.getActivePackages()
            iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons']

            loadedPackages.forEach (pack, i) ->
                if (iconPacks.indexOf(pack.name) >= 0)
                    root.classList.add('dont-change-icons')

        atom.packages.onDidActivatePackage () -> checkPacks()
        atom.packages.onDidDeactivatePackage () -> checkPacks()

        # Accent color

        setAccentColor = (currentAccentColor) ->
            root.classList.remove('blue')
            root.classList.remove('cyan')
            root.classList.remove('green')
            root.classList.remove('orange')
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

        # Roboto font for UI

        setRobotoUIFont = (boolean) ->
            if boolean
                root.classList.add('roboto')
            else
                root.classList.remove('roboto')

        atom.config.onDidChange 'atom-material-ui.useRobotoInUI', ->
            setRobotoUIFont(atom.config.get('atom-material-ui.useRobotoInUI'))

        setRobotoUIFont(atom.config.get('atom-material-ui.useRobotoInUI'))

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

        # Tree-view Size

        setCompactTreeView = (boolean) ->
            if boolean
                root.classList.add('compact-tree-view')
            else
                root.classList.remove('compact-tree-view')

        atom.config.onDidChange 'atom-material-ui.compactTreeView', ->
            setCompactTreeView(atom.config.get('atom-material-ui.compactTreeView'))

        setCompactTreeView(atom.config.get('atom-material-ui.compactTreeView'))

        # UI Font Size

        setFontSize = (currentFontSize) ->
            root.classList.remove('font-size-small')
            root.classList.remove('font-size-regular')
            root.classList.remove('font-size-big')
            root.classList.remove('font-size-huge')
            root.classList.add('font-size-' + currentFontSize.toLowerCase())

        atom.config.onDidChange 'atom-material-ui.fontSize', ->
            setFontSize(atom.config.get('atom-material-ui.fontSize'))

        setFontSize(atom.config.get('atom-material-ui.fontSize'))

        # Tab Icons

        setShowTabIcons = (option) ->
          root.classList.remove('tab-icons')
          root.classList.remove('tab-icons-all')
          if option == 'Show on active tab'
              root.classList.add('tab-icons')
          else if option == 'Show on all tabs'
              root.classList.add('tab-icons-all')

        atom.config.onDidChange 'atom-material-ui.showTabIcons', ->
            setShowTabIcons(atom.config.get('atom-material-ui.showTabIcons'))

        setShowTabIcons(atom.config.get('atom-material-ui.showTabIcons'))

        # Tab Accent Ripple

        setRippleAccentColor = (boolean) ->
            if boolean
                root.classList.add('ripple-accent-color')
            else
                root.classList.remove('ripple-accent-color')

        atom.config.onDidChange 'atom-material-ui.rippleAccentColor', ->
            setRippleAccentColor(atom.config.get('atom-material-ui.rippleAccentColor'))

        setRippleAccentColor(atom.config.get('atom-material-ui.rippleAccentColor'))
