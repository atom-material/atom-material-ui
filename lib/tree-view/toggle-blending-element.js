'use babel';

function getTreeViews() {
    const treeViews = [
        document.querySelector('.tree-view-resizer:not(.nuclide-ui-panel-component)'),
        document.querySelector('.remote-ftp-view'),
        (function isNuclideTreeView() {
            const nuclideTreeView = document.querySelector('.nuclide-file-tree-toolbar-container');

            if (nuclideTreeView) {
                return nuclideTreeView.closest('div[style*="display: flex;"]');
            }

            return null;
        }()),
    ];

    return Promise.resolve(treeViews);
}

function removeBlendingEl(treeView) {
    if (treeView) {
        const blendingEl = treeView.querySelector('.amu-tab-blender');

        if (blendingEl) {
            treeView.removeChild(blendingEl);
        }
    }
}

export default function toggleBlendTreeView(mustShowBlendItem) {
    getTreeViews()
        .then((treeViews) => {
            treeViews.forEach((treeView) => {
                if (treeView) {
                    const blendingEl = document.createElement('div');
                    const title = document.createElement('span');

                    blendingEl.classList.add('amu-tab-blender');
                    blendingEl.appendChild(title);

                    if (treeView && mustShowBlendItem) {
                        if (treeView.querySelector('.amu-tab-blender')) {
                            removeBlendingEl(treeView);
                        }
                        treeView.insertBefore(blendingEl, treeView.firstChild);
                    } else if (treeView && !mustShowBlendItem) {
                        removeBlendingEl(treeView);
                    } else if (!treeView && mustShowBlendItem) {
                        if (
                            atom.packages.getActivePackage('tree-view') ||
                            atom.packages.getActivePackage('Remote-FTP') ||
                            atom.packages.getActivePackage('nuclide')
                        ) {
                            return setTimeout(() => {
                                toggleBlendTreeView(mustShowBlendItem);
                            }, 2000);
                        }
                    }
                }

                return null;
            });
        });
}
