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
  patient_selected: Patient;
  doctor_selected: Doctor;
  datetime_selected: string = "";
  latestid: number = 0;
  loading = true;
  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    // For initializing database
    // this.appointments.forEach(data=> {
    //   this.http.post<Appointment>('http://localhost:5000/api/appointment', data).subscribe(res => {
    //     console.log(res);
    //   })
    // })
    await this.getAppointments();
    console.log(this.appointments);
    this.loading = false;
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
    });
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
      appointment_datetime: this.datetime_selected
    }
    this.appointments.push(appointment);
  }
}
