import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { LoginComponent } from './login/login.component';
import { AdminCentreComponent } from './admin-centre/admin-centre.component';
import { SuperAdminCentresComponent } from './super-admin-centres/super-admin-centres.component';
import { SuperAdminConfigComponent } from './super-admin-config/super-admin-config.component';
import { PlanningComponent } from './planning/planning.component';
import { SuperAdminUserComponent } from './super-admin-user/super-admin-user.component';
import { SuperAdminCentreIdComponent } from './super-admin-centre-id/super-admin-centre-id.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AccesDeniedComponent } from './errors/acces-denied/acces-denied.component';
import {authGuard} from "./helpers/auth.guard";

const routes: Routes = [
  // Prive
  {path: "login", component: LoginComponent},
  {path: "superadmin/centres", component: SuperAdminCentresComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN']}},
  {path: "superadmin/config", component: SuperAdminConfigComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN']}},
  {path: "superadmin/user/:id", component: SuperAdminUserComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN']}},
  {path: "superadmin/centre/:id", component: SuperAdminCentreIdComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN']}},
  {path: "admin", component: AdminCentreComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN','ROLE_ADMIN']}},
  {path: "admin/user/:id", component: AdminUserComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN','ROLE_ADMIN']}},
  {path: "planning", component: PlanningComponent, canActivate: [authGuard],data: {roles: ['ROLE_SUPERADMIN','ROLE_ADMIN','ROLE_DOCTOR']}},

  // Public
  {path: "center", component: VaccinationCenterListComponent},
  {path: "center/detail/:id", component: VaccinationCenterComponent},
  {path: "", redirectTo: "/center", pathMatch:"full"},
  {path: '**', redirectTo: '/center'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
