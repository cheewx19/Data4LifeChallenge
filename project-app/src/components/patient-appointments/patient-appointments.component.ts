import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { Appointment } from '../../models/Appointment';
import { Doctor } from '../../models/Doctor';
import { Patient } from '../../models/Patient';
import { appointment_data, doctor_data, patient_data } from "../../models/data";

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {
  public appointments: Appointment[] = appointment_data;
  public doctors: Doctor[] = doctor_data;
  public patients: Patient[] = patient_data;
  patient_selected: Patient = this.patients[0];
  doctor_selected: Doctor = this.doctors[0];
  datetime_selected: String = "";
  constructor() { }

  ngOnInit(): void {
  }

  selectPatient(e): void {
    this.patient_selected = this.patients.filter(x => x.patient_id == e)[0]
  }

  selectDoctor(e): void {
    console.log(e)
    this.doctor_selected = this.doctors.filter(x => x.doctor_id == e)[0]
  }
}
