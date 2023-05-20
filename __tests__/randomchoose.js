import { randomChoose } from '../source/js/utils.js';

test('random choose 6 from 9', () => {
    const ids = randomChoose(9, 6);
    expect(ids.length).toBe(6);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ids)).toBeLessThan(9);
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 9 from 9', () => {
    const ids = randomChoose(9, 9);
    expect(ids.length).toBe(9);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ids)).toBeLessThan(9);
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 9 from 15', () => {
    const ids = randomChoose(15, 9);
    expect(ids.length).toBe(9);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ids)).toBeLessThan(15);
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 15 from 15', () => {
    const ids = randomChoose(15, 15);
    expect(ids.length).toBe(15);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...ids)).toBeLessThan(15);
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});
