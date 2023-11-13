'use strict';

const doctorChain = require('./lib/doctor-chaincode');

module.exports.DoctorChain = doctorChain;

module.exports.contracts = [doctorChain];