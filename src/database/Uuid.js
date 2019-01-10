/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Database Utils
 */

/* @flow */

import uuid from 'uuid/v4';
import Validation from '~/utils/validation';

/**
 * Choosen because its the beginning of the "writable" ASCII table.
 */
export const COMPOSITE_KEY_SEPERATOR = '#';

/**
 * E.g. ece3bb14-873c-4fc0-9e61-c1e07f058c70
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

/**
 * Generates a uuid/v4
 */
const generateUuid = () => {
  return uuid();
};

/**
 * Checks a given string to be a valid uuid
 *
 * @param {string} id
 */
const isId = (id: string): boolean => {
  return Validation.isNonEmptyString(id) && UUID_REGEX.test(id);
};

/**
 * Joins the given parts of the composite key with the
 * COMPOSITE_KEY_SEPERATOR to generate a composite key
 *
 * @param  {...string} keys
 */
const generateCompositeKey = (...keys: Array<string>): string => {
  return keys.join(COMPOSITE_KEY_SEPERATOR);
};

export default {
  generateCompositeKey,
  generateUuid,
  isId,
};
