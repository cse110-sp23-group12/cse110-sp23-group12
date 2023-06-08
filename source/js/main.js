import { toggleSound, setSound } from './utils.js';

/**
 * Event handler for the window's onload event.
 */
window.onload = () => {
    const soundToggle = document.getElementById('sound-toggle');
    setSound(soundToggle, localStorage.getItem('soundOn'));
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
};

/**
 * Handles the submission on the landing page.
 * Redirects to the appropriate page and stores the user's message in localStorage.
 */
const landingSubmit = () => {
    const input = document.getElementById('text-input');
    if (input.value === '') return;
    window.location.href = `display${(typeof dbVersion === 'undefined') ? '' : '_local'}.html`;
    console.log('message=====', localStorage.getItem('userMessage'));
    localStorage.setItem('userMessage', input.value);
    console.log(localStorage.getItem('userMessage'));
};
