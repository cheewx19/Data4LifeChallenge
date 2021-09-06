const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let Appointment = new Schema({
    doctor_id: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    patient_id: {
        type: String,
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
        type: String,
        required: true
    },
    appointment_id: {
        type: String,
        required: true
    },
    appointment_datetime: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('Appointment', Appointment);