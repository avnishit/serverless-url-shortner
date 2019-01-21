/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Add Contact test
 */

/* @flow */

import { initialiseTestDB } from '~/database/__test__/Setup';

import getUrl from '../getUrl';
import getHash from '../getHash';

describe('Database.getHash', () => {
  beforeAll(() => {
    // Reset database
    return initialiseTestDB(__filename);
  });

  test('Insert an Item', () => {
    const item = { url: 'https://www.dathuis.nl' };

    return Promise.resolve()
      .then(() => getHash(item))
      .then(Item => getUrl(Item.hash))
      .then(Item => {
        expect(Item).toEqual(expect.objectContaining(item));
      });
  });
});
