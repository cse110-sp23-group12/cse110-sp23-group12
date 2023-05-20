/**
 * random choose
 * @param {number} n
 * @param {number} k 
 * @returns {Object} 
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

export const getRank = (a, n, m) => {
    const factorial = [1];
    for (let i = 1; i <= n; ++i) factorial.push(factorial[i - 1] * i);
    const comb = (n, k) => {
        if (k === 0) return 1;
        if (n === 0) return 0;
        if (n < k) return 0;
        return factorial[n] / factorial[k] / factorial[n - k];
    };
    let rank = comb(n, m);
    for (let i = 0; i < m; ++i) rank += comb(n - a[i] - 1, m - i);
    return rank - 1;
};
