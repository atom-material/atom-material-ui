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

        tabs.addEventListener 'click', (event) ->
            rippleClick(event)

        treeView.addEventListener 'scroll', (event) ->
            scrollPos = treeView.scrollTop
            projectRoot = document.querySelector('.project-root > .header')
            projectRoot.style.transform = 'translateY(' + scrollPos + 'px)'

        atom.workspace.onDidChangeActivePaneItem ->
            tabBar = document.querySelector('.tab-bar')
            activeTab = document.querySelector('.tab-bar .tab.active')
            activeTab.click() if activeTab && activeTab.click

        # Initialize project-root scroll position
        document.querySelector('.project-root > .header').style.transform = 'translateY(' + treeView.scrollTop + 'px)'
