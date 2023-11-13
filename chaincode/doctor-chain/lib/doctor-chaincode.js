'use strict';

const {Contract} = require('fabric-contract-api');
const sortKeysRecursive = require('sort-keys-recursive');
const stringify = require('json-stringify-deterministic');

class DoctorAssetTransfer extends Contract {
     async CreateAsset(ctx, id, owner) {
          const asset = {
               ID: id,
               Owner: owner
          };

          await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
     }
}