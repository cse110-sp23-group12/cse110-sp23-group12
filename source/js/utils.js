/**
 * Randomly chooses k numbers from 0 to n-1 without replacement.
 * 
 * @param {number} n - The range of numbers to choose from (0 to n-1).
 * @param {number} k - The number of numbers to choose.
 * @returns {number[]} An array of k randomly chosen numbers.
 */
export const randomChoose = (n, k) => {
    const num = [];
    for (let i = 0; i < n; ++i) num.push(i);
    const result = [];
    for (let i = 0; i < k; ++i) {
        const index = Math.floor(Math.random() * num.length);
        result.push(num[index]);
        num.splice(index, 1);
    }
    return result;
};

/**
 * Calculates the binomial coefficient.
 * 
 * @param {number} n - The total number of objects.
 * @param {number} k - The number of objects to choose.
 * @returns {number} The binomial coefficient value.
 */
export const getRank = (arr, n, m) => {
    const a = [];
    for (let i = 0; i < m; ++i) a.push(arr[i]);
    a.sort((x, y) => { return x - y; });
    const factorial = [1];
    for (let i = 1; i <= n; ++i) factorial.push(factorial[i - 1] * i);
    /**
     * Calculates the binomial coefficient.
     * 
     * @param {number} n - The total number of objects.
     * @param {number} k - The number of objects to choose.
     * @returns {number} The binomial coefficient value.
     */
    const comb = (n, k) => {
        if (k === 0) return 1;
        if (n === 0 || n < k) return 0;
        return factorial[n] / factorial[k] / factorial[n - k];
    };
    let rank = comb(n, m);
    for (let i = 0; i < m; ++i) rank -= comb(n - a[i] - 1, m - i);
    return rank - 1;
};

/**
 * Toggles the sound item and turns the sound on or off.
 * Used when the sound toggle is clicked.
 * 
 * @param {*} soundToggle - the sound toggle element
 * @returns - a boolean value corresponding to whether the sound is on or off
 */
export function toggleSound(soundToggle) {
    const icon = soundToggle.children[0];
    if (icon.classList.contains('fa-volume-up')) {
        setSound(soundToggle, false, true);
        return false;
    } else {
        setSound(soundToggle, true, true);
        return true;
    }
}

/**
 * Given the toggle and a boolean value, sets the sound and the image to on or off.
 * 
 * @param {*} soundToggle  - the sound toggle element
 * @param {*} bool - a boolean value corresponding to whether the sound should be on or off
 */
export function setSound(soundToggle, bool, changeIcon) {
    const icon = soundToggle.children[0];
    const audio = document.getElementById('audio');
    const pauseTime = localStorage.getItem('pauseTime');

    if (bool === 'true' || bool === true) { // string when from localStorage, bool when from toggleSound
        if (changeIcon) {
            icon.classList.remove('fa-volume-off');
            icon.classList.add('fa-volume-up');
        }
        // Set the time to where it was paused.
        audio.currentTime = pauseTime;
        audio.play();
    } else {
        if (changeIcon) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-off');
        }
        // Save the current time when the audio is paused.
        const newPauseTime = audio.currentTime;
        audio.pause();
        localStorage.setItem('pauseTime', newPauseTime);
    }
}
