#!/bin/bash

echo "Exporting variables"

ENV_EXAMPLE='.env.example'
ENV_LOCAL='.env.local'

if ! [ -f $ENV_EXAMPLE ]; then
    echo "Error: '$ENV_EXAMPLE' does not exists." 
    echo "Exiting..."
    return
fi

if ! [ -f $ENV_LOCAL ]; then
    echo "Info: 1$ENV_LOCAL' does not exists." 
    echo "Info: Creating '$ENV_LOCAL' from '$ENV_EXAMPLE'"
    cat $ENV_EXAMPLE > $ENV_LOCAL
fi


set -o allexport
echo "Loading environment variables from '$ENV_LOCAL'"
source .env.local
set +o allexport

sleep 1;
wait;