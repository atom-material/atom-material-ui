'use babel';
'use strict';

var oldConfigs = [
    'fonts.useRoboto',
    'fonts.useRobotoInUI',
    'panels',
    'tabs.rippleAccentColor',
    'tabs.showTabIcons',
    'tabs.tabSize',
    'tabs.tabMinWidth',
    'treeView.compactTreeView',
    'ui.accentColor',
    'ui.disableAnimations',
    'ui.slimScrollbar',
    'accentColor',
    'compactTreeView',
    'disableAnimations',
    'rippleAccentColor',
    'showTabIcons',
    'slimScrollbar',
    'tabMinWidth',
    'tabSize',
    'useRoboto',
    'useRobotoInUI'
];

function apply() {
    oldConfigs.forEach((option) => {
        atom.config.unset(`atom-material-ui.${option}`);
    });
}

export default {
    apply
};
