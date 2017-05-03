'use babel';

import tinycolor from 'tinycolor2';

export default function buildColorSettings(baseColor = '#009688', accentColor = '#FFFFFF') {
    const newAccent = (typeof accentColor === 'object') ?
        accentColor.toHexString() :
        accentColor;

    const newBase = (typeof baseColor === 'object') ?
        baseColor.toHexString() :
        baseColor;

    const luminance = tinycolor(newBase).getLuminance();
    let accentTextColor = '#666';

    if (luminance <= 0.3 && luminance > 0.22) {
        accentTextColor = 'rgba(255,255,255,0.9)';
    } else if (luminance <= 0.22) {
        accentTextColor = 'rgba(255,255,255,0.8)';
    } else if (luminance > 0.3) {
        accentTextColor = 'rgba(0,0,0,0.6)';
    }

    return `
        @accent-color: ${newAccent};
        @accent-text-color: ${accentTextColor};
        @base-color: ${newBase};
    `;
}
