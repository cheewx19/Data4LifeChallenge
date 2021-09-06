const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let Appointment = new Schema({
    doctor_id: {
        type: String,
        required: true
    },
    doctor_name: {
        type: Date,
        required: true
    },
    patient_id: {
        type: Date,
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    patient_age: {
        type: Number,
        required: true
    },
    patient_gender: {
        type: String
    },
    appointment_id: {
        type: String
    },
    appointment_datetime: {
        type: Array
    }
});
module.exports = mongoose.model('Appointment', Appointment);