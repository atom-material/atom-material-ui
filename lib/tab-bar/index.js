'use babel';

import toggleClassName from '../helper/toggle-class-name';

atom.config.observe('atom-material-ui.tabs.tintedTabBar', (value) => {
    toggleClassName('amu-tinted-tab-bar', value);

    if (!value) {
        atom.config.set('atom-material-ui.treeView.blendTabs', false);
    }
});

atom.config.observe('atom-material-ui.tabs.compactTabs', (value) => {
    toggleClassName('amu-compact-tab-bar', value);
});

atom.config.observe('atom-material-ui.tabs.noTabMinWidth', (value) => {
    toggleClassName('amu-no-tab-min-width', value);
});
