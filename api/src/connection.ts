import * as gateway from '@hyperledger/fabric-gateway';
import * as grpc from '@grpc/grpc-js';
import {readFileSync} from 'fs';
import {createPrivateKey} from 'crypto';
import { connect } from 'mongoose';


const channelName= 'report-hub';
const reportChaincodeName ='';
const mspId = 'Org1MSP';
const peerEndpoint = 'localhost:7051';
const peerHostAlias = 'peer0.org1.example.com';

const newIdentity:gateway.Identity = {
     mspId:mspId,
     credentials: readFileSync('./signcert.pem')
}

export class Connection {
     public static reportContract: gateway.Contract;

     public init() {
          initFabric();
     }
}

async function initFabric() {
     const client = await newGrpcConnection();

     const gatewayConnection = gateway.connect({
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
     });

     try {
          const network = gatewayConnection.getNetwork(channelName);
          const reportContract = network.getContract(reportChaincodeName);
          Connection.reportContract = reportContract;
     } catch(err) {
          console.error("Couldn't connect to the fabric network");
          console.error(err);
     } finally {
          console.log('Connected to network')
     }
}

async function newGrpcConnection() {
     const tlsRootCert = readFileSync('cacert.com');
     const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
     return new grpc.Client(peerEndpoint, tlsCredentials, {
          'grpc.ssl_target_name_override': peerHostAlias,
     })
}

async function newSigner() {
     const privateKeyBytes = readFileSync('./privatekey.pem');
     const privateKey = createPrivateKey(privateKeyBytes);
     return gateway.signers.newPrivateKeySigner(privateKey);
}

async function submitTransaction() {
     
}