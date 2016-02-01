'use babel';
'use strict';

describe('AMU tabs options', () => {
    beforeEach(() => {
        this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(this.workspace);

        waitsForPromise('Theme Activation', () => {
            return atom.packages.activatePackage('atom-material-ui');
        });
    });

    it('should be able to toggle tab-bar size', () => {
        atom.config.set('atom-material-ui.tabs.compactTabs', false);
        expect(this.workspace.classList.contains('compact-tab-bar')).toBe(false);

        atom.config.set('atom-material-ui.tabs.compactTabs', true);
        expect(this.workspace.classList.contains('compact-tab-bar')).toBe(true);
    });

    it('should be able to toggle tab-bar size', () => {
        atom.config.set('atom-material-ui.tabs.tintedTabBar', false);
        expect(this.workspace.classList.contains('tinted-tab-bar')).toBe(false);

        atom.config.set('atom-material-ui.tabs.tintedTabBar', true);
        expect(this.workspace.classList.contains('tinted-tab-bar')).toBe(true);
    });
});
