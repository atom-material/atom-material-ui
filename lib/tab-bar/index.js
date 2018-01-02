'use babel';

import toggleClassName from '../helper/toggle-class-name';

atom.config.observe('atom-material-ui.tabs.tintedTabBar', (value) => {
    toggleClassName('amu-tinted-tab-bar', value);
});

atom.config.observe('atom-material-ui.tabs.compactTabs', (value) => {
    toggleClassName('amu-compact-tab-bar', value);
});

atom.config.observe('atom-material-ui.tabs.noTabMinWidth', (value) => {
    toggleClassName('amu-no-tab-min-width', value);
});

atom.config.observe('atom-material-ui.tabs.stretchedTabs', (value) => {
    toggleClassName('amu-stretched-tabs', value);
});
