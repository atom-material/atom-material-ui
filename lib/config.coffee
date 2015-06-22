module.exports =
    apply: ->
        root = document.documentElement

        # Accent color

        setAccentColor = (currentAccentColor) ->
            root.classList.remove('Cyan')
            root.classList.remove('Green')
            root.classList.remove('Pink')
            root.classList.remove('Purple')
            root.classList.remove('Red')
            root.classList.remove('Yellow')
            root.classList.add(currentAccentColor)

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
