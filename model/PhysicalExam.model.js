const { Schema, model } = require("mongoose");

const UMT = [
    'M',
    'Cm'
],
UMP = [
    'Kg',
    'g '
]

const phisycakExamSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    vitalSigns:{
        size: { 
            value: { type: Number },
            UMT: { type: String, enum: UMT }
        },
        weight: {
            value: {type: Number},
            UMP: { type: String, enum: UMP }
        },
        IMC: { type: Number },
        TAS: { type: Number },
        TAD: { type: Number },
        FC: { type: Number },
        FR: { type: Number },
        Temp: { type: Number },
    },
    physicalExam: [
        { 
            examName: { type: String },
            description: { type: String }
        }
    ],
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})

const PhisicalExam = model("phisicalExam", phisycakExamSchema);
module.exports.PhisicalExam = PhisicalExam;
module.exports.phisycakExamSchema = phisycakExamSchema