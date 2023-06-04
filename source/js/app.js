/**
 * Uses the user's input and the tarot cards chosen to craft a prompt wrapper
 * and retrieve a unique fortune made by the GPT API.
 * @param {*} message the user's inputted message
 * @param {*} tarots three tarot card names
 * @returns the fortune produced by GPT
 */
export async function getResponseFromAPI(message, tarots) {
    console.log('message = ', message);
    // Link to server to run to get the API key
    const endpoint = 'http://localhost:3333/api';
    let answer;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                // prompt wrapper that will dictate what GPT spits out
                prompt: `I am a fortune teller who speaks using mystic language. Using the tarot cards ${tarots[0]}, ${tarots[1]}, and ${tarots[2]}, I will respond to your message with your fortune.\n\nHuman: ${message}\n\nAI:`,
                temperature: 0.75,
                max_tokens: 100,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        const data = await response.json();
        console.log(data);
        if (data && data.choices && data.choices.length > 0 && data.choices[0]) {
            answer = data.choices[0].text;
        } else {
            answer = 'I\'m sorry. It seems as though there is an error on my part.';
        }
    } catch (e) {
        console.error('There was an error!', e.message);
        answer = 'I\'m sorry. It seems as though there is an error on my part, likely because I am receiving too many requests.';
    }
    return answer;
}
