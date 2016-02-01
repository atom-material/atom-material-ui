'use babel';
'use strict';

import Ps from 'perfect-scrollbar';

var rippleClick = function(event) {
    var item = event.target;

    if (item) {
        let rect = item.getBoundingClientRect();
        let x = (event.clientX || 80) - rect.left;
        let y = (event.clientY || 24) - rect.top;
        let ink;

        if (item.querySelectorAll('.ink').length === 0) {
            let ink = document.createElement('span');

            ink.classList.add('ink');
            item.appendChild(ink);
        }

        ink = item.querySelector('.ink');
        ink.style.left = x + 'px';
        ink.style.top = y + 'px';

        setTimeout(() => {
            if (ink && ink.parentElement) {
                ink.parentElement.removeChild(ink);
            }
        }, 1000);
    }
};

var updateScrollbars = function() {
    var treeView = document.querySelector('.tree-view-scroller') ||
                   document.querySelector('.nuclide-ui-panel-component-scroller');
                   
    setImmediate(() => Ps.update(treeView));
};

var blendTabsScroll = function() {
    var tabBlender = document.querySelector('.tabBlender');
    var treeView = document.querySelector('.tree-view-scroller') ||
                   document.querySelector('.nuclide-ui-panel-component-scroller');
    var scrollPosX;
    var scrollPosY;

    if (treeView) {
        scrollPosY = treeView.scrollTop;
        scrollPosX = treeView.scrollLeft;
    }
    if (tabBlender && treeView) {
        tabBlender.style.transform = 'translate(' + scrollPosX + 'px, ' + scrollPosY + 'px)';
    }
};

var hasScrollbars = function() {
    var atomWorkspace = document.querySelector('atom-workspace');
    return atomWorkspace.classList.contains('scrollbars-visible-always');
}();

var removeBindings = function() {
    var treeViewScroller = document.querySelector('.tree-view-scroller') ||
                           document.querySelector('.nuclide-ui-panel-component-scroller');

    if (treeViewScroller) {
        treeViewScroller.removeEventListener('click', updateScrollbars);
        treeViewScroller.removeEventListener('scroll', blendTabsScroll);
    }
    window.removeEventListener('resize', updateScrollbars);
};

module.exports = {
    blendTabsScroll: blendTabsScroll,

    remove: removeBindings,

    apply() {
        var tabs = document.querySelector('.tab-bar');
        var blendTabs = atom.config.get('atom-material-ui.treeView.blendTabs');
        var treeView = document.querySelector('.tree-view-scroller') ||
                       document.querySelector('.nuclide-ui-panel-component-scroller');

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
                blendTabsScroll();
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
