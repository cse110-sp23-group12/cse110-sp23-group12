import { toggleSound, setSound } from './utils.js';
import { util, form } from './selector.js';

/**
 * Event handler for the window's onload event.
 */
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

window.onload = () => {
    const soundToggle = document.getElementById('sound-toggle');
    setSound(soundToggle, localStorage.getItem('soundOn'), true);
    const button = document.getElementById('landing-submit-button');
    const textInput = document.getElementById('text-input');
    /**
     * Event handler for the click event on the landing submit button.
     */
    button.addEventListener('click', () => {
        landingSubmit();
    });
    /**
     * Event handler for the keydown event on the text input field.
     * Triggers the landingSubmit function when the Enter key is pressed.
     * 
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            landingSubmit();
        }
    });

    soundToggle.addEventListener('click', () => {
        localStorage.setItem('soundOn', toggleSound(soundToggle));
    });

    form.f.init.register();

    if (localStorage.getItem('method') === null) {
        localStorage.setItem('method', 'gpt');
        document.getElementById('img-category').click();
        document.getElementById('img-category-options').children[0].click();
    } else {
        const method = localStorage.getItem('method') === 'gpt' ? 0 : 1;
        document.getElementById('img-category').click();
        document.getElementById('img-category-options').children[method].click();
    }
};

/**
 * Handles the submission on the landing page.
 * Redirects to the appropriate page and stores the user's message in localStorage.
 */
const landingSubmit = () => {
    const soundToggle = document.getElementById('sound-toggle');
    setSound(soundToggle, false, false);
    const input = document.getElementById('text-input');
    if (input.value === '') return;
    localStorage.setItem('userMessage', input.value);

    /** Confetti on the left side */
    confetti({
        sspread: 55,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        angle: 60,
        origin: { x: 0 },
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ['image'],
        shapeOptions: {
            image: [{
                src: './img/logo.png',
                width: 32,
                height: 32
            }]
        }
    });

    /** Confetti on the right side */
    confetti({
        sspread: 55,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        angle: 120,
        origin: { x: 1 },
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ['image'],
        shapeOptions: {
            image: [{
                src: './img/logo.png',
                width: 32,
                height: 32
            }]
        }
    });
    setTimeout(() => {
        redirect();
    }, 1000);
};

const redirect = () => {
    window.location.href = 'display.html';
};
