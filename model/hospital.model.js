const { Schema, model } = require("mongoose");

const hospitalSchema = new Schema({
    document : { type: String, required: true, unique: true },
    name : { type: String, required: true },
    address: { type: String, required: true },
    email : { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    pass: { type: String, required: true },
    medicalServicesProvided: [ { type: String, required: true } ],
    validated: { type: Boolean, default: false}
})

const Hospital = model("hospital", hospitalSchema);
module.exports.Hospital = Hospital;
module.exports.hospitalSchema = hospitalSchema
