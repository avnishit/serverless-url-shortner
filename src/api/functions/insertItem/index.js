/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 *
 */

/* @flow */

import DB from '~/database/Connector';

type Body = {| url: string |};
export const handler = (event: any, _context: any, callback: any) => {
  let body: Body;
  try {
    body = JSON.parse(event.body);
  } catch (jsonError) {
    return callback(jsonError);
  }

  return Promise.resolve()
    .then(() => DB.insertItem(body))
    .then(result => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
      });
    })
    .catch(e => callback(e));
};
