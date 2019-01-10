/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Tests for SFATable Uuid
 */

/* @flow */

import Validation from '../index';

describe('Validation', () => {
  it('email', () => {
    expect(Validation.isValidEmail('philipp@dathuis.nl')).toBe(true);
    expect(Validation.isValidEmail('unknownuser1@dathuis.nl')).toBe(true);
    expect(Validation.isValidEmail('peter@cockmakelaars.amsterdam')).toBe(true);
    expect(Validation.isValidEmail('philipp@dathuis.nl')).toBe(true);
    expect(Validation.isValidEmail('philipp@dathuis.com')).toBe(true);
    expect(Validation.isValidEmail('philipp@dathuis.ru')).toBe(true);
    expect(Validation.isValidEmail('peter@dat.nl')).toBe(true);

    expect(Validation.isValidEmail('')).toBe(false);
    expect(Validation.isValidEmail((null: any))).toBe(false);
    expect(Validation.isValidEmail((undefined: any))).toBe(false);
    expect(Validation.isValidEmail((1: any))).toBe(false);
    expect(Validation.isValidEmail('peter@')).toBe(false);
    expect(Validation.isValidEmail('   peter@dat.nl')).toBe(false);
    expect(Validation.isValidEmail('   peter@dat.nl   ')).toBe(false);
    expect(Validation.isValidEmail('peter@dat.nl   ')).toBe(false);
    expect(Validation.isValidEmail((NaN: any))).toBe(false);
  });

  it('isNonNegativeInteger', () => {
    expect(Validation.isNonNegativeInteger(999)).toBe(true);
    expect(Validation.isNonNegativeInteger(1)).toBe(true);
    expect(Validation.isNonNegativeInteger(0)).toBe(true);

    expect(Validation.isNonNegativeInteger(('': any))).toBe(false);
    expect(Validation.isNonNegativeInteger((null: any))).toBe(false);
    expect(Validation.isNonNegativeInteger((undefined: any))).toBe(false);
    expect(Validation.isNonNegativeInteger(('peter@': any))).toBe(false);
    expect(Validation.isNonNegativeInteger(('1': any))).toBe(false);
    expect(Validation.isNonNegativeInteger(('0': any))).toBe(false);
    expect(Validation.isNonNegativeInteger(('-1': any))).toBe(false);
    expect(Validation.isNonNegativeInteger(('9999': any))).toBe(false);
    expect(Validation.isNonNegativeInteger(-1)).toBe(false);
    expect(Validation.isNonNegativeInteger(NaN)).toBe(false);
  });

  it('isNonNegativeNumber', () => {
    expect(Validation.isNonNegativeNumber(999)).toBe(true);
    expect(Validation.isNonNegativeNumber(1)).toBe(true);
    expect(Validation.isNonNegativeNumber(0)).toBe(true);
    expect(Validation.isNonNegativeNumber(0.2)).toBe(true);
    expect(Validation.isNonNegativeNumber(1.23)).toBe(true);
    expect(Validation.isNonNegativeNumber(Math.random() * 999)).toBe(true);

    expect(Validation.isNonNegativeNumber(('': any))).toBe(false);
    expect(Validation.isNonNegativeNumber((null: any))).toBe(false);
    expect(Validation.isNonNegativeNumber((undefined: any))).toBe(false);
    expect(Validation.isNonNegativeNumber(('peter@': any))).toBe(false);
    expect(Validation.isNonNegativeNumber(('1': any))).toBe(false);
    expect(Validation.isNonNegativeNumber(('0': any))).toBe(false);
    expect(Validation.isNonNegativeNumber(('-1': any))).toBe(false);
    expect(Validation.isNonNegativeNumber(('9999': any))).toBe(false);
    expect(Validation.isNonNegativeNumber(-1)).toBe(false);
    expect(Validation.isNonNegativeNumber(NaN)).toBe(false);
  });

  it('isPositiveInteger', () => {
    expect(Validation.isPositiveInteger(999)).toBe(true);
    expect(Validation.isPositiveInteger(1)).toBe(true);

    expect(Validation.isPositiveInteger(0)).toBe(false);
    expect(Validation.isPositiveInteger(('': any))).toBe(false);
    expect(Validation.isPositiveInteger((null: any))).toBe(false);
    expect(Validation.isPositiveInteger((undefined: any))).toBe(false);
    expect(Validation.isPositiveInteger(('peter@': any))).toBe(false);
    expect(Validation.isPositiveInteger(('1': any))).toBe(false);
    expect(Validation.isPositiveInteger(('0': any))).toBe(false);
    expect(Validation.isPositiveInteger(('-1': any))).toBe(false);
    expect(Validation.isPositiveInteger(('9999': any))).toBe(false);
    expect(Validation.isPositiveInteger(-1)).toBe(false);
    expect(Validation.isPositiveInteger(NaN)).toBe(false);
  });

  it('isPositiveNumber', () => {
    expect(Validation.isPositiveNumber(999)).toBe(true);
    expect(Validation.isPositiveNumber(1)).toBe(true);
    expect(Validation.isPositiveNumber(0.2)).toBe(true);
    expect(Validation.isPositiveNumber(1.23)).toBe(true);
    expect(Validation.isPositiveNumber(Math.random() * 999)).toBe(true);

    expect(Validation.isPositiveNumber(0)).toBe(false);
    expect(Validation.isPositiveNumber(('': any))).toBe(false);
    expect(Validation.isPositiveNumber((null: any))).toBe(false);
    expect(Validation.isPositiveNumber((undefined: any))).toBe(false);
    expect(Validation.isPositiveNumber(('peter@': any))).toBe(false);
    expect(Validation.isPositiveNumber(('1': any))).toBe(false);
    expect(Validation.isPositiveNumber(('0': any))).toBe(false);
    expect(Validation.isPositiveNumber(('-1': any))).toBe(false);
    expect(Validation.isPositiveNumber(('9999': any))).toBe(false);
    expect(Validation.isPositiveNumber(-1)).toBe(false);
    expect(Validation.isPositiveNumber(NaN)).toBe(false);
  });

  it('isValidPhone', () => {
    expect(Validation.isValidPhone('0683833030')).toBe(true);
    expect(Validation.isValidPhone('+31683833030')).toBe(true);
    expect(Validation.isValidPhone('0031683833030')).toBe(true);
    expect(Validation.isValidPhone('0204435587')).toBe(true);
    expect(Validation.isValidPhone('0983833030')).toBe(true);

    expect(Validation.isValidPhone((0: any))).toBe(false);
    expect(Validation.isValidPhone(('': any))).toBe(false);
    expect(Validation.isValidPhone((null: any))).toBe(false);
    expect(Validation.isValidPhone((undefined: any))).toBe(false);
    expect(Validation.isValidPhone(('peter@': any))).toBe(false);
    expect(Validation.isValidPhone(('1': any))).toBe(false);
    expect(Validation.isValidPhone(('0': any))).toBe(false);
    expect(Validation.isValidPhone(('-1': any))).toBe(false);
    expect(Validation.isValidPhone(('9999': any))).toBe(false);
    expect(Validation.isValidPhone((-1: any))).toBe(false);
    expect(Validation.isValidPhone((NaN: any))).toBe(false);
  });
});
