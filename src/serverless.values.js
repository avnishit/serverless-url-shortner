/* @flow */

'use strict';

const GROUP_NAME = 'dh';

/** Default project name */
const PROJECT_NAME = `${GROUP_NAME}--bkn-tst`;

/** Project name for resources disallowing "-" */
const PROJECT_NAME_LOW_DASH = `${GROUP_NAME}__bkn_tst`;

const PROVIDER_NAME = 'aws';
const DEFAULT_RUNTIME = 'nodejs8.10';
const DEFAULT_REGION = 'eu-west-1';

/** Deployment stages */
const STAGES = {
  dev: 'dev',
  staging: 'staging',
  prod: 'prod',
};

/**
 * Creates the Cloudformation variables out of the current project + the folder
 *
 * @param {Serverless} serverless
 * @param {string} folder
 */
const project = (serverless /* :any */, folder /* :string */) => {
  const stackPrefix = `${PROJECT_NAME}--${getStage(serverless)}`;
  const stackPrefixLowDash = `${PROJECT_NAME_LOW_DASH}__${getStage(
    serverless,
  )}`;

  return {
    name: `${PROJECT_NAME}--${folder}`,
    nameLowDash: `${PROJECT_NAME_LOW_DASH}__${folder}`,
    stackPrefix,
    stackPrefixLowDash,
    stackName: `${stackPrefix}--${folder}`,
    stackNameLowDash: `${stackPrefixLowDash}__${folder}`,
  };
};

/**
 * Creates the current serverless provider.
 * Currently "aws".
 *
 * @param {Serverless} serverless
 */
const provider = (serverless /* :any */) => ({
  name: PROVIDER_NAME,
  stage: getStage(serverless),
  runtime: DEFAULT_RUNTIME,
  region: DEFAULT_REGION,
  deploymentBucket: {
    name: `${GROUP_NAME}--${DEFAULT_REGION}--${STAGES[getStage(serverless)] ||
      STAGES.dev}`,
  },
});

/**
 * true if we are running in production
 *
 * @param {Serverless} serverless
 */
const isProduction = (serverless /* :any */) /* :boolean */ => {
  return getStage(serverless) === STAGES.prod;
};

/**
 * Gets the current stage
 *
 * @param {Serverless} serverless
 */
const getStage = (serverless /* :any */) /* :string */ => {
  let stage = process.env.STAGE_NAME || '';

  if (serverless != null) {
    stage = serverless.processedInput.options.stage;
  }

  if (stage == null || stage == '') {
    throw Error(
      'Set either the environment variable STAGE_NAME or --stage on serverless',
    );
  }

  return stage;
};

module.exports = {
  project,
  provider,
  getStage,
  isProduction,
  PROJECT_NAME,
  PROJECT_NAME_LOW_DASH,
  PROVIDER_NAME,
  DEFAULT_RUNTIME,
  DEFAULT_REGION,
};
