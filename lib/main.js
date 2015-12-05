'use babel';

import fs from 'fs';
import configSchema from './config-schema';
import amuSettings from './amu-settings';
import amuBindings from './amu-bindings';

export default {
    config: configSchema,

    getContrast(color) {
        // Finds a contrasting text color
        r = parseInt(color.substr(1, 2), 16);
        g = parseInt(color.substr(3, 2), 16);
        b = parseInt(color.substr(5, 2), 16);
        yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

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
        root = document.documentElement

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toHexString(),
            baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toHexString(),
            accentTextColor = this.getContrast(baseColor),
            fontSize = atom.config.get('atom-material-ui.fonts.fontSize');

        var config =
            `
            @accent-color: ${accentColor};
            @accent-text-color: ${accentTextColor};
            @base-color: ${baseColor};
            :root {
                font-size: ${fontSize}px;
            }
            `;

        fs.writeFile(`${__dirname}/../styles/custom.less`, config, 'utf8', () => {
            if (!options.noReload) {
                themePack = atom.packages.getLoadedPackage('atom-material-ui');
                themePack.deactivate();
                themePack.activate();
            }
            if (options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    toggleBlendTreeView(bool) {
        var removeBlendingEl = function () {
            var treeView = document.querySelector('.tree-view'),
                blendingEl = document.querySelector('.tree-view .tabBlender');

            if (blendingEl) {
                treeView.removeChild(blendingEl);
            }
        };
        setImmediate(() => {
            var treeView = document.querySelector('.tree-view'),
                treeViewScroller = document.querySelector('.tree-view-scroller');
                blendingEl = document.createElement('li');

            blendingEl.classList.add('tabBlender');
            blendingEl.innerHTML = 'Projects';

            if (treeView && bool) {
                if (document.querySelectorAll('.tree-view .tabBlender').length) {
                    removeBlendingEl();
                }
                treeView.appendChild(blendingEl);
            } else if (treeView && !bool) {
                removeBlendingEl();
            }
        });
    },

    activate() {
        amuSettings.apply();
        setImmediate(() => amuBindings.apply());
        this.writeConfig({ noReload: true });
    }
}
