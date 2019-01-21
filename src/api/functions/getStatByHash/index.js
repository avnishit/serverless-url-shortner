/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 *
 */

/* @flow */

import DB from '~/database/Connector';

export const handler = (event: any, _context: any, callback: any) => {
  //export const handler = async () => {
  let body: { hash: string, ip: ?string };
  try {
    body = JSON.parse(event.body);
  } catch (jsonError) {
    return callback(jsonError);
  }

  return Promise.resolve()
    .then(() => {
      return new Promise((res, rej) => {
        if (body.hash) res();
        else rej(new Error('HASH_NOT_FOUND'));
      });
    })
    .then(() => DB.getStatsByHash(body))
    .then(result => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result), // If supposed to fail, it will fail in db itself
      });
    })
    .catch(e =>
      callback({
        statusCode: 500,
        body: {
          msg: e.message,
        },
      }),
    );
};
