const { Schema, model } = require("mongoose");

const medicinesSchema = new Schema({
    
    patientId: { type:  Schema.Types.ObjectId, ref: 'patient' },
    clinicalRecordId: { type:  Schema.Types.ObjectId, ref: 'clinicalRecord' },
    medicines:[
        {
            medicineName:{ type: String },
            medicineDescription:{ type: String }
        }
    ],
    diagnosis: { type: String },
    signature:{ type:  Schema.Types.ObjectId, ref: 'doctor' }
})

const Medicine = model("medicine", medicinesSchema);
module.exports.Medicine = Medicine;
module.exports.medicinesSchema = medicinesSchema
