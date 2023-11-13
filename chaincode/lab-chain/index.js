'use strict';

const patientChain = require('./lib/lab-chaincode');

module.exports.patientChain = patientChain;

module.exports.contracts = [patientChain];
