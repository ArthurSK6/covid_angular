import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "first", component: FirstComponent},
  {path: "login", component: LoginComponent},
  {path: "second", component: SecondComponent},
  {path: "center", component: VaccinationCenterListComponent},
  {path: "center/detail/:id", component: VaccinationCenterComponent},
  {path: "", redirectTo: "/center", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
