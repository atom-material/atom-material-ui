module.exports =
    apply: ->
        root = document.documentElement
        tabs = document.querySelector('.tab-bar')

        tabs.addEventListener 'click', (event) ->
            tab = event.target

            if (tab && tab.nodeName == 'LI')
                rect = tab.getBoundingClientRect()
                x = event.clientX - rect.left
                y = event.clientY - rect.top

                if (tab.querySelectorAll('.ink').length == 0)
                    ink = document.createElement('span')
                    ink.classList.add('ink')
                    tab.appendChild(ink)

                ink = tab.querySelector('.ink')
                ink.style.left = x + 'px'
                ink.style.top = y + 'px'
