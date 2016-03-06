'use babel';
'use strict';

import fs from 'fs';
import config from './config-schema';
import amuSettings from './amu-settings';
import amuColorSettings from './amu-color-settings';
import amuBindings from './amu-bindings';
import tinycolor from 'tinycolor2';

var treeViews;

var setTreeViews = function() {
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
};

var removeBlendingEl = function() {
    setTreeViews();
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

    toggleClass(boolean, className) {
        var root = document.querySelector('atom-workspace');

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toRGBAString();
        var baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toRGBAString();
        var accentTextColor = '#666';
        var luminance = tinycolor(baseColor).getLuminance();

        console.log(luminance);

        if (luminance <= 0.3 && luminance > 0.22) {
            accentTextColor = 'rgba(255,255,255,0.9)';
        } else if (luminance <= 0.22) {
            accentTextColor = 'rgba(255,255,255,0.8)';
        } else if (luminance > 0.3) {
            accentTextColor = 'rgba(0,0,0,0.6)';
        }

        /**
        * This is kind of against Airbnb's stylguide, but produces a much
        * better output and is readable.
        */
        var config = `@accent-color: ${accentColor};\n` +
                     `@accent-text-color: ${accentTextColor};\n` +
                     `@base-color: ${baseColor};\n`;

        fs.writeFile(`${__dirname}/../styles/custom.less`, config, 'utf8', () => {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atom-material-ui');

                if (themePack) {
                    themePack.deactivate();
                    setImmediate(() => themePack.activate());
                }
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    toggleBlendTreeView(bool) {
        setTreeViews();
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
        amuColorSettings.apply();
        setImmediate(() => amuBindings.apply());
        this.writeConfig({ noReload: true });
    },

    deactivate() {
        this.toggleBlendTreeView(false);
    }
};
