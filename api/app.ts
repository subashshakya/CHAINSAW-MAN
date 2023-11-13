import * as grpc from '@grpc/grpc-js';
import * as crypto from 'crypto';
import { readFileSync } from 'fs';

const express = require('express');
const app = express();
const port = 3000;
const peerEndpoint = 'localhost:7051';
const utf8Decoder = new TextDecoder();

const assetId = `asset${Date.now()}`;



async function main(): Promise<void> {
     // const client = await newGrpcConenction()
}

async function newGrpcConenction(): Promise<grpc.Client> {
     const tlsRootCert = readFileSync('cacert.pem', 'utf-8');
     const tlsCredentials = grpc.credentials.createSsl();
     return new grpc.Client(peerEndpoint, tlsCredentials, {
          'grpc.ssl_target_name_override': 'peer0.org1.example.com',
     })
}

const envOrDefault = (key:string, defaultValue: string) => {
     return process.env[key] || defaultValue;
}