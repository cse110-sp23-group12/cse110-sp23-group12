import { getRank } from '../js/utils.js';

test('C(9, 3), [2, 5, 8] = 60', () => {
    expect(getRank([2, 5, 8], 9, 3)).toBe(60);
});

test('C(9, 3), [6, 7, 8] = 83', () => {
    expect(getRank([6, 7, 8], 9, 3)).toBe(83);
});

test('C(15, 3), [4, 12, 14] = 333', () => {
    expect(getRank([4, 12, 14], 15, 3)).toBe(333);
});

test('C(15, 3), [11, 13, 14] = 453', () => {
    expect(getRank([11, 13, 14], 15, 3)).toBe(453);
});