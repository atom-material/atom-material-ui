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
