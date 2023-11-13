#!/bin/bash
set -e

export MSYS_NO_PATH=1
starttime=$(date +%s)


CC_SRC_LANGUAGE="javascript"
DOC_CHAIN_CODE_PATH="../chaincode/doctor-chain/"
LAB_CHAIN_CODE_PATH="../chaincode/lab-chain/"
PATIENT_CHAIN_CODE_PATH="../chaincode/patient-chain/"

rm -rf javascript/wallet/*
rm -rf go/wallet/*
rm -rf java/wallet/*
rm -rf typescript/wallet/*

pushd ../fabric-samples/test-network

./network.sh down
./network.sh up createChannel -ca -c report-hub -s couchdb
./network.sh deployCC -c report-hub -ccn doctor-chaincode -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${DOC_CHAIN_CODE_PATH}
./network.sh deployCC -c report-hub -ccn lab-chaincode -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${LAB_CHAIN_CODE_PATH}
./network.sh deployCC -c report-hub -ccn patient-chaincode -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${PATIENT_CHAIN_CODE_PATH}

popd


echo TOTAL SETUP EXECUTION TIME: $(($(date +$s) - starttime)) secs
echo NETWORK SETUP COMPLETE