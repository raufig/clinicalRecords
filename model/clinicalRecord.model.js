const { Schema, model } = require("mongoose");

const clinicalRecordSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'patient' },
    hostpitalId:{ type: Schema.Types.ObjectId, ref: 'hospital' },
    date: { type: Date, required: true, default: new Date },
    time: { type: String, required: true },
    hospitalName: { type: String, required: true },
    doctorName: { type: String, required: true },
    approvalNum: { type: String, required: true },
    kindOfAttention: { type: String, required: true },
    signature: { type: Schema.Types.ObjectId, ref: 'doctor' },
  
    anamesi: { type: Schema.Types.ObjectId, ref: 'anamesi' },
    background: { type: Schema.Types.ObjectId, ref: 'background' },
    medicine: { type: Schema.Types.ObjectId, ref: 'medicine' },
    physicalExam: { type: Schema.Types.ObjectId, ref: 'physicalExam' },
    referral: { type: Schema.Types.ObjectId, ref: 'referral' },
    surgery: { type: Schema.Types.ObjectId, ref: 'surgery' },
    analysis: { type: Schema.Types.ObjectId, ref: 'analysis' }
  });

const ClinicalRecord = model("clinicalRecord", clinicalRecordSchema);
module.exports.ClinicalRecord = ClinicalRecord;
module.exports.clinicalRecordSchema = clinicalRecordSchema
