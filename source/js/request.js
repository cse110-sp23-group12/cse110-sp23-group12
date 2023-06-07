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

/**
 * Uses the user's input and the tarot cards chosen to craft a prompt wrapper
 * and retrieve a unique fortune made by the GPT API.
 * @param {*} message the user's inputted message
 * @param {*} tarots three tarot card ids
 * @returns the fortune produced by GPT
 */
export const getAnswerAPI = async (message, data) => {
    const keyPromise = await fetch('https://team12-fortune-cookie.netlify.app/.netlify/functions/getOpenaiKey');
    const key = (await keyPromise.json()).secret;
    return new Promise((resolve, reject) => {
        const apiResponse = fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `I am a fortune teller who speaks using mystic language. Using the tarot cards ${config.cards[parseInt(data[0])].prompt}, ${config.cards[parseInt(data[1])].prompt}, and ${config.cards[parseInt(data[2])].prompt}, I will respond to your message with your fortune.\n\nHuman: ${message}\n\nAI:`,
                temperature: 0.75,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        apiResponse.then(res => {
            res.json().then(json => {
                console.log(json);
                resolve({ answer: json.choices[0].text });
            });
        }).catch(err => {
            reject(err);
        });
    });
};

/**
 * Retrieves an answer locally from the database.
 * If the local database version is outdated, it updates the database from a JSON file.
 * 
 * @param {Array<number>} data - The data used to retrieve the answer.
 * @returns {Promise<{ answer: string }>} A promise that resolves to an object containing the answer.
 */
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

// export const getAnswer = (data) => {
//     return (typeof dbVersion === 'undefined') ? getRequest(data) : getAnswerLocal(data);
// };

/**
 * Retrieves an answer either from the local database or from an API based on the availability of `dbVersion`.
 * 
 * @param {Array<number>} data - The data used to retrieve the answer.
 * @returns {Promise<string>} A promise that resolves to the answer string.
 */
export const getAnswer = (message, data) => {
    return (typeof dbVersion === 'undefined') ? getAnswerAPI(message, data) : getAnswerLocal(data);
};
// export const getAnswer = async (data) => {
//     const message = '';
//     const tarots = data.map(id => config.cards[id].name);
//     return await getResponseFromAPI(message, tarots);
// };

// module.exports = { getRequest, getAnswerLocal, getAnswer };
