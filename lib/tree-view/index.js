'use babel';

import toggleBlendTreeView from './toggle-blending-element';
import toggleClassName from '../helper/toggle-class-name';

const panels = document.querySelectorAll('atom-panel-container');
const observerConfig = { childList: true };
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs')));
});

// Observe panels for DOM mutations
Array.from(panels).forEach(panel => observer.observe(panel, observerConfig));

atom.packages.onDidActivatePackage((pkg) => {
    if (pkg.name === 'nuclide-file-tree') {
        toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
    }
});

atom.config.observe('atom-material-ui.treeView.blendTabs', (value) => {
    toggleBlendTreeView(value);
    toggleClassName('amu-blend-tree-view', value);
});

atom.config.observe('atom-material-ui.treeView.compactList', (value) => {
    toggleClassName('amu-compact-tree-view', value);
});
