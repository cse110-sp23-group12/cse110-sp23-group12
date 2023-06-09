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
        if(textInput.value !== ''){
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
            shapes: ["image"],
            shapeOptions: {
              image: [
                {
                  src: "https://raw.githubusercontent.com/cse110-sp23-group12/cse110-sp23-group12/main/source/img/logo.png",
                  width: 32,
                  height: 32,
                },
              ],
            },
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
            shapes: ["image"],
            shapeOptions: {
              image: [
                {
                  src: "https://raw.githubusercontent.com/cse110-sp23-group12/cse110-sp23-group12/main/source/img/logo.png",
                  width: 32,
                  height: 32,
                },
              ],
            },
          });
          
          setTimeout(() => {
            landingSubmit();
          }, 1000);
        }
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
