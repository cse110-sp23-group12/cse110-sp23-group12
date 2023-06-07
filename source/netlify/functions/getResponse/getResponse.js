const fetch = require('node-fetch')
const querystring = require('querystring')

const handler = async function (event, context) {
    if (!context.clientContext && !context.clientContext.identity) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                msg: 'No identity instance detected.',
            }),
        }
    }
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };
    const ref = event.headers.referer || '';
    if (!ref.includes('cse110-sp23-group12.github.io') && !ref.includes('cse110.jyh.com') && !ref.includes('localhost')) {
        return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ answer: 'Forbidden' })
        }
    }
    const API_KEY = process.env.API_KEY;
    const endpoint = 'https://api.openai.com/v1/completions';
    const querys = querystring.parse(event.rawQuery);
    const first = querys.first;
    const second = querys.second;
    const third = querys.third;
    const message = querys.message;

    const input = `I am a fortune teller who speaks using mystic language. Using the tarot cards ${first}, ${second}, and ${third}, I will respond to your message with your fortune.\n\nHuman: ${message}\n\nAI:`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: input,
                temperature: 0.75,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        const data = await response.json();
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ answer: data.choices[0].text.trim() })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ answer: error.message }),
        }
    }
}

module.exports = { handler }
