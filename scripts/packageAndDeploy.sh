set -e
# Package and go
npm run sls:package -- ${@}

# Check if there are some obvious problems
npm run cfn-lint

# Deploy to AWS
npm run sls:deploy -- ${@}
