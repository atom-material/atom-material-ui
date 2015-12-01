Ps = require 'perfect-scrollbar'

rippleClick = (event) ->
    item = event.target

    if (item)
        rect = item.getBoundingClientRect()
        x = (event.clientX || 80) - rect.left
        y = (event.clientY || 24) - rect.top

        if (item.querySelectorAll('.ink').length == 0)
            ink = document.createElement('span')
            ink.classList.add('ink')
            item.appendChild(ink)

        ink = item.querySelector('.ink')
        ink.style.left = x + 'px'
        ink.style.top = y + 'px'

module.exports =
    apply: ->
        tabs = document.querySelector('.tab-bar')
        treeView = document.querySelector('.tree-view-scroller')
        atomWorkspace = document.querySelector('atom-workspace')

        tabs.addEventListener 'click', (event) ->
            rippleClick(event)

        if treeView
            # treeView.addEventListener 'scroll', (event) ->
            #     scrollPosY = treeView.scrollTop
            #     scrollPosX = treeView.scrollLeft
            #     projectRoot = document.querySelector('.project-root > .header')
            #     projectRoot.style.transform = 'translate(' + scrollPosX + 'px,' + scrollPosY + 'px)'

            treeView.addEventListener 'click', () ->
                if (atomWorkspace.classList.contains('scrollbars-visible-always'))
                    setTimeout ->
                        Ps.update(treeView)
                    , 0

        atom.workspace.onDidChangeActivePaneItem ->
            tabBar = document.querySelector('.tab-bar')
            activeTab = document.querySelector('.tab-bar .tab.active')
            activeTab.click() if activeTab && activeTab.click

        if (treeView && atomWorkspace.classList.contains('scrollbars-visible-always'))
            Ps.initialize(treeView)

        window.addEventListener 'resize', () ->
            if (treeView && atomWorkspace.classList.contains('scrollbars-visible-always'))
                setTimeout ->
                    Ps.update(treeView)
                , 0

        # Initialize project-root scroll position
        if treeView
            document.querySelector('.project-root > .header').style.transform = 'translateY(' + treeView.scrollTop + 'px)'
