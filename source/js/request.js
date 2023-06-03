import { getRank } from './utils.js';
import { getResponseFromAPI } from './app.js';

/**
 * 
 * @param {Object} data 
 * @returns {Promise} p
 */
export const getRequest = (data) => {
    return new Promise((resolve, reject) => {
        fetch('https://team12.jyh.sb/tarot?' + new URLSearchParams({
            first: config.cards[data[0]].name,
            second: config.cards[data[1]].name,
            third: config.cards[data[2]].name
        }), { mode: 'cors' }
        ).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

export const getAnswerAPI = async (message, data) => {
    const endpoint = 'https://api.openai.com/v1/completions';
    return new Promise((resolve, reject) => {
        const apiResponse = fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `I am a fortune teller who speaks using mystic language. Using the tarot cards ${data[0]}, ${data[1]}, and ${data[2]}, I will respond to your message with your fortune.\n\nHuman: ${message}\n\nAI:`,
                temperature: 0.75,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        apiResponse.then(res => {
            res.json().then(json => {
                resolve({ answer: json.choices[0].text });
                // console.log(json.choices[0].text);
            });
        });
    });
};

export const getAnswerLocal = async (data) => {
    if (localStorage.getItem('version') !== dbVersion) {
        localStorage.clear();
        localStorage.setItem('version', dbVersion);
        const res = await fetch('config/db.json');
        const json = await res.json();
        for (let i = 0; i < json.length; ++i) {
            const data = [];
            for (let j = 0; j < json[i].length; ++j) data.push({ s: json[i][j], used: 0 });
            localStorage.setItem(i, JSON.stringify(data));
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const key = getRank(data, config.cardPool, config.selectedLimit);
            const dbList = JSON.parse(localStorage.getItem(key.toString()));
            const dataList = [];
            for (let i = 0; i < dbList.length; ++i) {
                if (parseInt(dbList[i].used) === 0) dataList.push({ s: dbList[i].s, id: i });
            }
            const index = dataList[Math.floor(Math.random() * dataList.length)];
            dbList[index.id].used = 1;
            if (dataList.length === 1) {
                for (let i = 0; i < dbList.length; ++i) dbList[i].used = 0;
            }
            localStorage.setItem(key, JSON.stringify(dbList));
            resolve({ answer: index.s });
            reject(new Error('error occurred'));
        }, config.localDelay);
    });
};

export const getAnswer = (message, data) => {
    return (typeof dbVersion === 'undefined') ? getAnswerAPI(message, data) : getAnswerLocal(data);
};

// export const getAnswer = async (message, data) => {
//     const message = '';
//     const tarots = data.map(id => config.cards[id].name);
//     return await getResponseFromAPI(message, tarots);
// };

// module.exports = { getRequest, getAnswerLocal, getAnswer };
