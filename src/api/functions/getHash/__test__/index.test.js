/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Rudimentary insert item test
 */

/* @flow */

import { initialiseTestDB } from '~/database/__test__/Setup';
import DB from '~/database/Connector';
import { handler } from '../';

describe('API.getHash', () => {
  beforeAll(() => {
    // Reset database
    return initialiseTestDB(__filename);
  });

  test('Insert an Item', done => {
    let params = { url: 'https://www.dathuis.nl' };
    handler({ body: JSON.stringify(params) }, {}, (error, result) => {
      done(); //needs further test
      expect(error).toBe(null);

      const { body, statusCode } = result;

      expect(statusCode).toBe(200);

      const { hash } = JSON.parse(body);

      return Promise.resolve()
        .then(() => DB.getUrl(hash))
        .then(({ Item }) => {
          expect(Item.url).toEqual(params.url);
          done();
        });
    });
  });
});
