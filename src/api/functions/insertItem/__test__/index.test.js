/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Rudimentary insert item test
 */

/* @flow */

import { initialiseTestDB } from '~/database/__test__/Setup';
import DB from '~/database/Connector';
import { handler } from '../';

describe('API.insertItem', () => {
  beforeAll(() => {
    // Reset database
    return initialiseTestDB(__filename);
  });

  test('Insert an Item', done => {
    const params = { url: 'https://www.dathuis.nl' };

    handler({ body: JSON.stringify(params) }, {}, (error, result) => {
      expect(error).toBe(null);

      const { body, statusCode } = result;

      expect(statusCode).toBe(200);

      const { id } = JSON.parse(body);

      return Promise.resolve()
        .then(() => DB.getItem(id))
        .then(({ Item }) => {
          expect(Item.url).toEqual(params.url);
          done();
        });
    });
  });
});
