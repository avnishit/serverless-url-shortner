/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Makes imports and exports explicit and predictable
 */

/* @flow */

'use strict';

const DefaultValues = require('../serverless.values');
const Database = require('../database/serverless');

const FOLDER_NAME = 'api';

module.exports = {
  provider: (serverless /* :any */) => {
    return DefaultValues.provider(serverless);
  },
  project: (serverless /* :any */) => {
    return DefaultValues.project(serverless, FOLDER_NAME);
  },
  Imports: (serverless /* :any */) => {
    return {
      TableNameARN: Database.Exports(serverless).TableNameARN,
      TableName: Database.Tables(serverless).TableName,
    };
  },
};
