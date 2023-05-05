import {loadedImages,registerImage} from './lazy.js'

let app = document.querySelector('#app');
const baseUrl = 'https://randomfox.ca/floof';
const generateButton = document.querySelector('#generateButton');
const cleanButton = document.querySelector('#cleanButton');
export let appendedImages = 0;

async function fetchData(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(err){
        throw new Error(err);
    }
}

function renderImages(foxes){
    const img = document.createElement('img');
    img.dataset.src = foxes.image;
    img.className = 'mx-auto mb-6 rounded-lg';
    img.width = '320';

    const container = document.createElement('div');
    container.className = 'py-4';
    container.append(img);

    appendedImages++;

    app.appendChild(container);
    printConsole();
    registerImage(container);
}

export function printConsole(){
    console.log(`⚪ Se han agregado ${appendedImages} imágenes`);
    console.log(`🟣 Se han cargado ${loadedImages} imágenes`);
    console.log("---------------------------------------");
}

function clearNodes(){
    const appAux = document.createElement('div');
    app.parentNode.insertBefore(appAux, app);
    app.remove();
    appAux.id = 'app';
    app = appAux;
    appendedImages = 0;
    loadedImages = 0;
}

const init = async () => {
    const result = await fetchData(baseUrl);
    renderImages(result);
}

generateButton.addEventListener('click',init);
cleanButton.addEventListener('click', clearNodes);

init();