#!/bin/bash

set -ex

pushd ../fabric-samples/test-network
./network.sh down
popd

rm -rf javascript/wallet/*
rm -rf go/wallect/*
rm -rf java/wallet/*
