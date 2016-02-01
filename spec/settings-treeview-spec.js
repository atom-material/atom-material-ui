'use babel';
'use strict';

describe('AMU tree-view options', () => {
    beforeEach(() => {
        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage('atom-material-ui');
        });
        waitsForPromise('tree-view activation', () => {
            return atom.packages.activatePackage('tree-view');
        });

        this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(this.workspace);
    });

    it('should be able to toggle compact tree view items', () => {
        atom.config.set('atom-material-ui.treeView.compactList', false);
        expect(this.workspace.classList.contains('compact-tree-view')).toBe(false);

        atom.config.set('atom-material-ui.treeView.compactList', true);
        expect(this.workspace.classList.contains('compact-tree-view')).toBe(true);
    });

    // FIXME: Should pass this test.
    // it('should be able to blend with tab-bar', () => {
    //     atom.config.set('atom-material-ui.treeView.blendTabs', false);
    //     expect(document.querySelector('.tabBlender')).toBe(null);
    //
    //     atom.config.set('atom-material-ui.treeView.blendTabs', true);
    //     expect(document.querySelector('.tabBlender')).not.toBe(null);
    // });
});
