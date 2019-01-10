/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Collection of validation methods
 */

/* @flow */

import _ from 'underscore';

/**
 * Uses the regex defined here:
 * @see https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
 *
 * Interesting discussion going on here:
 * @see https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
 *
 * This is likely not the "final word" as this regex allows "peter@aol.d" or "peter@aol.123"
 * as a valid email. While this is technicaly true, there is no 1 letter toplevel domain
 * accepted atm and is terefore likely a typo.
 */
// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const EMAIL_REGEX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

/**
 * Validates ISO_8601 Date strings e.g. 2011-10-05T14:48:00.000Z
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
const ISO_JS_DATE_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;

const PHONE_REGEX = /(\d.*){9}/;

/**
 * True if it is a nonempty string
 *
 * @param {string} value
 */
const isNonEmptyString = (value: string) => {
  return _.isString(value) && value !== '';
};

/**
 * True if its a number
 *
 * @param {number} value
 */
const isNumber = (value: number) => {
  return !_.isString(value) && _.isFinite(value);
};

/**
 * True if its a countable number ..., -2, -1, 0, 1, 2, ...
 *
 * @param {number} value
 */
const isInteger = (value: number) => {
  return !_.isString(value) && _.isFinite(value) && Math.floor(value) === value;
};

/**
 * true if it is a number >= 0
 *
 * INCLUDING 0
 *
 * @param {number} value
 */
const isNonNegativeNumber = (value: number) => {
  return isNumber(value) && value >= 0;
};

/**
 * true if it is an integer >= 0
 *
 * INCLUDING 0
 *
 * @param {number} value
 */
const isNonNegativeInteger = (value: number) => {
  return isInteger(value) && value >= 0;
};

/**
 * true if it is a number > 0
 *
 * EXCLUDING 0
 *
 * @param {number} value
 */
const isPositiveNumber = (value: number) => {
  return isNumber(value) && value > 0;
};

/**
 * true if it is an integer > 0
 *
 * EXCLUDING 0
 *
 * @param {number} value
 */
const isPositiveInteger = (value: number) => {
  return isInteger(value) && value > 0;
};

/**
 * true if we identified this as a valid phone number
 *
 * @todo We can possibly add a better check here, issue #65 is tracking the
 * discussion here.
 *
 * @param {string} phone
 */
const isValidPhone = (phone: string) => {
  return isNonEmptyString(phone) && PHONE_REGEX.test(phone);
};

/**
 * true if we identified this as a valid email
 *
 * @param {string} email
 */
const isValidEmail = (email: string) => {
  return isNonEmptyString(email) && EMAIL_REGEX.test(email);
};

/**
 * true if this is a valid ISO string
 *
 * @param {string} time
 */
const isValidISODateString = (time: string) => {
  return isNonEmptyString(time) && ISO_JS_DATE_REGEX.test(time);
};

export default {
  isValidEmail,
  isValidPhone,
  isNonNegativeInteger,
  isNonNegativeNumber,
  isPositiveInteger,
  isPositiveNumber,
  isInteger,
  isNumber,
  isNonEmptyString,
  isValidISODateString,
};
