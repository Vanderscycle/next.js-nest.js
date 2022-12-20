#!/bin/bash
set -e
# env $(cat ../common/envs/development.env | xargs)
ENV_PATH="$PWD/src/common/envs/localhost.env"
source "$ENV_PATH"

# echo "$DATABASE_NAME"

#TODO: fix lvim rename
SERVER="$DATABASE_NAME";
DATABASE_PASSWORD="root";
DATABASE_NAME="project";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD="$DATABASE_PASSWORD" \
  -e PGPASSWORD="$DATABASE_PASSWORD" \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db 
echo "CREATE DATABASE $DATABASE_NAME ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
