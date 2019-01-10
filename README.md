# Serverless URL shortener

Before you start, install the local dynamodb docker image [dynamodb docker image](https://hub.docker.com/r/amazon/dynamodb-local/) in order to test your lambda functions offline. Running `npm run database:start` should then start dynamodb in the right way. If port `8000` is currently in use look at (2.) in order to change the variables.

## Development information:

Getting started:

0. Run `npm run database:start` to start dynamodb
1. Run `npm run database:initialise` to create the database table
1. Run `npm run dev` which will open the server at `http://localhost:3000`
1. You can now query the endpoints `getItem` and `insertItem`. E.g. `GET http://localhost:3000/getItem` which should return

```
{
    "message": "Hey - from lambda"
}
```

In general I advise to develop most of your code using the tests to run it. It has proven to be much faster when working with lambdas as you are not reliant on making http requests. You can see an example in `src/api/functions/getItem/__test__/index.test.js`

### General

- We are using [npm-run-all](https://github.com/mysticatea/npm-run-all/) to run our scripts. To give command line arguments, add them after a `--` and they will be forwarded to all scripts.

  E.g. `npm run sls:deploy -- --stage dev`
  <br/>

- In order to run dynamodb offline, run the [dynamodb docker image](https://hub.docker.com/r/amazon/dynamodb-local/).

  ```
  docker run --rm -p 8000:8000 amazon/dynamodb-local  -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
  ```

  or for detached mode

  ```
  docker run -d --rm -p 8000:8000 amazon/dynamodb-local -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
  ```

  If you are using different ports or host, you will have to set the environment variables

  ```
  DYNAMO_DB_HOST: 'localhost'
  DYNAMO_DB_HOST_PORT: 8000
  ```

- The babel runtime configuration (plugins, presets, etc.) is defined in the `babel.config.js` which is imported in `webpack.default.config.js` for it to work with our "unorthodox" folder structure. [https://github.com/babel/babel-loader/issues/293](https://github.com/babel/babel-loader/issues/293)

- [Husky](https://github.com/typicode/husky#readme) will run all tests pre-commit.

- If you want to ignore variables, e.g. have unused function parameter, prefix them with `_`.

- Javascript module imports can be absolute by prefixing them with `~/`. This imports files relative to the `src` folder.

### Editor - Visual Studio Code

We use [vscode](https://code.visualstudio.com/), to have a unified development experience install the following plugins:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Flow](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
  - _You might need to disable TypeScript in VSCode: set `javascript.validate.enable` option to `false` or completely disable the built-in TS extension for your project (check Flow add-on settings for details)_
  - _Enable use NPMPackagedFlow to keep in sync with the current version in use by the project_
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

Nice to have ones are:

- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)

### Deploy to aws

If you have an aws account, and [setup all the credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) you will be able to deploy this straight to the cloud running `npm run packageAndDeploy -- --stage STAGE_NAME`
