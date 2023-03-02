const { Schema, model } = require("mongoose");

const doctorSchema = new Schema({
    document : { type: String, required: true, unique: true },
    name : { type: String, required: true },
    lastName: { type: String, required: true },
    email : { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    pass: { type: String, required: true },
    profession: { type: String, required: true },
    validated: { type: Boolean, default: false},
    firstSession: { type: Boolean, default: true},
})

const Doctor = model("doctor", doctorSchema);
module.exports.Doctor = Doctor;
module.exports.doctorSchema = doctorSchema
