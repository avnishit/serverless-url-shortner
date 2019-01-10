#!/bin/bash

set -e

# Remove everything in the correct order
npm run sls:remove:api -- ${@}
npm run sls:remove:database -- ${@}
    