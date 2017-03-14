'use babel';

export default function toggleClassName(className, mustAddClass) {
    const root = document.documentElement;

    if (mustAddClass) {
        root.classList.add(className);
    } else {
        root.classList.remove(className);
    }
}
