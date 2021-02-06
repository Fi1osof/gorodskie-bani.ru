#!/bin/bash

set -e

if [ $ENV_MODE = "production" ] ; then

  yarn build;
  # yarn react-scripts --max-old-space-size=3000 build

fi
