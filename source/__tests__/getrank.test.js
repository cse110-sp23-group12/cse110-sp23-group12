import { getRank } from '../js/utils.js';

test('C(2, 1), [1] = 1', () => {
    expect(getRank([1], 2, 1)).toBe(1);
});

test('C(3, 1), [2] = 2', () => {
    expect(getRank([2], 3, 1)).toBe(2);
});

test('C(5, 5), [4, 2, 0, 1, 3] = 0', () => {
    expect(getRank([4, 2, 0, 1, 3], 5, 5)).toBe(0);
});

test('C(4, 3), [2, 3, 1] = 3', () => {
    expect(getRank([2, 3, 1], 4, 3)).toBe(3);
});

test('C(11, 7), [7, 2, 1, 6, 8, 10, 0] = 66', () => {
    expect(getRank([7, 2, 1, 6, 8, 10, 0], 11, 7)).toBe(66);
});

test('C(4, 2), [1, 2] = 3', () => {
    expect(getRank([1, 2], 4, 2)).toBe(3);
});

test('C(2, 2), [1, 0] = 0', () => {
    expect(getRank([1, 0], 2, 2)).toBe(0);
});

test('C(3, 2), [1, 2] = 2', () => {
    expect(getRank([1, 2], 3, 2)).toBe(2);
});

test('C(1, 1), [0] = 0', () => {
    expect(getRank([0], 1, 1)).toBe(0);
});

test('C(14, 1), [7] = 7', () => {
    expect(getRank([7], 14, 1)).toBe(7);
});

