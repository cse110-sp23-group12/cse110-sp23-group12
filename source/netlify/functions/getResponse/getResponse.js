const fetch = require('node-fetch');
const querystring = require('querystring');

/**
 * Lambda function handler that processes a request and returns a response.
 *
 * @param {object} event - The event object representing the request.
 * @param {object} context - The context object representing the runtime information.
 * @returns {Promise<object>} - A promise that resolves to the response object.
 */
const handler = async function (event, context) {
    // Define common headers for the response
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // Check if the client context and identity are present
    if (!context.clientContext && !context.clientContext.identity) {
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({
                msg: 'No identity instance detected'
            })
        };
    }

    // Retrieve the referring URL from the request headers
    const ref = event.headers.referer || '';
    console.log(ref);

    // Check if the referring URL is allowed
    if (!ref.includes('cse110-sp23-group12.github.io') && !ref.includes('cse110.jyh.com') && !ref.includes('localhost')) {
        return {
            statusCode: 403,
            headers: headers,
            body: JSON.stringify({ answer: 'Forbidden' })
        };
    }

    // Get the API key from environment variables
    const API_KEY = process.env.API_KEY;
    const endpoint = 'https://api.openai.com/v1/completions';

    // Parse the query string parameters from the request
    const querys = querystring.parse(event.rawQuery);
    const first = querys.first;
    const second = querys.second;
    const third = querys.third;
    const message = querys.message;

    // Create the input prompt for the OpenAI model
    const input = `I am a fortune teller who speaks using mystic language. Using the tarot cards ${first}, ${second}, and ${third}, I will respond to your message with your fortune.\n\nHuman: ${message}\n\nAI:`;

    try {
        // Send a request to the OpenAI API to generate a response
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
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

        // Parse the response data
        const data = await response.json();

        // Return the response
        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({ answer: data.choices[0].text.trim() })
        };
    } catch (error) {
        // Handle any errors that occur during the process
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ answer: error.message })
        };
    }
};

module.exports = { handler };
