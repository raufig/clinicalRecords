const { Schema, model } = require("mongoose");

const analysisAndManagementSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    analysis:[
        {
            analysisName:{ type: String },
            analysisDescription:{ type: String }
        }
    ],
    disability:{ 
        disability: { type:Boolean },
        numOfDays: { type:String }
    },
    diagnosis: { type: String },
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})

const Analysis = model("analysis", analysisAndManagementSchema);
module.exports.Analysis = Analysis;
module.exports.analysisAndManagementSchema = analysisAndManagementSchema
