module.exports =        
    activate: (state) ->
        atom.themes.onDidChangeActiveThemes ->
            Config = require './config'
            Bindings = require './bindings'
            Config.apply()
            Bindings.apply()
