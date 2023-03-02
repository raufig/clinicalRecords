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

module.exports = model('surgery', surgeryOrderSchema)


const Surgery = model("suergery", surgeryOrderSchema);
module.exports.Surgery = Surgery;
module.exports.surgeryOrderSchema = surgeryOrderSchema