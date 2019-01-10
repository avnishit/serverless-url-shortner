/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Gets an item from the database
 */

/* @flow */

import { TableName, DocumentClient } from './';
import Uuid from '../Uuid';

export default (id: string) => {
  if (!Uuid.isId(id)) throw Error(`Invalid id ${id}`);

  return DocumentClient.get({ TableName, Key: { id } }).promise();
};
