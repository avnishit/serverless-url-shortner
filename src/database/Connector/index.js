/* @flow */

import AWS from 'aws-sdk';

import { Tables } from '../serverless';

import getUrl from './getUrl';
import getHash from './getHash';
import saveStat from './saveStat';
import getStatsByHash from './getStatsByHash';
import getStatsByUrl from './getStatsByUrl';

/** Gets imported and used by all subtables */
export let DocumentClient = new AWS.DynamoDB.DocumentClient();
export let DynamoDB = new AWS.DynamoDB();

export let { name: TableName, index: TableIndex } = Tables().TableName;

// Connects to a local database
export const setDBToLocalTestMode = (stage: string) => {
  AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-west-2',
  });

  const host = process.env.DYNAMO_DB_HOST || 'localhost';
  const port = process.env.DYNAMO_DB_HOST_PORT || 8000;

  const options = {
    endpoint: `http://${host}:${port}`,
    region: host,
  };

  DocumentClient = new AWS.DynamoDB.DocumentClient(options);
  DynamoDB = new AWS.DynamoDB(options);

  const serverlessStageMock = {
    processedInput: {
      options: {
        stage,
      },
    },
  };

  TableName = Tables(serverlessStageMock).TableName.name;
  TableIndex = Tables(serverlessStageMock).TableName.index;
};

if (process.env.LOCAL_DEV) {
  setDBToLocalTestMode('localdev');
}

export default { getUrl, getHash, saveStat, getStatsByHash, getStatsByUrl };
