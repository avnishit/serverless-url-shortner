/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 *
 */

/* @flow */
import DB from '~/database/Connector';

type Params = {| hash: string |};
export const handler = (_event: any, _context: any, callback: any) => {
  let params: Params;
  try {
    params = _event.queryStringParameters;
  } catch (jsonError) {
    return callback(jsonError);
  }

  // console.log(_event);

  return Promise.resolve()
    .then(() => {
      return new Promise((res, rej) => {
        if (params.hash) res();
        else rej(new Error('HASH_NOT_FOUND'));
      });
    })
    .then(() => DB.saveStat(params.hash, _event)) // This sud be later done using SQS & a dedicated lambda
    .then(() => DB.getUrl(params.hash))
    .then(result => {
      let res = result;
      if (
        result == undefined ||
        (Object.keys(result).length === 0 && result.constructor === Object)
      )
        res = { url: 'URL_NOT_FOUND' };
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
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
