import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { LoginComponent } from './login/login.component';
import { VaccinationCenterListPrivateComponent } from './vaccination-center-list-private/vaccination-center-list-private.component';

const routes: Routes = [
  {path: "public/login", component: LoginComponent},
  {path: "public/center", component: VaccinationCenterListComponent},
  {path: "private/center", component: VaccinationCenterListPrivateComponent},
  {path: "public/center/detail/:id", component: VaccinationCenterComponent},
  {path: "", redirectTo: "/public/center", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
