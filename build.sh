#!/bin/sh

echo Building Inferno bot...

if [ ! -d "build" ]; then
	echo Build directory not found. Creating...
  mkdir build
fi

echo Installing packages...
npm install

echo Compiling...
tsc

cd ./api

echo Building Inferno API...

npm run db:build
node ./env-factory.js

echo Installing packages...
npm install

echo Compiling...
tsc

echo Build complete.
exit 1
