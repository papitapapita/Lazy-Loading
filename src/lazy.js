import {appendedImages,printConsole } from "./index.js";

export let loadedImages = 0;

const load = (entry) => {
    const node = entry.target;
    const img = node.firstChild;
    const url = img.dataset.src;
    img.src = url;
    img.onload = img.classList.add('visible');
    loadedImages++;
    printConsole();
    observer.unobserve(node);
};

const observer = new IntersectionObserver(entries => {
    entries
        .filter(entry => entry.isIntersecting)
        .forEach(load);
}, {
    root: null,
    margin: 0,
    threshold: 1
});

export const registerImage = (image) => {
    observer.observe(image);
}



