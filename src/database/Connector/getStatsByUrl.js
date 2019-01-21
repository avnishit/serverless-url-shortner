/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Inserts an item to the database
 */
/* @flow */

import { TableName, DocumentClient } from './';
import Domain from '~/utils/Domain';
import HashStats from './getStatsByHash';

export default (item: { url: string, ip: ?string }) => {
  let url = item.url;
  let base_url = Domain.getDomain(url);
  let ip: ?string;
  if (item.ip && item.ip.length > 0) ip = item.ip;

  let getHashes = base_url => {
    return new Promise((res, rej) => {
      let params = {
        TableName: TableName,
        IndexName: 'GSI_1',
        ExpressionAttributeNames: { '#hashkey': 'hash', '#url_long': 'url' },
        KeyConditionExpression: 'base_url = :base_url',
        FilterExpression: 'contains(#url_long,:url)',
        ExpressionAttributeValues: { ':base_url': base_url, ':url': url },
        ProjectionExpression: '#hashkey',
      };
      return DocumentClient.query(params)
        .promise()
        .then(data => res(data.Items.map(obj => obj.hash)))
        .catch(err => {
          console.log(err.message);
          return rej(err);
        });
    });
  };

  let getCount = async (base_url, ip) => {
    let count = 0;
    try {
      let hash_arr = await getHashes(base_url);
      //console.log("hash_arr",hash_arr);
      for (let x = 0; x < hash_arr.length; x++) {
        let data = await HashStats({ hash: hash_arr[x], ip: ip });
        //console.log(hash_arr[x]+" count "+ JSON.stringify(data));
        count += data.count;
      }
      return count;
    } catch (err) {
      return err.message;
    }
  };

  console.log('url', url);
  console.log('base_url', base_url);
  console.log('ip', ip);
  return getCount(base_url, ip)
    .then(count => {
      console.log(count);
      return { count: count };
    })
    .catch(err => err);
};
