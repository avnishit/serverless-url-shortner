/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Add Contact test
 */

/* @flow */

import { initialiseTestDB } from '~/database/__test__/Setup';
import insertItem from '../insertItem';
import getItem from '../getItem';

describe('Database.getItem', () => {
  beforeAll(() => {
    // Reset database
    return initialiseTestDB(__filename);
  });

  test('Get an item', () => {
    const item = { url: 'https://www.dathuis.nl' };

    return Promise.resolve()
      .then(() => insertItem(item))
      .then(Item => getItem(Item.id))
      .then(({ Item }) => {
        expect(Item).toEqual(expect.objectContaining(item));
      });
  });
});
