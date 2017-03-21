'use babel';

import setFontSize from '../../lib/fonts/set-font-size';

describe('Font size setter', () => {
    it('should be able to change root element\'s font-size', () => {
        const root = document.documentElement;

        expect(root.style.fontSize).toBe('');
        setFontSize(22);
        expect(root.style.fontSize).toBe('22px');
    });
});
