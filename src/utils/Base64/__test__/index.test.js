/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Tests for SFATable Uuid
 */

/* @flow */

import Base64 from '../index';

describe('Base64 Test', () => {
  it('conversion', () => {
    expect(Base64.createHash(0)).toBe('0');
    expect(Base64.createHash(1)).toBe('1');
    expect(Base64.createHash(2)).toBe('2');
    expect(Base64.createHash(3)).toBe('3');
    expect(Base64.createHash(10)).toBe('A');
    expect(Base64.createHash(63)).toBe('-');
  });
});
