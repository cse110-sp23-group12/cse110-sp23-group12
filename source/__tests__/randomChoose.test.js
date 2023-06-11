import { randomChoose } from '../js/utils.js';

test('random choose 5 from 9', () => {
    const ids = randomChoose(9, 5);
    expect(ids.length).toBe(5);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(9)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 3 from 3', () => {
    const ids = randomChoose(3, 3);
    expect(ids.length).toBe(3);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(3)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 4 from 10', () => {
    const ids = randomChoose(10, 4);
    expect(ids.length).toBe(4);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(10)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 3 from 15', () => {
    const ids = randomChoose(15, 3);
    expect(ids.length).toBe(3);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(15)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 8 from 9', () => {
    const ids = randomChoose(9, 8);
    expect(ids.length).toBe(8);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(9)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 12 from 16', () => {
    const ids = randomChoose(16, 12);
    expect(ids.length).toBe(12);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(16)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 7 from 12', () => {
    const ids = randomChoose(12, 7);
    expect(ids.length).toBe(7);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(12)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 2 from 11', () => {
    const ids = randomChoose(11, 2);
    expect(ids.length).toBe(2);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(11)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 7 from 17', () => {
    const ids = randomChoose(17, 7);
    expect(ids.length).toBe(7);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(17)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

test('random choose 1 from 6', () => {
    const ids = randomChoose(6, 1);
    expect(ids.length).toBe(1);
    expect(Math.min(...ids)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ids)).toBeLessThan(6)
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(ids.length);
});

