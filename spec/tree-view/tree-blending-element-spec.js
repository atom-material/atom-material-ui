'use babel';

import toggleBlendTreeView from '../../lib/tree-view/toggle-blending-element';

describe('Blending tree-view and tab-bar', () => {
    let workspace;

    beforeEach(() => {
        workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(workspace);

        waitsForPromise('Theme Activation', () => (
            atom.packages.activatePackage('atom-material-ui')
        ));

        waitsForPromise('Tree-view Activation', () => (
            atom.packages.activatePackage('tree-view')
        ));
    });

    it('should add the blending element to the tree-view', () => {
        let tabBlender;

        runs(() => toggleBlendTreeView(true));

        waitsFor(() => {
            tabBlender = document.querySelector('.amu-tab-blender');
            return tabBlender;
        }, 'tree blending element attachment', 1);

        runs(() => expect(tabBlender).not.toBe(null));
    });
});
