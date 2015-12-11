'use babel';
'use strict';

import amu from './main';
import amuBindings from './amu-bindings';
import tinycolor from 'tinycolor2';

var init = function () {
    if (!localStorage.getItem('atom-material-ui:configUpdated')) {
        atom.config.set('atom-material-ui');
        amu.writeConfig({
            callback() {
                atom.notifications.addSuccess('There were breaking changes and Material UI had to reset its settings.');
                localStorage.setItem('atom-material-ui:configUpdated', true);
            }
        });
    }

    amu.toggleClass(atom.config.get('atom-material-ui.tabs.tintedTabBar'), 'tinted-tab-bar');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    amu.toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
    amuBindings.blendTabsScroll();
};

// Check if there are custom icons packages
var checkPacks = function () {
    var root = document.documentElement;

    root.classList.remove('has-custom-icons');

    var loadedPackages =  atom.packages.getActivePackages(),
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

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

        // Accent color

        atom.config.onDidChange('atom-material-ui.colors.accentColor', () => amu.writeConfig());
        atom.config.onDidChange('atom-material-ui.colors.abaseColor', (value) => {
            var baseColor = tinycolor(value.newValue.toHexString());

            if (baseColor.isValid() && atom.config.get('atom-material-ui.colors.genAccent')) {
                let accentColor = baseColor.complement().saturate(20).lighten(5);

                if (accentColor.isValid()) {
                    atom.config.set('atom-material-ui.colors.accentColor', accentColor.toHexString());
                }
            }
            amu.writeConfig();
        });
        atom.config.onDidChange('atom-material-ui.colors.predefinedColor', (value) => {
            switch (value.newValue) {
                case 'Amber':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#FFD54F');
                    atom.config.set('atom-material-ui.colors.accentColor', '#A28832');
                    break;
                case 'Blue':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#2196F3');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                case 'Blue Grey':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#607D8B');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                case 'Brown':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#795548');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                case 'Cyan':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#80DEEA');
                    atom.config.set('atom-material-ui.colors.accentColor', '#528C94');
                    break;
                case 'Green':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#AAD875');
                    atom.config.set('atom-material-ui.colors.accentColor', '#6F8853');
                    break;
                case 'Grey':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#7E7E7E');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                case 'Indigo':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#5C6BC0');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                case 'Lime':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#CDDC39');
                    atom.config.set('atom-material-ui.colors.accentColor', '#737F10');
                    break;
                case 'Orange':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#FFA726');
                    atom.config.set('atom-material-ui.colors.accentColor', '#9F6918');
                    break;
                case 'Pink':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#EC407A');
                    atom.config.set('atom-material-ui.colors.accentColor', '#46FFC1');
                    break;
                case 'Purple':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#7E57C2');
                    atom.config.set('atom-material-ui.colors.accentColor', '#B0E457');
                    break;
                case 'Red':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#EF5350');
                    atom.config.set('atom-material-ui.colors.accentColor', '#59FCFF');
                    break;
                case 'Teal':
                    atom.config.set('atom-material-ui.colors.abaseColor', '#009688');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
                    break;
                default:
                    atom.config.set('atom-material-ui.colors.abaseColor', '#009688');
                    atom.config.set('atom-material-ui.colors.accentColor', '#FFFFFF');
            }
        });

        // Font Size Settings

        atom.config.onDidChange('atom-material-ui.fonts.fontSize', () => amu.writeConfig());

        // Tab blending

        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => amu.toggleBlendTreeView(value.newValue));

        // className-toggling Settings

        atom.config.onDidChange('atom-material-ui.tabs.tintedTabBar', (value) => amu.toggleClass(value.newValue, 'tinted-tab-bar'));
        atom.config.onDidChange('atom-material-ui.ui.animations', (value) => amu.toggleClass(value.newValue, 'use-animations'));
        atom.config.onDidChange('atom-material-ui.ui.panelShadows', (value) => amu.toggleClass(value.newValue, 'panel-shadows'));
        atom.config.onDidChange('atom-material-ui.ui.panelContrast', (value) => amu.toggleClass(value.newValue, 'panel-contrast'));
        atom.config.onDidChange('atom-material-ui.treeView.compactList', (value) => amu.toggleClass(value.newValue, 'compact-tree-view'));
        atom.config.onDidChange('atom-material-ui.treeView.blendTabs', (value) => {
            amu.toggleClass(value.newValue, 'blend-tree-view');
            amuBindings.apply();
        });
    }
};
