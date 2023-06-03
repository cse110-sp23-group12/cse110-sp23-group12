window.onload = () => {
    const button = document.getElementById('landing-submit-button');
    const textInput = document.getElementById('text-input');
    button.addEventListener('click', () => {
        landingSubmit();
    });
    textInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            landingSubmit();
        }
    });
};

const landingSubmit = () => {
    const input = document.getElementById('text-input');
    if (input.value === '') return;
    console.log(typeof dbVersion);
    if (typeof dbVersion !== 'undefined') {
        window.location.href = 'display_local.html';
        return;
    }
    console.log('message=====', localStorage.getItem('userMessage'));
    localStorage.setItem('userMessage', input.value);
    console.log(localStorage.getItem('userMessage'));
    window.location.href = 'display.html';
};
