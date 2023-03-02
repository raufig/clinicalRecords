const { Schema, model } = require("mongoose");

const clinicalRecordSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    date: { type: Date, required: true, default: new Date },
    time: { type: String, required: true },
    hospitalName: { type: String, required: true },
    doctorName: { type: String, required: true },
    approvalNum:{ type: String, required: true },
    kindOfAttention: { type: String, required: true },
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }

})

const ClinicalRecord = model("clinicalRecord", clinicalRecordSchema);
module.exports.ClinicalRecord = ClinicalRecord;
module.exports.clinicalRecordSchema = clinicalRecordSchema
