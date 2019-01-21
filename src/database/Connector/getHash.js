/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Inserts an item to the database
 */
/* @flow */

import { TableName, DocumentClient } from './';
import Base64 from '~/utils/Base64';
import Domain from '~/utils/Domain';
import Defaults from '~/defaults';

export type Item = {| url: string |};
export default (item: Item) => {
  // v1 -> Getting the next id in place, this will work gracefully for 1M new urls per month. For a higher request (~5M+),
  // we must create a key caching services, which performs bulk key creation

  let getNextHashId = specialRow => {
    return new Promise((res, rej) => {
      let params = {
        Key: {
          hash: specialRow,
          sort_key: Defaults.SPECIAL_SORT_KEY,
        },
        ReturnValues: 'ALL_NEW',
        TableName: TableName,
        UpdateExpression: 'ADD countn :incr',
        ExpressionAttributeValues: {
          ':incr': 1,
        },
      };
      DocumentClient.update(params)
        .promise()
        .then(data => {
          res(data.Attributes.countn);
        })
        .catch(err => {
          console.log('Err in update count: ' + err);
          rej(err);
        });
    });
  };

  let insertHashUrl = (id, url) => {
    return new Promise((res, rej) => {
      let date = new Date();
      let pHash = Base64.createHash(id).padStart(7, '0');
      let dbEntry = {
        url: url,
        base_url: Domain.getDomain(url),
        hash: pHash,
        sort_key: Defaults.HASH_URL_SORT_KEY,
        cre_at: date.toISOString(),
      };
      return DocumentClient.put({ TableName, Item: dbEntry })
        .promise()
        .then(() => res({ hash: pHash }))
        .catch(err => {
          console.log(err.message);
          return rej(err);
        });
    });
  };

  return getNextHashId(Defaults.SPECIAL_HASH_KEY)
    .then(id => insertHashUrl(id, item.url))
    .then(data => data)
    .catch(err => err.message);
};
