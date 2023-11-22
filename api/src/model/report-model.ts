const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
     ID: {
          type: String,
          required: true,
          unique: true
     },
     PatientName: {
          type:String,
          required:true
     },
     Sonographer: {
          type:String,
          required: true
     },
     AorticRoot: {
          type: String,
          required: true
     },
     LeftVentrical: {
          type: String,
          required:true
     },
     RightVentrical: {
          type: String,
          required: true
     },
     Diastole: {
          type:String,
          required: true
     },
     Systole: {
          type: String,
          required: true
     },
     LVPW: {
          type: String,
          required: true
     },
     LVEF: {
          type: String,
          required: true
     },
     LeftAtrium: {
          type: String,
     },
     IVS: {
          type: String,
          required: true
     },
     Owner: {
          type:String,
          required:true
     }
});

export default mongoose.model('Report', reportSchema)


