'use babel';

import './fonts';
import './tab-bar';
import './tree-view';
import './user-interface';
import toggleBlendTreeView from './tree-view/toggle-blending-element';
import config from './config-schema.json';

const root = document.documentElement;

export default {
    config,

    activate() {
        root.classList.add('amu-tinted-tab-bar');
        root.classList.add('amu-panel-contrast');
        root.classList.add('amu-panel-shadows');
        root.classList.add('amu-use-animations');
        root.classList.add('amu-paint-cursor');
        root.classList.add('amu-blend-tree-view');

        toggleBlendTreeView(true);
    },

    deactivate() {
        root.classList.remove('amu-tinted-tab-bar');
        root.classList.remove('amu-panel-contrast');
        root.classList.remove('amu-panel-shadows');
        root.classList.remove('amu-use-animations');
        root.classList.remove('amu-paint-cursor');
        root.classList.remove('amu-blend-tree-view');

        toggleBlendTreeView(false);
    },
};
