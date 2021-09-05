import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientAppointmentsComponent } from '../components/patient-appointments/patient-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
