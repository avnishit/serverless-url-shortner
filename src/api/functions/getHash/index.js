/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 *
 */

/* @flow */

import DB from '~/database/Connector';

type Body = {| url: string |};
export const handler = (event: any, _context: any, callback: any) => {
  //export const handler = async () => {
  let body: Body;
  try {
    body = JSON.parse(event.body);
  } catch (jsonError) {
    return callback(jsonError);
  }

  return Promise.resolve()
    .then(() => {
      return new Promise((res, rej) => {
        if (body.url) res();
        else rej(new Error('URL_NOT_FOUND'));
      });
    })
    .then(() => DB.getHash(body))
    .then(result => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
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
