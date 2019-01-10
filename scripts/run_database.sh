#!/bin/bash

docker run --rm \
  -p 8000:8000 \
  amazon/dynamodb-local  \
  -Djava.library.path=./DynamoDBLocal_lib \
  -jar DynamoDBLocal.jar -sharedDb