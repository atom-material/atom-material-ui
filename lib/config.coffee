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
