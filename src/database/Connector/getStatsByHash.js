/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Inserts an item to the database
 */
/* @flow */

import { TableName, DocumentClient } from './';
import Defaults from '~/defaults';

let getCountByHash = (hash: string, ip: ?string) => {
  return new Promise((res, rej) => {
    let params;
    if (ip != undefined) {
      params = {
        TableName: TableName,
        ExpressionAttributeNames: { '#hashkey': 'hash' },
        KeyConditionExpression:
          '#hashkey = :hash_val and begins_with(sort_key,:key_val)',
        ExpressionAttributeValues: {
          ':hash_val': hash.padStart(8, 'A'),
          ':key_val': 'IP' + ip,
        },
        Select: 'COUNT',
      };
    } else {
      params = {
        TableName: TableName,
        ExpressionAttributeNames: { '#hashkey': 'hash' },
        KeyConditionExpression: '#hashkey = :hash_val and sort_key = :key_val',
        ExpressionAttributeValues: {
          ':hash_val': hash,
          ':key_val': Defaults.HASH_TOATL_SORT_KEY,
        },
        ProjectionExpression: 'countn',
      };
    }
    return DocumentClient.query(params)
      .promise()
      .then(data => {
        console.log(data);
        let result = { count: 0 };
        if (ip != undefined && data.Count) result.count = data.Count;
        else if (data.Items && data.Items[0] && data.Items[0].countn)
          result.count = data.Items[0].countn;
        return res(result);
      })
      .catch(err => {
        console.log(err.message);
        return rej(err);
      });
  });
};

export default (item: { hash: string, ip: ?string }) => {
  // console.log(item);
  let hash, ip;
  hash = item.hash;
  if (item.ip && item.ip.length > 0) ip = item.ip;

  return getCountByHash(hash, ip)
    .then(data => data)
    .catch(err => err.message);
};
