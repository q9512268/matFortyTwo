#!/bin/bash

set -x

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/

exec ng serve --host 0.0.0.0 --disableHostCheck true 
