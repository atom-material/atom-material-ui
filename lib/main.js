'use babel';
'use strict';

import fs from 'fs';
import config from './config-schema';
import amuSettings from './amu-settings';
import amuBindings from './amu-bindings';

var treeViews;

setImmediate(() => {
    treeViews = [
        document.querySelector('.tree-view-resizer'),
        document.querySelector('.remote-ftp-view'),
        function () {
            if (document.querySelector('.nuclide-file-tree')) {
                return document.querySelector('.nuclide-file-tree').parentElement.parentElement;
            }
        }()
    ];
});

var removeBlendingEl = function() {
    treeViews.forEach((treeView) => {
        if (treeView) {
            var blendingEl = treeView.querySelector('.tabBlender');

            if (blendingEl) {
                treeView.removeChild(blendingEl);
            }
        }
    });
};

atom.workspace.onDidAddPane(() => {
    setImmediate(() => amuBindings.apply());
});

export default {
    config,

    getContrast(color) {
        // Finds a contrasting text color
        var r = parseInt(color.substr(1, 2), 16);
        var g = parseInt(color.substr(3, 2), 16);
        var b = parseInt(color.substr(5, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        if (yiq >= 220) {
            return `desaturate(darken(${color}, 40%), 25%)`;
        }
        if (yiq >= 190 && yiq < 220) {
            return `desaturate(darken(${color}, 35%), 20%)`;
        }
        if (yiq >= 130 && yiq < 190) {
            return `desaturate(darken(${color}, 25%), 20%)`;
        }
        if (yiq < 130) {
            return `lighten(${color}, 60%)`;
        }
    },

    toggleClass(boolean, className) {
        var root = document.querySelector('atom-workspace');

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toHexString();
        var baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toHexString();
        var accentTextColor = this.getContrast(baseColor);
        var fontSize = atom.config.get('atom-material-ui.fonts.fontSize');

        /**
        * This is kind of against Airbnb's stylguide, but produces a much
        * better output and is readable.
        */
        var config = `@accent-color: ${accentColor};\n` +
                     `@accent-text-color: ${accentTextColor};\n` +
                     `@base-color: ${baseColor};\n` +
                     `:root {\n` +
                     `   font-size: ${fontSize}px !important;\n` +
                     `}\n`;

        fs.writeFile(`${__dirname}/../styles/custom.less`, config, 'utf8', () => {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atom-material-ui');

                themePack.deactivate();
                setImmediate(() => themePack.activate());
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    toggleBlendTreeView(bool) {
        setImmediate(() => {
            treeViews.forEach((treeView) => {
                if (treeView) {
                    var blendingEl = document.createElement('div');
                    var title = document.createElement('span');

                    blendingEl.classList.add('tabBlender');
                    blendingEl.appendChild(title);

                    if (treeView && bool) {
                        if (treeView.querySelector('.tabBlender')) {
                            removeBlendingEl();
                        }
                        treeView.insertBefore(blendingEl, treeView.firstChild);
                    } else if (treeView && !bool) {
                        removeBlendingEl();
                    } else if (!treeView && bool) {
                        if (atom.packages.getActivePackage('tree-view') || atom.packages.getActivePackage('Remote-FTP') || atom.packages.getActivePackage('nuclide')) {
                            return setTimeout(() => {
                                this.toggleBlendTreeView(bool);
                                setImmediate(() => amuBindings.apply());
                            }, 2000);
                        }
                    }
                }
            });
        });
    },

    activate() {
        amuSettings.apply();
        setImmediate(() => amuBindings.apply());
        this.writeConfig({ noReload: true });
    },

    deactivate() {
        this.toggleBlendTreeView(false);
    }
};
