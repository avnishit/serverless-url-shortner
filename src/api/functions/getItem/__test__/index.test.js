/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Rudimentary insert item test
 */

/* @flow */

import { initialiseTestDB } from '~/database/__test__/Setup';
import { handler } from '../';

describe('API.insertItem', () => {
  beforeAll(() => {
    // Reset database
    return initialiseTestDB(__filename);
  });

  test('Insert an Item', done => {
    handler({}, {}, (error, result) => {
      expect(error).toBe(null);

      const { body, statusCode } = result;

      expect(statusCode).toBe(200);

      const { message } = JSON.parse(body);

      expect(message).toEqual('Hey - from lambda');
      done();
    });
  });
});
