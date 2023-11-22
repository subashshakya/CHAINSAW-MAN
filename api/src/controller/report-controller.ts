import { ContractImpl } from "fabric-network/lib/contract";
import reportModel from "../model/report-model";
import {Contract} from '@hyperledger/fabric-gateway';

const SECRET_KEY = 'unlock chainsaw-man';

export const createReport = async (req:any, res:any) => {
     const {
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
     } = req.body;

     if(!id || !patientName || !sonographer || !aorticRoot || !leftVentrical
          ||!rightVentrical || !diastole || !systole || !LVPW || !LVEF || 
          !leftAtrium || !IVS ||!owner ) {
               console.log('Missing details were found');
               return res.status(400).json({message: "Missing details!"})
          }
}

export const readReport = async (req:any, res:Response) => {

}

export const updateReport = async (req:any, res:Response) => {

}

export const deleteReport = async (req:any, res:Response) => {

} 

export const queryAllReport = async (req:any, res:Response) => {

}

export const transferOwner = async(req:any, res:Response) => {

}