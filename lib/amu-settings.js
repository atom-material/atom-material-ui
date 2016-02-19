'use babel';
'use strict';

import amu from './main';
import amuBindings from './amu-bindings';
import tinycolor from 'tinycolor2';
import colorTemplates from './color-templates';

var toCamelCase = function(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
};

var init = function() {
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
    amu.toggleClass(atom.config.get('atom-material-ui.tabs.compactTabs'), 'compact-tab-bar');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelShadows'), 'panel-shadows');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.panelContrast'), 'panel-contrast');
    amu.toggleClass(atom.config.get('atom-material-ui.ui.animations'), 'use-animations');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.compactList'), 'compact-tree-view');
    amu.toggleClass(atom.config.get('atom-material-ui.treeView.blendTabs'), 'blend-tree-view');
    amu.toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
};

// Check if there are custom icons packages
var checkPacks = function() {
    var root = document.documentElement;
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

        // Accent color

        atom.config.onDidChange('atom-material-ui.colors.accentColor', (value) => {
            var accentColor = tinycolor(value.newValue.toHexString());

            if (!accentColor.isValid()) {
                return atom.notifications.addError(`The selected color <code>${value.newValue.toHexString()}</code> is not a valid HEX value. Try another!. This is a bug within a core package, settings-view, and has been <a href="https://github.com/atom/settings-view/issues/712">reported</a>.`, { dismissable: true });
            }
            amu.writeConfig();
        });
        atom.config.onDidChange('atom-material-ui.colors.abaseColor', (value) => {
            var baseColor = tinycolor(value.newValue.toHexString());

            if (!baseColor.isValid()) {
                return atom.notifications.addError(`The selected color <code>${value.newValue.toHexString()}</code> is not a valid HEX value. Try another!. This is a bug within a core package, settings-view, and has been <a href="https://github.com/atom/settings-view/issues/712">reported</a>.`, { dismissable: true });
            }
            if (baseColor.isValid() && atom.config.get('atom-material-ui.colors.genAccent')) {
                let accentColor = baseColor.complement().saturate(20).lighten(5);

                if (accentColor.isValid()) {
                    atom.config.set('atom-material-ui.colors.accentColor', accentColor.toHexString());
                }
            }
            amu.writeConfig();
        });
        atom.config.onDidChange('atom-material-ui.colors.predefinedColor', (value) => {
            var newValue = toCamelCase(value.newValue);

            atom.config.set('atom-material-ui.colors.abaseColor', colorTemplates[newValue].base);
            atom.config.set('atom-material-ui.colors.accentColor', colorTemplates[newValue].accent);
        });

        // Font Size Settings

        atom.config.onDidChange('atom-material-ui.fonts.fontSize', () => amu.writeConfig());

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
            amuBindings.apply();
        });
    }
};
