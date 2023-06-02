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
    window.location.href = `display${(typeof dbVersion === 'undefined') ? '' : '_local'}.html`;
    console.log('message=====', localStorage.getItem('userMessage'));
    localStorage.setItem('userMessage', input.value);
    console.log(localStorage.getItem('userMessage'));
};
