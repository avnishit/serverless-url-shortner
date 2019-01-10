/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Inserts an item to the database
 */

/* @flow */

import { TableName, DocumentClient } from './';
import Uuid from '~/database/Uuid';

export type Item = {| url: string |};
export default (item: Item) => {
  const dbEntry = {
    ...item,
    id: Uuid.generateUuid(),
  };

  return DocumentClient.put({ TableName, Item: dbEntry })
    .promise()
    .then(() => dbEntry);
};
