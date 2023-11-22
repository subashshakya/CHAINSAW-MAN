'use strict';

const {Contract} = require('fabric-contract-api');
const sortKeysRecursive = require('sort-keys-recursive');
const stringify = require('json-stringify-deterministic');

class ECGReport extends Contract {

     async initLedger(ctx) {
          const report = [
               {    
                    id: 1,
                    patientName: 'Ram Kumar Bhandari',
                    sonographer: 'Michael Corleone',
                    aorticRoot: '3',
                    diastole: '4',
                    systole: '3',
                    LVPW: '1',
                    LVEF: '60',
                    leftAtrium: '3',
                    IVS: '1.5'
               }
          ]
     }

     async createEcgReport(
          ctx,
          id,
          patientName, 
          sonographer, 
          aorticRoot,
          leftVentrical,
          rightVentrical,
          diastole, systole,
          LVPW,
          LVEF,
          leftAtrium,
          IVS,
          owner
     ) {
          const exists = await this.assetExists(ctx, id);

          const newReport = {
               id: id,
               patientName: patientName,
               sonographe: sonographer,
               aorticRoot: aorticRoot,
               leftVentrical: leftVentrical,
               rightVentrical: rightVentrical,
               diastole: diastole,
               systole: systole,
               LVPW: LVPW,
               LVEF: LVEF,
               leftAtrium: leftAtrium,
               IVS: IVS,
               owner: owner
          }

          await ctx.stub.putState(id ,Buffer.from(stringify(sortKeysRecursive(newReport))));
          return JSON.stringify(newReport);
     }

     async readEcgReport(ctx, id) {
          const reportJSON = await ctx.stub.getState(id);
          if(!reportJSON || reportJSON.length === 0) {
               throw new Error(`The asset ${id} does not exist`);
          }
          return reportJSON.toString();
     }

     async updateEcgReport(
          ctx, 
          id, 
          patientName, 
          sonographer, 
          aorticRoot, 
          leftVentrical, 
          rightVentrical, 
          diastole, systole, 
          LVPW, 
          LVEF, 
          leftAtrium,
          IVS
          ) {
               const exists = await this.assetExists(ctx, id);
               if(!exists) {
                    throw new Error(`The report of ID ${id} does not exist`);
               }

               const updatedReport = {
                    id: id,
               patientName: patientName,
               sonographe: sonographer,
               aorticRoot: aorticRoot,
               leftVentrical: leftVentrical,
               rightVentrical: rightVentrical,
               diastole: diastole,
               systole: systole,
               LVPW: LVPW,
               LVEF: LVEF,
               leftAtrium: leftAtrium,
               IVS: IVS
               }

               return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedReport))));
     }

     async deleteEcgReport(ctx, id) {
          const exists = await this.assetExists(ctx, id);
          if(!exists) {
               throw new Error(`The asset ${id} does not exist`);
          }

          return ctx.stub.deleteState(id);
     }

     async queryEcgReport(ctx) {
          const allReports = [];
          const iterator = await ctx.stub.getStateByRange('', '');
          let result = await iterator.next();
          while(!result.done) {
               const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
               let record;
               try {
                    record = JSON.parse(strValue);
               } catch(err) {
                    console.log(err);
                    record =strValue;
               }
               allReports.push(record);
               result = await iterator.next();
          }

          return JSON.stringify(allReports);
     }

     async assetExists() {
          const assetJSON = await ctx.stub.getState(id);
          return assetJSON && assetJSON.length > 0;
     }

     async transferReport(ctx, id, newOwner) {
          const assetString = await this.readEcgReport(ctx, id);
          const asset = JSON.parse(assetString);
          const oldOwner = asset.owner;
          asset.owner = newOwner;
          await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
          return oldOwner;
     }
}


module.exports = ECGReport;