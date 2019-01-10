#!/bin/bash

# Any error will exit this script
set -e

# The serverless stage to use
STAGE_NAME=yamltest

# Test the cf yaml files
npm run sls:package -- --stage $STAGE_NAME

npm run cfn-lint