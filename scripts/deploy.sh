#!/bin/bash

set -e

# Deploy everything in the correct order
npm run sls:deploy:database -- ${@}
npm run sls:deploy:api -- ${@}
