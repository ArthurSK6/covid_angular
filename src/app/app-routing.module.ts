import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { LoginComponent } from './login/login.component';
import { AdminCentreComponent } from './admin-centre/admin-centre.component';
import { SuperAdminCentresComponent } from './super-admin-centres/super-admin-centres.component';
import { SuperAdminConfigComponent } from './super-admin-config/super-admin-config.component';
import { PlanningComponent } from './planning/planning.component';


const routes: Routes = [
  // Prive
  {path: "login", component: LoginComponent},
  {path: "admin/:id", component: AdminCentreComponent},
  {path: "superadmin/centres", component: SuperAdminCentresComponent},
  {path: "superadmin/config", component: SuperAdminConfigComponent},
  {path: "planning", component: PlanningComponent},

  // Public
  {path: "center", component: VaccinationCenterListComponent},
  {path: "center/detail/:id", component: VaccinationCenterComponent},
  {path: "", redirectTo: "/center", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
