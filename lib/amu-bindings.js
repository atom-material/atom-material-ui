'use babel';

import Ps from 'perfect-scrollbar';

var rippleClick = function (event) {
    var item = event.target;

    if (item) {
        let rect = item.getBoundingClientRect(),
            x = (event.clientX || 80) - rect.left,
            y = (event.clientY || 24) - rect.top;

        if (item.querySelectorAll('.ink').length == 0) {
            let ink = document.createElement('span');

            ink.classList.add('ink');
            item.appendChild(ink);
        }

        let ink = item.querySelector('.ink'),
            duration = ink.style.transitionDuration || ink.style.animationDuration || 250;

        ink.style.left = x + 'px';
        ink.style.top = y + 'px';

        setTimeout(() => {
            if (ink && ink.parentElement) {
                ink.parentElement.removeChild(ink);
            }
        }, duration);
    }
};

var updateScrollbars = function () {
    var treeView = document.querySelector('.tree-view-scroller');
    setImmediate(() => Ps.update(treeView));
};

var blendTabsScroll = function () {
    var tabBlender = document.querySelector('.tabBlender'),
        treeView = document.querySelector('.tree-view-scroller'),
        scrollPosY = treeView.scrollTop,
        scrollPosX = treeView.scrollLeft;

    if (tabBlender) {
        tabBlender.style.transform = 'translate(' + scrollPosX + 'px, ' + scrollPosY + 'px)';
    }
};

var hasScrollbars = function () {
    var atomWorkspace = document.querySelector('atom-workspace');
    return atomWorkspace.classList.contains('scrollbars-visible-always');
}();

module.exports = {
    apply() {
        var tabs = document.querySelector('.tab-bar'),
            treeView = document.querySelector('.tree-view-scroller'),
            blendTabs = atom.config.get('atom-material-ui.treeView.blendTabs');

        if (treeView) {
            // Nicer scrollbars for treeView
            if (hasScrollbars) {
                Ps.initialize(treeView);
                window.addEventListener('resize', updateScrollbars);
                treeView.addEventListener('click', updateScrollbars);
            }
            if (blendTabs) {
                treeView.addEventListener('scroll', blendTabsScroll);
            } else {
                treeView.removeEventListener('scroll', blendTabsScroll);
            }
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
