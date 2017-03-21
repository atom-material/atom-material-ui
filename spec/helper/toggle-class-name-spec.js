'use babel';

import toggleClassName from '../../lib/helper/toggle-class-name';

describe('className toggle helper', () => {
    const root = document.documentElement;

    it('should add a className to the root element', () => {
        expect(root.classList.contains('testClass')).toBe(false);
        toggleClassName('testClass', true);
        expect(root.classList.contains('testClass')).toBe(true);
    });

    it('should remove a className from the root element', () => {
        expect(root.classList.contains('testClass')).toBe(true);
        toggleClassName('testClass', false);
        expect(root.classList.contains('testClass')).toBe(false);
    });
});
