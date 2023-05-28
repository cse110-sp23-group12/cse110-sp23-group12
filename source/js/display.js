import { randomChoose } from './utils.js';
import { getAnswer } from './request.js';

const selectedCards = randomChoose(config.cardPool, config.selectedLimit);
// for (let i = 0; i < selectedCards.length; ++i) {
//     console.log(config.cards[selectedCards[i]].name);
// }
// console.log(selectedCards);
const cookieList = Array(config.cardPool).fill(0);
let totalSelected = 0;
const promiseList = [getAnswer(selectedCards)];

const insertCookies = () => {
    const cookieContainer = document.getElementById('display-bakeware');
    const ids = randomChoose(config.cardPool, config.cardNumber);
    for (let i = 0; i < config.cardNumber; ++i) {
        const divDom = document.createElement('div');
        divDom.setAttribute('class', 'display-cookie');
        divDom.setAttribute('id', 'cookie' + ids[i].toString());
        const imgDom = document.createElement('img');
        imgDom.setAttribute('src', 'img/cookie1.svg');
        imgDom.setAttribute('alt', 'cookie');
        imgDom.setAttribute('draggable', 'false');
        divDom.appendChild(imgDom);
        cookieContainer.appendChild(divDom);
        cookieList[ids[i]] = divDom;
    }
};

const insertResults = () => {
    const resultContainer = document.getElementById('result-cards');
    for (let i = 0; i < selectedCards.length; ++i) {
        const divDom = document.createElement('div');
        divDom.setAttribute('class', 'result-description');
        divDom.setAttribute('id', `result-card${i}`);
        const pTitleDom = document.createElement('p');
        const pDesDom = document.createElement('p');
        pTitleDom.setAttribute('class', 'card-title');
        pDesDom.setAttribute('class', 'card-description');
        pTitleDom.innerText = config.cards[selectedCards[i]].name;
        pDesDom.innerText = config.cards[selectedCards[i]].description;
        divDom.appendChild(pTitleDom);
        divDom.appendChild(pDesDom);
        resultContainer.appendChild(divDom);
    }
};

window.onload = () => {
    insertCookies();
    insertResults();
    cookieList.forEach((card) => {
        if (!(card === 0)) {
            card.addEventListener('click', () => {
                select(card.id.slice(6));
            });
        }
    });
};

const select = (id) => {
    const c = selectedCards[totalSelected];
    if (parseInt(totalSelected) === parseInt(config.selectedLimit)) return;
    cookieList[id].children[0].setAttribute('src', 'img/cookie0.svg');
    const imgDom = document.getElementById(`selected-cookie${totalSelected}`);
    imgDom.classList.remove('display-none');
    imgDom.setAttribute('src', `img/${config.cards[c].filename}`);
    if (++totalSelected === config.selectedLimit) show();
};

const show = () => {
    Promise.all(promiseList).then(res => {
        setTimeout(() => {
            document.getElementById('result-response-text').innerText = res[0].answer;
            document.getElementById('display-document').classList.add('display-none');
            document.getElementById('display-document').classList.remove('display-document');
            document.getElementById('result-document').classList.remove('display-none');
            document.getElementById('result-document').classList.add('result-document');
        }, 1000);
    });
};
