import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/Appointment';
import { appointment_data } from "../../models/data";

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {
  public appointments: Appointment[] = appointment_data;
  constructor() { }

  ngOnInit(): void {
  }


}
