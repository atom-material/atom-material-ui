'use babel';
'use strict';

function rippleClick(event) {
    var item = event.target;

    if (!item) return;

    const rect = item.getBoundingClientRect();
    const x = (event.clientX || 80) - rect.left;
    const y = (event.clientY || 24) - rect.top;
    let ink;

    if (item.querySelectorAll('.ink').length === 0) {
        ink = document.createElement('span');

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

function apply() {
    var tabs = document.querySelectorAll('.tab-bar');

    // Ripple Effect for Tabs
    if (tabs) {
        Array.from(tabs).forEach((tab) => {
            tab.removeEventListener('click', rippleClick);
            tab.addEventListener('click', rippleClick);

            atom.workspace.onDidChangeActivePaneItem(() => {
                var activeTab = document.querySelector('.tab-bar .tab.active');

                if (activeTab && activeTab.click) {
                    activeTab.click();
                }
            });
        });
    }
}

atom.workspace.onDidAddPane(() => {
    setImmediate(() => apply());
});

module.exports = { apply };
