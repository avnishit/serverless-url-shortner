/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Inserts stas to DB
 */
/* @flow */

import { TableName, DocumentClient } from './';
import Defaults from '~/defaults';
import Domain from '~/utils/Domain';

export default (hash: string, event: Object) => {
  let insertAccessStats = () => {
    let date = new Date();
    let access_time = date.toISOString();
    let acc_sort_key;
    let rand = Math.floor(Math.random() * 100) + 1;
    console.log('rand', rand);
    if (ip.length > 0)
      acc_sort_key = 'IP' + ip[0] + 'AT' + access_time + rand.toString(10);
    else acc_sort_key = 'IP' + 'UNK' + 'AT' + access_time + rand.toString(10);
    console.log('acc_sort_key:', acc_sort_key);
    return new Promise((res, rej) => {
      let dbEntry = {
        hash: hash.padStart(8, 'A'), // making sure url map is fast; need to understand how sort key internally works
        sort_key: acc_sort_key,
        req_at: access_time,
        brwoser: 'NA', // TBE from user agent
        os: 'NA', //TBD from user agent
      };
      let _false = false;
      if (_false) rej(); // no-unused var workaround

      // console.log("Item:" + JSON.stringify(dbEntry));
      return DocumentClient.put({ TableName, Item: dbEntry })
        .promise()
        .then(() => res())
        .catch(err => {
          console.log(err.message);
          return res();
        }); // just saving to cloudwatch, no need to reject operatoion
    });
  };

  // Should be done using stream if needed in realtime or as a batch process with a given periodicity
  let insertGlobalStats = () => {
    return new Promise((res, rej) => {
      let params = {
        Key: {
          hash: hash,
          sort_key: Defaults.HASH_TOATL_SORT_KEY,
        },
        ReturnValues: 'ALL_NEW',
        TableName: TableName,
        UpdateExpression: 'ADD countn :incr',
        ExpressionAttributeValues: {
          ':incr': 1,
        },
      };
      let _false = false;
      if (_false) rej(); //workaround
      DocumentClient.update(params)
        .promise()
        .then(data => {
          console.log('data', data);
          return res();
        })
        .catch(err => {
          console.log('Err in update count: ' + err);
          return res(); // continuing next ops
        });
    });
  };

  console.log(event);
  let ip = Domain.getIpfromHeader(
    event.multiValueHeaders,
    event.requestContext.identity,
  );
  console.log('ip', ip);
  return insertAccessStats()
    .then(() => insertGlobalStats())
    .then(() => {});
};
