const { Schema, model } = require("mongoose");

const referralSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    specialist:[
        {
            specialistName:{ type: String },
            specialistDescription:{ type: String }
        }
    ],
    diagnosis: { type: String },
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})

const Referral = model("referral", referralSchema);
module.exports.Referral = Referral;
module.exports.referralSchema = referralSchema
