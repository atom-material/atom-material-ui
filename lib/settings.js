'use babel';
'use strict';

import { toggleClass } from './helpers';
import { toggleBlendTreeView } from './tree-view-settings';

function init() {
    toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    toggleClass(atom.config.get('atom-material-ui.tabs.compactTabs'), 'compact-tab-bar');
    toggleClass(atom.config.get('atom-material-ui.tabs.noTabMinWidth'), 'no-tab-min-width');
    toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));

    document.querySelector(':root').style.fontSize = `${atom.config.get('atom-material-ui.fonts.fontSize')}px`;
}

// Check if there are custom icons packages
function checkPacks() {
    var root = document.querySelector('atom-workspace');
    var loadedPackages = atom.packages.getActivePackages();
    var iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

    root.classList.remove('has-custom-icons');

    loadedPackages.forEach((pack) => {
        if (iconPacks.indexOf(pack.name) >= 0) {
            root.classList.add('has-custom-icons');
        }
    });
}

function apply() {
    atom.packages.onDidActivatePackage(() => checkPacks());
    atom.packages.onDidDeactivatePackage(() => checkPacks());

    init();

    // Font Size Settings

    atom.config.onDidChange('atom-material-ui.fonts.fontSize', (value) => {
        var fontSize = Math.round(value.newValue);
        document.querySelector(':root').style.fontSize = `${fontSize}px`;
    });

    // Tab blending

    atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => toggleBlendTreeView(value.newValue));

    // className-toggling Settings

    atom.config.onDidChange('atom-material-ui.tabs.tintedTabBar', (value) => toggleClass(value.newValue, 'tinted-tab-bar'));
    atom.config.onDidChange('atom-material-ui.tabs.compactTabs', (value) => toggleClass(value.newValue, 'compact-tab-bar'));
    atom.config.onDidChange('atom-material-ui.tabs.noTabMinWidth', (value) => toggleClass(value.newValue, 'no-tab-min-width'));
    atom.config.onDidChange('atom-material-ui.ui.animations', (value) => toggleClass(value.newValue, 'use-animations'));
    atom.config.onDidChange('atom-material-ui.ui.panelShadows', (value) => toggleClass(value.newValue, 'panel-shadows'));
    atom.config.onDidChange('atom-material-ui.ui.panelContrast', (value) => toggleClass(value.newValue, 'panel-contrast'));
    atom.config.onDidChange('atom-material-ui.treeView.compactList', (value) => toggleClass(value.newValue, 'compact-tree-view'));
    atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => {
        if (value.newValue && !atom.config.get('atom-material-ui.tabs.tintedTabBar')) {
            atom.config.set('atom-material-ui.tabs.tintedTabBar', true);
        }

        toggleClass(value.newValue, 'blend-tree-view');
    });
}

module.exports = { apply };
