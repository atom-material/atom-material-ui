'use babel';
'use strict';

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

module.exports = {
    apply() {
        var tabs = document.querySelectorAll('.tab-bar');

        // Ripple Effect for Tabs
        if (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].removeEventListener('click', rippleClick);
                tabs[i].addEventListener('click', rippleClick);

                atom.workspace.onDidChangeActivePaneItem(() => {
                    var activeTab = document.querySelector('.tab-bar .tab.active');

                    if (activeTab && activeTab.click) {
                        activeTab.click();
                    }
                });
            }
        }
    }
};
