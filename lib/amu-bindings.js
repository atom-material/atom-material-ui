'use babel';
'use strict';

import Ps from 'perfect-scrollbar';

var rippleClick = function (event) {
    var item = event.target;

    if (item) {
        let rect = item.getBoundingClientRect(),
            x = (event.clientX || 80) - rect.left,
            y = (event.clientY || 24) - rect.top;

        if (item.querySelectorAll('.ink').length === 0) {
            let ink = document.createElement('span');

            ink.classList.add('ink');
            item.appendChild(ink);
        }

        let ink = item.querySelector('.ink');

        ink.style.left = x + 'px';
        ink.style.top = y + 'px';

        setTimeout(() => {
            if (ink && ink.parentElement) {
                ink.parentElement.removeChild(ink);
            }
        }, 1000);
    }
};

var updateScrollbars = function () {
    var treeView = document.querySelector('.tree-view-scroller');
    setImmediate(() => Ps.update(treeView));
};

var blendTabsScroll = function () {
    var tabBlender = document.querySelector('.tabBlender'),
        treeView = document.querySelector('.tree-view-scroller'),
        scrollPosX, scrollPosY;

    if (treeView) {
        scrollPosY = treeView.scrollTop;
        scrollPosX = treeView.scrollLeft;
    }
    if (tabBlender && treeView) {
        tabBlender.style.transform = 'translate(' + scrollPosX + 'px, ' + scrollPosY + 'px)';
    }
};

var hasScrollbars = function () {
    var atomWorkspace = document.querySelector('atom-workspace');
    return atomWorkspace.classList.contains('scrollbars-visible-always');
}();

var removeBindings = function () {
    window.removeEventListener('resize', updateScrollbars);
    document.querySelector('.tree-view-scroller').removeEventListener('click', updateScrollbars);
};

module.exports = {
    blendTabsScroll: blendTabsScroll,

    remove: removeBindings,

    apply() {
        var tabs = document.querySelector('.tab-bar'),
            treeView = document.querySelector('.tree-view-scroller'),
            blendTabs = atom.config.get('atom-material-ui.treeView.blendTabs');

        if (treeView) {
            // Nicer scrollbars for treeView
            if (hasScrollbars) {
                Ps.destroy(treeView);
                Ps.initialize(treeView);
                window.removeEventListener('resize', updateScrollbars);
                window.addEventListener('resize', updateScrollbars);
                treeView.removeEventListener('click', updateScrollbars);
                treeView.addEventListener('click', updateScrollbars);
            }
            if (blendTabs) {
                treeView.removeEventListener('scroll', blendTabsScroll);
                treeView.addEventListener('scroll', blendTabsScroll);
            } else {
                treeView.removeEventListener('scroll', blendTabsScroll);
            }
        }

        // Ripple Effect for Tabs
        if (tabs) {
            tabs.removeEventListener('click', rippleClick);
            tabs.addEventListener('click', rippleClick);

            atom.workspace.onDidChangeActivePaneItem(() => {
                var activeTab = document.querySelector('.tab-bar .tab.active');

                if (activeTab && activeTab.click) {
                    activeTab.click();
                }
            });
        }
    }
};
