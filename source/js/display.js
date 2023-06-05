import { randomChoose } from './utils.js';
import { getAnswer } from './request.js';
import { getResponseFromAPI } from './app.js';
const selectedCards = randomChoose(config.cardPool, config.selectedLimit);
const cookieList = Array(config.cardPool).fill(0);
let totalSelected = 0;
// const promiseList = [getAnswer(selectedCards)];
const message = localStorage.getItem('userMessage');
console.log('message: ', message);
const tarots = selectedCards.map(id => config.cards[id].name);
// const promiseList = [getResponseFromAPI(message, tarots)];
const valid = Array(config.cardPool).fill(1);
const animationPromise = [];
const promiseList = [getAnswer(message, selectedCards)];

/**
 * Inserts cookies into the cookie container.
 */
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

/**
 * Inserts results into the result container.
 */
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

/**
 * Performs the card animation.
 * 
 * @param {string} id - The ID of the card to animate.
 * @param {number} kth - The kth card being animated.
 * @returns {Promise} A promise that resolves after the animation.
 */
const cardAnimation = async (id, kth) => {
    const plate = document.getElementById('plate-container');
    const bigCard = document.createElement('img');
    bigCard.setAttribute('src', `img/${config.cards[id].filename}`);
    bigCard.setAttribute('class', 'big-card');
    plate.appendChild(bigCard);

    setTimeout(() => {
        bigCard.setAttribute('style', `animation: move-card-${kth} 2s 1 forwards;`);
    }, 1000);
    return new Promise(resolve => setTimeout(resolve, 3000));
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

/**
 * Event handler for selecting a cookie.
 * 
 * @param {string} id - The ID of the selected cookie.
 * @returns {Promise} A promise that resolves after the selection process.
 */
const select = async (id) => {
    if (!valid[id]) return;
    valid[id] = 0;
    const c = selectedCards[totalSelected];
    if (parseInt(totalSelected) === parseInt(config.selectedLimit)) return;
    // cookieList[id].children[0].setAttribute('src', 'img/cookie0.svg');
    const ck = document.getElementById(`cookie${id}`).children[0];
    ck.classList.add('display-none');

    animationPromise.push(cardAnimation(c, totalSelected++));
    if (totalSelected === config.selectedLimit) {
        Promise.all(animationPromise).then(response => show());
    }
};

/**
 * Displays the final fortune results.
 */
const show = () => {
    const block = document.getElementsByClassName('result-response')[0];
    Promise.all(animationPromise).then(async () => {
        setTimeout(() => {
            document.getElementById('display-document').classList.add('display-none');
            document.getElementById('display-document').classList.remove('display-document');
            document.getElementById('result-document').classList.remove('display-none');
            document.getElementById('result-document').classList.add('result-document');
        }, 500);
        Promise.all(promiseList).then((responses) => {
            block.classList.remove('loading-animation');
            document.getElementsByClassName('result-response-title')[0].innerText = 'Your Fortune:';
            document.getElementById('result-response-text').innerText = responses[0].answer;
        });
    });
};
