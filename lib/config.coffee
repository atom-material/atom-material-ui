fs = require 'fs'

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

        # Accent color

        # Finds a contrasting text color
        getContrast = (color) ->
            r = parseInt(color.substr(1, 2), 16)
            g = parseInt(color.substr(3, 2), 16)
            b = parseInt(color.substr(5, 2), 16)
            yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

            console.log yiq

            return "desaturate(darken(#{color}, 32%), 20%)" if yiq >= 190
            return "desaturate(darken(#{color}, 25%), 20%)" if yiq >= 130 && yiq < 190
            return "desaturate(lighten(#{color}, 60%), 20%)" if yiq < 130

        setAccentColor = (currentAccentColor) ->
            accentColor = currentAccentColor.toHexString()
            accentTextColor = getContrast accentColor

            accent =
                """
                @accent-color: #{accentColor};
                @accent-text-color: #{accentTextColor};
                """

            fs.writeFileSync "#{__dirname}/../styles/custom.less", accent, 'utf8', () ->
                atom.notifications.addSuccess 'Accent color changed. Reload Atom for changes to take effect.'

        atom.config.onDidChange 'atom-material-ui.ui.accentColor', ->
            setAccentColor(atom.config.get('atom-material-ui.ui.accentColor'))

        # console.log fs.readFileSync "#{__dirname}/../styles/custom.less"
