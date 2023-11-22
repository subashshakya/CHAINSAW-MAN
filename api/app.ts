import * as grpc from '@grpc/grpc-js';
import * as crypto from 'crypto';
import { readFileSync } from 'fs';
import {connect, signers, Identity, Contract, Gateway} from '@hyperledger/fabric-gateway';

const express = require('express');
const app = express();
const utf8Decoder = new TextDecoder();
const utf8Encoder = new TextEncoder();

const port = 3000;
const peerEndpoint = 'localhost:7051';
const mspId = 'Org1MSP';
const assetId = `asset${Date.now()}`;
const peerHostAlias = 'peer0.org1.example.com';

const channelName: string='report-hub';
const chaincodeName:string='report-chain';
const newIdentity:Identity = {
     mspId: mspId,
     credentials: readFileSync('./signcert.pem')
}
app.get('/', async (req: any, res: any) => {
     const client = await newGrpcConenction();
     const gatewayConnection = connect({
          client,
          identity: newIdentity,
          signer: await newSigner(),
          evaluateOptions: () => {
               return { deadline: Date.now() + 5000 }; // 5 seconds
           },
           endorseOptions: () => {
               return { deadline: Date.now() + 15000 }; // 15 seconds
           },
           submitOptions: () => {
               return { deadline: Date.now() + 5000 }; // 5 seconds
           },
           commitStatusOptions: () => {
               return { deadline: Date.now() + 60000 }; // 1 minute
           },
     })

     let result;

     try {
          const network = gatewayConnection.getNetwork(channelName);
          const contract = network.getContract(chaincodeName);
          const resultBytes = await contract.evaluateTransaction('queryEcgReport');
          const resultJSON = utf8Decoder.decode(resultBytes);
          result = JSON.parse(resultJSON);
     } finally {
          gatewayConnection.close();
          client.close();
     }

     res.send(result);
})

async function newGrpcConenction(): Promise<grpc.Client> {
     const tlsRootCert = readFileSync('cacert.pem', 'utf-8');
     const tlsCredentials = grpc.credentials.createSsl();
     return new grpc.Client(peerEndpoint, tlsCredentials, {
          'grpc.ssl_target_name_override': 'peer0.org1.example.com',
     })
}

async function newSigner() {
     const privateKeyPem = readFileSync('./privatekey.pem', 'utf8');
     const privateKey = crypto.createPrivateKey(privateKeyPem);
     return signers.newPrivateKeySigner(privateKey);
}