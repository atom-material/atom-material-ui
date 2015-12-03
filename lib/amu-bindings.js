'use babel';

import Ps from 'perfect-scrollbar';

var rippleClick = function (event) {
    var item = event.target;

    if (item) {
        var rect = item.getBoundingClientRect(),
            x = (event.clientX || 80) - rect.left,
            y = (event.clientY || 24) - rect.top;

        if (item.querySelectorAll('.ink').length == 0) {
            var ink = document.createElement('span');

            ink.classList.add('ink');
            item.appendChild(ink);
        }

        var ink = item.querySelector('.ink');

        ink.style.left = x + 'px';
        ink.style.top = y + 'px';
    }
};

var updateScrollbars = function () {
    var treeView = document.querySelector('.tree-view-scroller');
    setImmediate(() => Ps.update(treeView));
};

var hasScrollbars = function () {
    var atomWorkspace = document.querySelector('atom-workspace');
    return atomWorkspace.classList.contains('scrollbars-visible-always');
}();

module.exports = {
    apply() {
        var tabs = document.querySelector('.tab-bar'),
            treeView = document.querySelector('.tree-view-scroller');

        // Nicer scrollbars for treeView
        if (treeView && hasScrollbars) {
            Ps.initialize(treeView);
            window.addEventListener('scroll', () => updateScrollbars());
            treeView.addEventListener('click', () => updateScrollbars());
        }

        // Ripple Effect for Tabs
        if (tabs) {
            tabs.addEventListener('click', (event) => rippleClick(event));

            atom.workspace.onDidChangeActivePaneItem(() => {
                var tabBar = document.querySelector('.tab-bar'),
                    activeTab = document.querySelector('.tab-bar .tab.active');

                if (activeTab && activeTab.click) {
                    activeTab.click()
                }
            });
        }
    }
}
