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
