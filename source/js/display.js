import { randomChoose, toggleSound, setSound } from './utils.js';
import { getAnswer } from './request.js';
const method = localStorage.getItem('method');
const selectedCards = randomChoose((method === 'gpt') ? config.cardPool : config.cardNumber, config.selectedLimit);
console.log((method === 'gpt') ? config.cardPool : config.cardNumber);
console.log(selectedCards);
const cookieList = Array(config.cardPool).fill(0);
let totalSelected = 0;
// const promiseList = [getAnswer(selectedCards)];
const message = localStorage.getItem('userMessage');
console.log('message: ', message);
// const tarots = selectedCards.map(id => config.cards[id].name);
// const promiseList = [getResponseFromAPI(message, tarots)];
const valid = Array(config.cardPool).fill(1);
const animationPromise = [];
const promiseList = [getAnswer(message, selectedCards)];
const soundToggle = document.getElementById('sound-toggle');

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
    setTimeout(() => {
        plate.appendChild(bigCard);
    }, 0);
    setTimeout(() => {
        bigCard.setAttribute('style', `animation: move-card-${kth} 2s 1 forwards;`);
    }, 1000);
    return new Promise(resolve => setTimeout(resolve, 3000));
};

window.onload = () => {
    console.log('sound status = ', localStorage.getItem('soundOn'));
    setSound(soundToggle, localStorage.getItem('soundOn'));
    insertCookies();
    insertResults();
    cookieList.forEach((card) => {
        if (!(card === 0)) {
            card.addEventListener('click', () => {
                select(card.id.slice(6));
            });
        }
    });
    soundToggle.addEventListener('click', () => {
        localStorage.setItem('soundOn', toggleSound(soundToggle));
    });
    // loadResultPage();
};

/**
 * Event handler for selecting a cookie.
 * 
 * @param {string} id - The ID of the selected cookie.
 * @returns {Promise} A promise that resolves after the selection process.
 */
const select = async (id) => {
    if (!valid[id]) return;
    const crackAudio = new Audio('audio/crack4.mp3');
    crackAudio.play();
    valid[id] = 0;
    const c = selectedCards[totalSelected];
    if (parseInt(totalSelected) === parseInt(config.selectedLimit)) return;
    // hide the original cookie 
    const ck = document.getElementById(`cookie${id}`).children[0];
    ck.classList.add('display-none');
    // get the display-bakeware div
    const displayBakeware = document.getElementById('display-bakeware');
    // create a new div for cracking cookie
    const crackingCookie = document.createElement('div');
    // set the class 
    crackingCookie.setAttribute('class', 'cracking-cookie');
    // create img element for each part of the cracking cookie
    const leftCookie = document.createElement('img');
    const rightCookie = document.createElement('img');
    const crackEffect = document.createElement('img');
    leftCookie.setAttribute('src', 'img/animationPic/cookie_left.png');
    rightCookie.setAttribute('src', 'img/animationPic/cookie_right.png');
    crackEffect.setAttribute('src', 'img/animationPic/crack.png');
    leftCookie.setAttribute('class', 'left-cookie');
    rightCookie.setAttribute('class', 'right-cookie');
    crackEffect.setAttribute('class', 'crack-effect');
    // add both left and right cookie and crack-effect to cracking-cookie
    crackingCookie.appendChild(leftCookie);
    crackingCookie.appendChild(rightCookie);
    crackingCookie.appendChild(crackEffect);
    // add cracking-cookie to display-bakeware
    displayBakeware.appendChild(crackingCookie);

    setTimeout(() => {
        // remove crackingcookie after 1s
        displayBakeware.removeChild(crackingCookie);
    }, 1000);

    animationPromise.push(cardAnimation(c, totalSelected++));
    if (totalSelected === config.selectedLimit) {
        Promise.all(animationPromise).then((response) => show());
    }
};

/**
 * Displays the final fortune results.
 */

const show = () => {
    // Promise.all(animationPromise).then(async () => {
    //     const submitButton = document.getElementById('display-submit-button');
    //     submitButton.classList.remove('display-button-off');
    //     submitButton.classList.add('display-button');
    //     submitButton.addEventListener('click', () => {
    //         loadResultPage();
    //     });
    // });
    Promise.all(animationPromise).then(async () => {
        const submitButton = document.getElementById('display-bakeware');
        for (let i = 0; i < 6; ++i) {
            submitButton.children[i].classList.add('display-none');
        }
        const buttonTitle = document.createElement('div');
        submitButton.classList.add('big-submit-button');
        buttonTitle.setAttribute('style', 'align-self: center; font-family: "Titan One", cursive; font-size: 4vw; color: #ae733f;');
        buttonTitle.innerHTML = 'Reveal Fortune';
        submitButton.appendChild(buttonTitle);
        submitButton.addEventListener('click', () => {
            loadResultPage();
        });
    });
};

const loadResultPage = () => {
    const block = document.getElementsByClassName('result-response')[0];
    // Promise.all(animationPromise).then(async () => {
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
    // });
};
