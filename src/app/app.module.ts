import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParentComponent } from './components/parent/parent.component';
import { SchoolComponent } from './components/school/school.component';

import { authInterceptorProviders } from "./services/helpers/auth.interceptor";
import { DayCampsComponent } from './components/day-camps/day-camps.component';
import { DayCampComponent } from './components/day-camp/day-camp.component';
import { MyChildrenComponent } from './components/parent/my-children/my-children.component';
import { EnrollChildComponent } from './components/parent/enroll-child/enroll-child.component';
import { EnrollmentsComponent } from './components/parent/enrollments/enrollments.component';
import { MyDayCampsComponent } from './components/school/my-day-camps/my-day-camps.component';
import { ChildrenTableComponent } from './components/school/children/children-table/children-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ParentComponent,
    SchoolComponent,
    DayCampsComponent,
    DayCampComponent,
    MyChildrenComponent,
    EnrollChildComponent,
    EnrollmentsComponent,
    MyDayCampsComponent,
    ChildrenTableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
