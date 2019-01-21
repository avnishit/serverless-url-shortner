/**
 * @author Avnish Chandra Suman <avnishchandrasuman@gmail.com>
 *
 * Gets url for a given hash from the database
 */

/* @flow */

import { TableName, DocumentClient } from './';
import Defaults from '~/defaults';

export default (hash: string) => {
  console.log('Retriving:', hash);
  let params = {
    TableName: TableName,
    Key: { hash: hash, sort_key: Defaults.HASH_URL_SORT_KEY },
    ProjectionExpression: '#url_long',
    ExpressionAttributeNames: { '#url_long': 'url' },
  };
  return DocumentClient.get(params)
    .promise()
    .then(data => {
      console.log('data', data);
      return data.Item;
    })
    .catch(err => {
      console.log(err.message);
      return err.message;
    });
};
