'use babel';
'use strict';

import amu from './main';

var init = function() {
    amu.toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    amu.toggleClass(atom.config.get('atom-material-ui.tabs.compactTabs'), 'compact-tab-bar');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    amu.toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));

    document.querySelector(':root').style.fontSize = atom.config.get('atom-material-ui.fonts.fontSize') + 'px';

    // FIXME: Object.observe is deprecated
    if (Object.observe && typeof Object.observe === 'function') {
        Object.observe(atom.workspace.getPanels('left'), () => {
            amu.toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
        });
    }
};

// Check if there are custom icons packages
var checkPacks = function() {
    var root = document.querySelector('atom-workspace');
    var loadedPackages = atom.packages.getActivePackages();
    var iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

    root.classList.remove('has-custom-icons');

    loadedPackages.forEach((pack) => {
        if (iconPacks.indexOf(pack.name) >= 0) {
            root.classList.add('has-custom-icons');
        }
    });
};

module.exports = {
    apply() {
        atom.packages.onDidActivatePackage(() => checkPacks());
        atom.packages.onDidDeactivatePackage(() => checkPacks());

        init();

        // Font Size Settings

        atom.config.onDidChange('atom-material-ui.fonts.fontSize', (value) => {
            document.querySelector(':root').style.fontSize = value.newValue + 'px';
        });

        // Tab blending

        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => amu.toggleBlendTreeView(value.newValue));

        // className-toggling Settings

        atom.config.onDidChange('atom-material-ui.tabs.tintedTabBar', (value) => amu.toggleClass(value.newValue, 'tinted-tab-bar'));
        atom.config.onDidChange('atom-material-ui.tabs.compactTabs', (value) => amu.toggleClass(value.newValue, 'compact-tab-bar'));
        atom.config.onDidChange('atom-material-ui.ui.animations', (value) => amu.toggleClass(value.newValue, 'use-animations'));
        atom.config.onDidChange('atom-material-ui.ui.panelShadows', (value) => amu.toggleClass(value.newValue, 'panel-shadows'));
        atom.config.onDidChange('atom-material-ui.ui.panelContrast', (value) => amu.toggleClass(value.newValue, 'panel-contrast'));
        atom.config.onDidChange('atom-material-ui.treeView.compactList', (value) => amu.toggleClass(value.newValue, 'compact-tree-view'));
        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => {
            if (value.newValue && !atom.config.get('atom-material-ui.tabs.tintedTabBar')) {
                atom.config.set('atom-material-ui.tabs.tintedTabBar', true);
            }

            amu.toggleClass(value.newValue, 'blend-tree-view');
        });
    }
};
