/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Serverless connector
 */

/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 * Makes imports and exports explicit and predictable
 */

/* @flow */

'use strict';

const DefaultValues = require('../serverless.values');
const FOLDER_NAME = 'database';

module.exports = {
  provider: (serverless /* :any */) => {
    return DefaultValues.provider(serverless);
  },
  project: (serverless /* :any */) => {
    return DefaultValues.project(serverless, FOLDER_NAME);
  },
  Tables: (serverless /* :any */) => {
    const { stackName } = DefaultValues.project(serverless, FOLDER_NAME);

    return {
      TableName: {
        name: `${stackName}--TableName`,
        index: {
          GSI_1: 'GSI_1',
        },
      },
    };
  },
  Exports: (serverless /* :any */) => {
    const { stackName } = DefaultValues.project(serverless, FOLDER_NAME);

    return {
      TableNameARN: `${stackName}:TableNameARN`,
    };
  },
};
