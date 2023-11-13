'use strict';

const {Contract} = require('fabric-contract-api');

class PatientChain extends Contract {
     constructuor() {
          super('PatientChain');
          this.txId ='';
     }

     async beforeTransaction(ctx) {
          this.txId = ctx.stub.getTxID();
     }

     async afterTransaction(ctx, result) {
          console.log(`TX ${this.txId} done!!`)
     }
}

module.exports = PatientChain;

