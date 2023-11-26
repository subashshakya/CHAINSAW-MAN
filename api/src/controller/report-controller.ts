'use strict';

import reportModel from "../model/report-model";
import { Contract } from '@hyperledger/fabric-gateway';
import { Connection } from "../connection";
import { Request, Response } from 'express';
const pool = require('../../db');
let date = new Date();

export const createReport = async(req: Request, res: Response) => {
  const { id, patientName, sonographer, aorticRoot, leftVentrical, rightVentrical, diastole, systole, LVPW, LVEF, leftAtrium, IVS, owner} = req.body;
  const reportDetail = [patientName, sonographer, aorticRoot, leftVentrical, rightVentrical, diastole, systole, LVPW, LVEF, leftAtrium, IVS, owner];
     
  let isNullField: boolean | void = checkNullField(reportDetail);
    if(isNullField) {
      try{
          const newReport = await Connection.reportContract.submitTransaction('createReport', id, JSON.stringify({...reportDetail, date}));
          res.status(201).json({"message": "Report created successfully"});
      } catch (err) {
          res.status(400).json({"message": "Cannot create a report with invalid or empty fields"});
      }
  }
}

const checkNullField = (reportDetail: string[]): boolean | void => {
  reportDetail.forEach((item: string) => {
    if(!item) {
      return true;
    }
  });
}

export const readAllReport = async (req: Request, res: Response) => {

}

export const readByReportId = async (req: Request, res: Response) => {

}

export const updateReportById = async (req:Request, res: Response) => {

}

export const deleteReportById = async (req: Request, res: Response) => {

}

