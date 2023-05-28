// typeof dbVersion === 'undefined'
window.onload = () => {
    const button = document.getElementById('landing-submit-button');
    button.addEventListener('click', () => {
        landingSubmit();
    });
};

const landingSubmit = () => {
    const input = document.getElementById('text-input');
    if (input.value === '') return;
    window.location.replace(`display${(typeof dbVersion === 'undefined') ? '' : '_local'}.html`);
}