const { Schema, model } = require("mongoose");

const surgeryOrderSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    surgery:[
        {
            surgeryName:{ type: String },
            surgeryDescription:{ type: String }
        }
    ],
    diagnosis: { type: String },
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})




const Surgery = model("surgery", surgeryOrderSchema);
module.exports.Surgery = Surgery;
module.exports.surgeryOrderSchema = surgeryOrderSchema