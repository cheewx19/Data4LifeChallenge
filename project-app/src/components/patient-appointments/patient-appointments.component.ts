import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { HttpClient } from '@angular/common/http';

import { Appointment } from '../../models/Appointment';
import { Doctor } from '../../models/Doctor';
import { Patient } from '../../models/Patient';
import { appointment_data, doctor_data, patient_data } from "../../models/data";
import { ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {
  appointment_data = appointment_data;
  public appointments: Appointment[] = [];
  public doctors: Doctor[] = doctor_data;
  public patients: Patient[] = patient_data;
  patient_selected: Patient = this.patients[0];
  doctor_selected: Doctor = this.doctors[0];
  datetime_selected: string = "";
  latestid: number = 0;
  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    //For initializing database
    // this.appointment_data.forEach(data=> {
    //   var appointment: Appointment = {
    //     doctor_id: data.doctor_id,
    //     doctor_name: data.doctor_name,
    //     patient_id: data.patient_id,
    //     patient_name: data.patient_name,
    //     patient_age: data.patient_age,
    //     patient_gender: data.patient_gender,
    //     appointment_id: data.appointment_id,
    //     appointment_datetime: this.formatDate(data.appointment_datetime)
    //   }
    //   console.log(appointment);
    //   this.http.post<Appointment>('http://localhost:5000/api/appointment', appointment).subscribe(res => {
    //     console.log(res);
    //   })
    // })
    await this.getAppointments();
    this.patient_selected = this.patients[0];
    this.doctor_selected = this.doctors[0];
  }

  getAppointments(): Promise<void> {
    return new Promise(resolve => {
      this.http.get<Appointment>('http://localhost:5000/api/appointment').subscribe(res => {
        console.log(res);
        this.appointments = Object.assign(res);
        resolve();
      })
    });

  }

  selectPatient(e): void {
    this.patient_selected = this.patients.filter(x => x.patient_id == e)[0]
  }

  selectDoctor(e): void {
    console.log(e)
    this.doctor_selected = this.doctors.filter(x => x.doctor_id == e)[0]
  }

  getLatestId(): Promise<void> {
    return new Promise(resolve => {
      this.http.get<number>('http://localhost:5000/api/appointment/getMaxId').subscribe(res => {
        this.latestid = res;
        resolve();
      })
    })
  }

  formatDate(date): Date {
    var day = date.substring(0, 2);
    var month = date.substring(2, 4);
    var year = date.substring(4, 8);
    var time = date.substring(9);
    return new Date(month + "/" + day + "/" + year + " " + time);
  }

  async addAppointment(): Promise<void> {
    await this.getLatestId();
    var id = this.latestid + 1;

    var appointment: Appointment = {
      doctor_id: this.doctor_selected.doctor_id,
      doctor_name: this.doctor_selected.doctor_name,
      patient_id: this.patient_selected.patient_id,
      patient_name: this.patient_selected.patient_name,
      patient_age: this.patient_selected.patient_age,
      patient_gender: this.patient_selected.patient_gender,
      appointment_id: "A" + id.toString(),
      appointment_datetime: this.formatDate(this.datetime_selected)
    }
    if (!this.checkDoctorAvailable(appointment.doctor_id, appointment.appointment_datetime) ||
      !this.checkPatientAvailable(appointment.patient_id, appointment.appointment_datetime)) {
      alert("Doctor or Patient not available at this date and time");
    }
    else {
      this.http.post<Appointment>('http://localhost:5000/api/appointment', appointment).subscribe(res => {
        console.log(res);
        alert("Inserted Successfully!")
      })
    }
  }

  checkDoctorAvailable(id, date): Boolean {
    var result = true;
    this.appointments.filter(x => x.doctor_id == id).forEach(data => {
      if (new Date(data.appointment_datetime.toString()).toString() == date.toString()) {
        result = false;
      }
    })
    var hour = new Date(date.toString()).getHours();
    if (hour < 8 || hour >= 16)
      result = false;
    return result;
  }

  checkPatientAvailable(id, date): Boolean {
    var result = true
    this.appointments.filter(x => x.patient_id == id).forEach(data => {
      if (new Date(data.appointment_datetime.toString()).toString() == date.toString()) {
        result = false;
      }
    })
    var hour = new Date(date.toString()).getHours();
    if (hour < 8 || hour >= 16)
      result = false;
    return result;
  }
}
