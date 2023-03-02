const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    document : { type: String, required: true, unique: true },
    name : { type: String, required: true },
    lastName: { type: String, required: true },
    email : { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    pass: { type: String, required: true },
    validated: { type: Boolean, default: false}
})

const Patient = model("patient", userSchema);
module.exports.Patient = Patient;
module.exports.userSchema = userSchema
