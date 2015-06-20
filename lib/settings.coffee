module.exports =
  config:
    layoutMode:
      title: 'Accent color'
      description: 'Choose the accent color used all over the UI.'
      type: 'string'
      default: 'Cyan'
      enum: [
        'Cyan',
        'Pink',
        'Red',
        'Purple',
      ]

  activate: (state) ->
    atom.themes.onDidChangeActiveThemes ->
      Config = require './config'
      Config.apply()
