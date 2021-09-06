const express = require("express");
const recordRoutes = express.Router();
let Appointment = require("../models/appointment");
let data = require("../data");
let appointments = data.appointment_data;

recordRoutes.get("/api/appointment", function(req, res) {
    res.send(appointments);
});

recordRoutes.get("/api/appointment/getMaxId", function(req, res) {
    var arr = Object.values(appointments.map(x=> parseInt(x.appointment_id.substring(1))));
    res.json(Math.max(...arr));
});

recordRoutes.post("/api/appointment", function(req, res) {
    appointments.push(req.body);
    res.send(appointments);
});

recordRoutes.delete("/api/appointment/:id", function(req, res) {
    var index = appointments.findIndex(x=> x.appointment_id = req.params.id)
    appointments.splice(index, 1);
    res.send(appointments);
});


module.exports = recordRoutes;
