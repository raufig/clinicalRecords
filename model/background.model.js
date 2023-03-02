const { Schema, model } = require("mongoose");

const backgroundSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    personalHistory: { 
        patology: {type:String},
        toxic: { type: String },
        hypersensitivity: { type: String },
        pharmacological: { type: String },
        occupational: { type: String },
        surgical: { type: String },
        transfusional: { type: String },
        traumatic: { type: String },
        allergies: { type: String },
        allergiesCauses: { type: String },
        gynecology: { type: String },
        vaccination: { type: Array },
     },
     familyBackground:{ type: Array },
     signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})

const Background = model("background", backgroundSchema);
module.exports.Background = Background;
module.exports.backgroundSchema = backgroundSchema
