require('dotenv').config({ path: '../.env' });
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

/**
 * Handles the API request to securely access the API key and retrieve data from the actual API.
 * Used to securely access the API key.
 * Only drawback is that the API will only work on
 * my (Max's) machine with this approach.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves once the API response is sent back to the client.
 */
app.post('/api', express.json(), async (req, res) => {
    // Fetch data from the actual API
    const apiResponse = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify(req.body)
    });
    console.log(`${process.env.API_KEY}`);

    const apiData = await apiResponse.json();

    // Send API data back to the client
    res.json(apiData);
});

/**
 * Starts the server on the specified port.
 */
app.listen(3333, () => console.log('Server running on port 3333'));
