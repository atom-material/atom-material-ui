'use babel';

import './colors';
import './fonts';
import './tab-bar';
import './tree-view';
import './user-interface';
import setFontSize from './helper/set-font-size';
import toggleBlendTreeView from './tree-view/toggle-blending-element';
import toggleClassName from './helper/toggle-class-name';
import config from './config-schema.json';

const root = document.documentElement;
const classNames = {
    // Fonts
    'amu-paint-cursor': atom.config.get('atom-material-ui.tabs.paintCursor'),

    // Tabs settings
    'amu-compact-tab-bar': atom.config.get('atom-material-ui.tabs.compactTabs'),
    'amu-no-tab-min-width': atom.config.get('atom-material-ui.tabs.noTabMinWidth'),
    'amu-tinted-tab-bar': atom.config.get('atom-material-ui.tabs.tintedTabBar'),

    // Tree View settings
    'amu-blend-tree-view': atom.config.get('atom-material-ui.treeView.blendTabs'),
    'amu-compact-tree-view': atom.config.get('atom-material-ui.treeView.compactList'),

    // General UI settings
    'amu-panel-contrast': atom.config.get('atom-material-ui.ui.panelContrast'),
    'amu-panel-shadows': atom.config.get('atom-material-ui.ui.panelShadows'),
    'amu-use-animations': atom.config.get('atom-material-ui.ui.animations'),
};

export default {
    config,

    activate() {
        Object.keys(classNames).forEach(className =>
            toggleClassName(className, classNames[className]));

        setFontSize(atom.config.get('atom-material-ui.fonts.fontSize'));
        toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
    },

    deactivate() {
        Object.keys(classNames).forEach(className => toggleClassName(className, false));
        root.style.fontSize = null;
        toggleBlendTreeView(false);
    },
};
