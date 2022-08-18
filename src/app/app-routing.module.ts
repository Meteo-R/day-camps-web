import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {MyChildrenComponent} from "./components/parent/my-children/my-children.component";
import {EnrollChildComponent} from "./components/parent/enroll-child/enroll-child.component";
import {EnrollmentsComponent} from "./components/parent/enrollments/enrollments.component";
import {MyDayCampsComponent} from "./components/school/my-day-camps/my-day-camps.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'parent/my-children', component: MyChildrenComponent},
  {path: 'parent/enroll-child', component: EnrollChildComponent},
  {path: 'parent/enrollments', component: EnrollmentsComponent},
  {path: 'school/my-day-camps', component: MyDayCampsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
