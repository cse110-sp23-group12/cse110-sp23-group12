import { randomChoose } from './utils.js';
import { getAnswer } from './request.js';

const selectedCards = Array(config.cardPool).fill(0);
const cardList = Array(config.cardPool).fill(0);
let totalSelected = 0;
let reset = 0;

const insertCards = () => {
    const cardContainer = document.getElementById('card-container');
    const ids = randomChoose(config.cardPool, config.cardNumber);
    for (let i = 0; i < config.cardNumber; ++i) {
        const divDom = document.createElement('div');
        divDom.setAttribute('class', 'col3 card');
        divDom.setAttribute('id', 'card' + ids[i].toString());
        // divDom.setAttribute('onclick', 'select(' + ids[i].toString() + ', this)');
        divDom.setAttribute('style', 'background-image: url("img/' + config.cards[ids[i]].filename + '")');
        const pResponseDom = document.createElement('p');
        pResponseDom.setAttribute('id', 'card' + ids[i].toString() + '-response');
        divDom.appendChild(pResponseDom);
        cardContainer.appendChild(divDom);

        cardList[ids[i]] = divDom;
    }
};

window.onload = () => {
    insertCards();
    cardList.forEach((card) => {
        if (!(card === 0)) {
            card.addEventListener('click', () => {
                select(card.id.slice(4));
            });
        }
    });
    document.getElementById('submit-button').addEventListener('click', () => {
        submit();
    });
    // console.log(cardList);
};

const select = (id) => {
    if (reset) return;
    // console.log(cardList[id]);
    // console.log(selectedCards[id]);
    if (selectedCards[id]) {
        cardList[id].classList.remove('selected');
        --totalSelected;
    } else {
        // console.log(totalSelected)
        // console.log(parseInt(config.selectedLimit));
        // console.log(totalSelected !== parseInt(config.selectedLimit));
        if (totalSelected >= parseInt(config.selectedLimit)) return;
        cardList[id].classList.add('selected');
        ++totalSelected;
    }
    selectedCards[id] ^= 1;
};

const submit = () => {
    if (totalSelected !== parseInt(config.selectedLimit)) return;
    if (reset) {
        for (const i in cardList) {
            if (!selectedCards[i]) continue;
            cardList[i].style['background-image'] = 'url("img/' + config.cards[i].filename + '")';
            cardList[i].children[0].innerHTML = '';
            cardList[i].classList.remove('selected');
            selectedCards[i] = 0;
            --totalSelected;
        }
        document.getElementById('submit-button').innerHTML = 'submit';
        reset = 0;
        return;
    }
    // let promiseList = [];
    const data = [];
    const selectedID = [];
    for (const i in cardList) {
        if (!selectedCards[i]) continue;
        cardList[i].style['background-image'] = null;
        cardList[i].children[0].innerHTML = 'Animation...';
        selectedID.push(i);
        data.push(parseInt(i));
        // promiseList.push(getRequest('https://team12.jyh.sb/mysticalmessage=' + config.cards[i].prompt));
    }
    const promiseList = [getAnswer(data)];
    reset = 1;
    Promise.all(promiseList).then(res => {
        for (const index in selectedID) {
            const i = parseInt(selectedID[index]);
            cardList[i].style['background-image'] = 'url("img/' + config.cards[i].filename + '")';
            cardList[i].children[0].innerHTML = res[0].answer;
        }
        document.getElementById('submit-button').innerHTML = 'reset';
    });
};
