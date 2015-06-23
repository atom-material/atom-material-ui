module.exports =
    apply: ->
        root = document.documentElement

        # Accent color

        setAccentColor = (currentAccentColor) ->
            root.classList.remove('cyan')
            root.classList.remove('green')
            root.classList.remove('pink')
            root.classList.remove('purple')
            root.classList.remove('red')
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
