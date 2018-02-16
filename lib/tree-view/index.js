'use babel';

import toggleClassName from '../helper/toggle-class-name';

atom.config.observe('atom-material-ui.treeView.compactTreeView', (value) => {
    toggleClassName('amu-compact-tree-view', value);
});
