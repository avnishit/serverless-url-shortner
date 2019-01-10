/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Collection of utils used for testing
 */

/* @flow */

import path from 'path';
import { spawnSync } from 'child_process';
import { unique } from 'shorthash';
import { setDBToLocalTestMode } from '../Connector';

export const INVALID_ENTITY_ID = 'invalidId';

/**
 * Initialises and sets the local dynamodb database to testmode
 *
 * @param {string} name a unique identifier for this testrun
 */
export const initialiseTestDB = (name: string): Promise<*> => {
  const stage = unique(name);

  setDBToLocalTestMode(stage);

  return Promise.resolve().then(() => {
    return new Promise((resolve, reject) => {
      const databasePath = path.resolve(__dirname, '../');

      const remove = spawnSync('sls dynamodb remove', ['--stage', stage], {
        cwd: databasePath,
        shell: true,
      });

      if (remove.status !== 0) {
        return reject(remove.stdout.toString());
      }

      const migrate = spawnSync('sls dynamodb migrate', ['--stage', stage], {
        cwd: databasePath,
        shell: true,
      });

      if (migrate.status !== 0) {
        return reject(migrate.stdout.toString());
      }

      return resolve();
    });
  });
};
