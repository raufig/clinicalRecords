const { Schema, model } = require("mongoose");

const anamnesisSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    reasonForConsultation: { type: String },
    presentDisease: { type: String },
    pain:{
        painScale: { type: Number, default: 0 },
        painClassification: { type: String, default: 'sin dolor' }
    },
    suspectedDisease: { type: String, default: 'No' },
    otherDiagnoses: [{ Type: Array, default: [] }],
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
    

})

const Anamesi = model("anamesi", anamnesisSchema);
module.exports.Anamesi = Anamesi;
module.exports.anamnesisSchema = anamnesisSchema
