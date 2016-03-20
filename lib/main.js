'use babel';
'use strict';

import fs from 'fs';
import config from './config-schema';
import settings from './settings';
import colorSettings from './color-settings';
import tabsSettings from './tabs-settings';
import treeViewSettings from './tree-view-settings';
import tinycolor from 'tinycolor2';
import { apply as updateSchema } from './update-config-schema';

export default {
    config,

    writeConfig(options) {
        var accentColor = atom.config.get('atom-material-ui.colors.accentColor').toRGBAString();
        var baseColor = atom.config.get('atom-material-ui.colors.abaseColor').toRGBAString();
        var accentTextColor = '#666';
        var luminance = tinycolor(baseColor).getLuminance();

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

    activate() {
        updateSchema();
        settings.apply();
        colorSettings.apply();
        setImmediate(() => tabsSettings.apply());
        this.writeConfig({ noReload: true });
    },

    deactivate() {
        treeViewSettings.toggleBlendTreeView(false);
    }
};
