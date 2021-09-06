const express = require("express");
const recordRoutes = express.Router();
const dbo = require("./connection");
let Appointment = require("../models/schema");

// Insert appointment into db
recordRoutes.post("/api/appointment", function (req, res) {
  var db = dbo.getDB();

  db.collection("Appointments").insertOne(
    req.body,
    function (err, apiResponse) {
      if (err) throw err;
      var result = new Appointment(req.body);
      res.status(201).json({ data: result });
    }
  );
});

// Get all Appointments
recordRoutes.route("/api/appointment").get(function (req, res) {
    var db = dbo.getDB();
  
    db.collection("Appointments")
    .find({}).toArray(function(err, result) {
        res.status(200).json(result);
    })
});

// get latest appointment id
recordRoutes.route("/api/appointment/getMaxId").get(function (req, res) {
    var db = dbo.getDB();

    db.collection("Appointments")
    .find({}).toArray(function(err, result) {
        var arr = Object.values(result.map(x=> parseInt(x.appointment_id.substring(1))));
        res.status(200).json(Math.max(...arr));
    })
});

// get Appointments by doctor
recordRoutes.route("/api/appointment/doctor/:id").get(function (req, res) {
    var db = dbo.getDB();

    db.collection("Appointments")
    .find({doctor_id: req.params.id}).toArray(function(err, result) {
        res.status(200).json(result);
    })
});

// get Appointments by patient
recordRoutes.route("/api/appointment/patient/:id").get(function (req, res) {
    var db = dbo.getDB();

    db.collection("Appointments")
    .find({patient_id: req.params.id}).toArray(function(err, result) {
        res.status(200).json(result);
    })
});

module.exports = recordRoutes;
