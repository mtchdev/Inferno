#!/bin/sh

echo Building Inferno bot...

if [ ! -d "build" ]; then
	echo Build directory not found. Creating...
  mkdir build
fi

echo Compiling...
tsc
npm install

cd ./api

echo Building Inferno API...

npm run db:build
node ./env-factory.js

echo Compiling...
tsc
npm install

echo Build complete.
exit 1
